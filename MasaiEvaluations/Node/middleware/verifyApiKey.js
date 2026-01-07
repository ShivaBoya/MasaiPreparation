const ApiKey = require("../models/ApiKey");

const verifyApiKey = async (req, res, next) => {
  const { apiKey } = req.query;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid API key required.",
      error: "Invalid or missing API key"
    });
  }

  const valid = await ApiKey.findOne({ apiKey });
  if (!valid) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid API key required.",
      error: "Invalid or missing API key"
    });
  }

  next();
};

module.exports = verifyApiKey;
