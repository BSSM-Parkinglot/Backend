const express = require("express");
const Spot_Info = require("../models/spot_info");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const spots = await Spot_Info.findAll();
  const user = req.session.user;
  res.render("index", { spots, user });
});

module.exports = router;
