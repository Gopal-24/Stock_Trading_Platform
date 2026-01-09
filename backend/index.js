require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");

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

app.listen(PORT, () => {
  console.log("app started");
  mongoose.connect(mongo_url);
  console.log("db connected");
});
