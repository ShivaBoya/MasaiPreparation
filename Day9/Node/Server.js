const express = require("express");
const app = express();

app.use(express.json());

const cache = new Map();

function getCacheKey(query) {
  return JSON.stringify(query);
}

function suggestIndexes(queries) {
  const indexMap = {};

  queries.forEach(q => {
    const keys = Object.keys(q.filters).sort().join("_");
    indexMap[keys] = (indexMap[keys] || 0) + 1;
  });

  return Object.keys(indexMap)
    .filter(k => indexMap[k] > 1)
    .map(k => k.split("_"));
}

app.post("/query", (req, res) => {
  const key = getCacheKey(req.body);

  if (cache.has(key)) {
    return res.json({ source: "cache", data: cache.get(key) });
  }

  const result = {
    rows: [],
    executedAt: new Date().toISOString()
  };

  cache.set(key, result);
  res.json({ source: "db", data: result });
});

app.post("/analyze", (req, res) => {
  const indexes = suggestIndexes(req.body);
  res.json({ recommendedIndexes: indexes });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
