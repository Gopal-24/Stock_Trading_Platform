const axios = require("axios");
const { getCachedQuote, setCachedQuote } = require("./quoteCache");

const FINNHUB_BASE = "https://finnhub.io/api/v1";

const symbolMap = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  HDFCBANK: "HDFCBANK.NS",
  ITC: "ITC.NS",
  SBIN: "SBIN.NS",
  INFY: "INFY.NS",
  WIPRO: "WIPRO.NS",
};

async function getQuote(symbol) {
  const mapped = symbolMap[symbol] || symbol;

  const cached = getCachedQuote(mapped);

  if (cached) return cached;

  try {
    const res = await axios.get(`${FINNHUB_BASE}/quote`, {
      params: {
        symbol: mapped,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    setCachedQuote(mapped, res.data);

    return res.data;
  } catch (err) {
    console.warn(`Finnhub unavailable for ${mapped}`);
    return null;
  }
}

module.exports = { getQuote };
