require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const authRoute = require("./routes/AuthRoutes");

const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);

app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
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
