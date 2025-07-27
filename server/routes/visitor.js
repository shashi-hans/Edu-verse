// routes/visitor.js
const express = require("express");
const router = express.Router();
const geoip = require("geoip-lite");
const Visitor = require("../models/Visitor");

router.post("/visit", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const geo = geoip.lookup(ip);
    const city = geo?.city || "Unknown";

    let visitor = await Visitor.findOne();
    console.log('visitor>>>',visitor)

    if (!visitor) {
      visitor = new Visitor({
        total: 1,
        cities: [{ city }],
      });
    } else {
      visitor.total += 1;

      const cityData = visitor.cities.find((r) => r.city === city);
      if (cityData) {
        cityData.count += 1;
      } else {
        visitor.cities.push({ city });
      }
    }

    await visitor.save();
    res.status(200).json({ total: visitor.total, city });
  } catch (err) {
    console.error("Visitor error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Optional route to get stats
router.get("/count", async (req, res) => {
  try {
    const stats = await Visitor.findOne();
    console.log('stats>>>>>',stats)
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
