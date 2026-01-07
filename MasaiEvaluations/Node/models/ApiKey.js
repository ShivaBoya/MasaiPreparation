const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true }
});

module.exports = mongoose.model("ApiKey", apiKeySchema);
