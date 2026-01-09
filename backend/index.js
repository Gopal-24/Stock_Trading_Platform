require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");

const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const mongo_url = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

    // save order history
    await OrdersModel.create({ name, qty, price, mode });

    if (mode === "BUY") {
      await HoldingsModel.create({
        name,
        qty,
        buyPrice: price,
        currentPrice: price,
      });
    }

    res.status(201).json({ message: "Order placed & holding created" });
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
