const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

const USER = {
  username: "admin",
  password: "password123",
};

function basicAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = decoded.split(":");

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.user = username;
  next();
}

app.post("/login", basicAuthMiddleware, (req, res) => {
  res.cookie("auth", "authenticated", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({ message: "Login successful" });
});

function cookieAuthMiddleware(req, res, next) {
  const authCookie = req.cookies.auth;

  if (!authCookie || authCookie !== "authenticated") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}

app.get("/protected", cookieAuthMiddleware, (req, res) => {
  res.json({ message: "Access granted to protected route" });
});

app.post("/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
