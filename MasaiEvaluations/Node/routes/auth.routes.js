const express = require("express");
const { v4: uuidv4 } = require("uuid");
const ApiKey = require("../models/ApiKey");

const router = express.Router();

router.post("/generate-key", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Valid email is required"
    });
  }

  const exists = await ApiKey.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Email already registered. Use existing API key."
    });
  }

  const apiKey = "ak_" + uuidv4().replace(/-/g, "");
  await ApiKey.create({ email, apiKey });

  res.status(201).json({
    success: true,
    message: "API key generated successfully",
    data: { email, apiKey }
  });
});

module.exports = router;
