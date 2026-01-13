const axios = require("axios");

const FINNHUB_BASE = "https://finnhub.io/api/v1";

const quoteCache = new Map();
const CACHE_TTL = 60 * 1000;

const cache = {};

const symbolMap = {
  RELIANCE: "RELIANCE.NS",
  TCS: "TCS.NS",
  HDFCBANK: "HDFCBANK.NS",
  ITC: "ITC.NS",
  SBIN: "SBIN.NS",
};

async function getQuote(symbol) {
  const mapped = symbolMap[symbol] || symbol;
  const now = Date.now();

  if (cache[mapped] && now - cache[mapped].timestamp < CACHE_TTL) {
    return cache[mapped].data;
  }

  try {
    const res = await axios.get(`${FINNHUB_BASE}/quote`, {
      params: {
        symbol: mapped,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    const data = res.data;

    cache[mapped] = {
      data,
      timestamp: now,
    };

    return data;
  } catch (err) {
    console.warn(`Finnhub unavailable for ${mapped}`);
    return cache[mapped]?.data || { c: null, dp: null };
  }
}

module.exports = { getQuote };
