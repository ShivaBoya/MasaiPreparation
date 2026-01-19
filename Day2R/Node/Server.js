

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const USER = {
  username: "admin",
  password: "password123"
};

function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("utf8");
  const [username, password] = decoded.split(":");

  if (username !== USER.username || password !== USER.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.user = username;
  next();
}

app.post("/login", basicAuth, (req, res) => {
  res.cookie("auth", "true", {
    httpOnly: true,
    sameSite: "strict"
  });
  res.status(200).json({ message: "Login successful" });
});

function cookieAuth(req, res, next) {
  if (req.cookies.auth !== "true") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

app.get("/protected", cookieAuth, (req, res) => {
  res.status(200).json({ message: "Protected data access granted" });
});

app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "Logged out" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
