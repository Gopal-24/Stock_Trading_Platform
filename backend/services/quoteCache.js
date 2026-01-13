const cache = new Map();

const TTL = 30 * 1000;

function getCachedQuote(symbol) {
  const item = cache.get(symbol);
  if (!item) return null;

  if (Date.now() - item.time > TTL) {
    cache.delete(symbol);
    return null;
  }

  return item.data;
}

function setCachedQuote(symbol, data) {
  cache.set(symbol, {
    data,
    time: Date.now(),
  });
}

module.exports = { getCachedQuote, setCachedQuote };
