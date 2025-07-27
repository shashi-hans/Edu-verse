const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  region: String,
  count: { type: Number, default: 1 },
});

const visitorSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  regions: [regionSchema],
});

module.exports = mongoose.model("Visitor", visitorSchema);
