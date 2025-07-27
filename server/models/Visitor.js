const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city: String,
  count: { type: Number, default: 1 },
});

const visitorSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
  cities: [citySchema],
});

module.exports = mongoose.model("Visitor", visitorSchema);
