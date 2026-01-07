const express = require("express");
const app = express();

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

const timer = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });

  next();
};

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== "secret123") {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  next();
};

app.use(logger);
app.use(timer);

app.get("/public", (req, res) => {
  res.send("Public Route");
});

app.get("/protected", auth, (req, res) => {
  res.send("Protected Route Access Granted");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    error: err.message || "Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
