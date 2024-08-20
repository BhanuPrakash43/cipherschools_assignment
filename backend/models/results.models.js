const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  username: { type: String },
  result: { type: Array, default: [] },
  attempts: { type: Number, default: 0 },
  achieved: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const results = mongoose.model("results", resultSchema);

module.exports = results;
