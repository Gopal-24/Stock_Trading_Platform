require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const User = require("./models/UserModel");
const authRoute = require("./routes/AuthRoutes");
const { getQuote } = require("./services/finnhub");

const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: [
      "https://stock-trading-platform-1-9y97.onrender.com",
      "https://stock-trading-platform-2-ckcy.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

app.get("/watchlist", async (req, res) => {
  const symbols = ["INFY", "ONGC", "TCS", "WIPRO", "RELIANCE"];

  const watchlist = symbols.map((name) => {
    const basePrice = Math.floor(Math.random() * 3000) + 100;
    const percent = Math.random() * 2 - 1;

    return {
      name,
      price: +(basePrice * (1 + percent / 100)).toFixed(2),
      percent: `${percent >= 0 ? "+" : ""}${percent.toFixed(2)}%`,
      isDown: percent < 0,
    };
  });

  res.json(watchlist);
});

app.get("/summary", async (req, res) => {
  try {
    const token = req.cookies.token;
    let username = "User";

    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(decoded.id);
      if (user) {
        console.log(username);
      }
    }

    const holdings = await HoldingsModel.find({});

    let investment = 0;
    let currValue = 0;

    holdings.forEach((h) => {
      investment += h.avg * h.qty;
      currValue += h.price * h.qty;
    });

    const pnl = currValue - investment;
    const pnlPercent = investment > 0 ? (pnl / investment) * 100 : 0;

    res.json({
      username,
      holdingsCount: holdings.length,
      investment: +investment.toFixed(2),
      currentValue: +currValue.toFixed(2),
      pnl: +pnl.toFixed(2),
      pnlPercent: +pnlPercent.toFixed(2),
      marginAvailable: 3740,
      openingBalance: 3740,
      marginUsed: 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});

    const enrichedHoldings = await Promise.all(
      holdings.map(async (h) => {
        const quote = await getQuote(h.name);

        const avg = typeof h.avg === "number" ? h.avg : 0;
        const qty = typeof h.qty === "number" ? h.qty : 0;

        const rawLtp = quote?.c;

        const simulatedDay = Math.random() * 2 - 1;

        const ltp = avg * (1 + simulatedDay / 100);

        let dayPercent = simulatedDay;

        const curValue = ltp * qty;
        const pnl = curValue - avg * qty;
        const netPercent = avg > 0 ? ((ltp - avg) / avg) * 100 : 0;

        return {
          ...h.toObject(),
          price: ltp,
          net: `${netPercent >= 0 ? "+" : ""}${netPercent.toFixed(2)}%`,
          day: `${dayPercent >= 0 ? "+" : ""}${dayPercent.toFixed(2)}%`,
          isLoss: netPercent < 0,
        };
      }),
    );
    // console.log("Holdings: ", holdings);
    res.json(enrichedHoldings);
  } catch (err) {
    console.error("holdings error", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

app.get("/allOrders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // always save order
    const order = await OrdersModel.create({ name, qty, price, mode });

    if (mode === "BUY") {
      const avg = price;

      // simulate market movement ±3%
      const marketChange = price * (Math.random() * 0.06 - 0.03);
      const ltp = +(price + marketChange).toFixed(2);

      const pnl = (ltp - avg) * qty;
      const netPercent = ((ltp - avg) / avg) * 100;

      await HoldingsModel.create({
        name,
        qty,
        avg,
        price: ltp,
        net: `${netPercent >= 0 ? "+" : ""}${netPercent.toFixed(2)}%`,
        day: `+${(Math.random() * 2).toFixed(2)}%`,
        isLoss: netPercent < 0,
      });
    }

    if (mode === "SELL") {
      // 1️⃣ fetch all holdings of that stock
      const holdings = await HoldingsModel.find({ name });

      if (!holdings.length) {
        return res.status(400).json({ error: "No holdings available to sell" });
      }

      // 2️⃣ total available qty
      const totalQty = holdings.reduce((sum, h) => sum + h.qty, 0);

      if (qty > totalQty) {
        return res.status(400).json({ error: "Insufficient quantity to sell" });
      }

      // 3️⃣ reduce qty (FIFO)
      let remainingQty = qty;

      for (let h of holdings) {
        if (remainingQty === 0) break;

        if (h.qty <= remainingQty) {
          remainingQty -= h.qty;
          await HoldingsModel.deleteOne({ _id: h._id });
        } else {
          h.qty -= remainingQty;
          remainingQty = 0;
          await h.save();
        }
      }
    }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/funds", async (req, res) => {
  try {
    const token = req.cookies.token;
    let username = "User";

    if (token) {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(decoded.id);
      if (user) username = user.username;
    }

    // For now: simulated ledger
    const openingBalance = 4043.1;
    const usedMargin = 3757.3;
    const availableMargin = openingBalance - usedMargin;

    res.json({
      username,
      equity: {
        openingBalance,
        usedMargin,
        availableMargin,
        availableCash: availableMargin,
        payin: 4064.0,
        span: 0,
        deliveryMargin: 0,
        exposure: 0,
        optionsPremium: 0,
        collateralLiquid: 0,
        collateralEquity: 0,
        totalCollateral: 0,
      },
      commodity: {
        hasAccount: false,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("app started");
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
  });
