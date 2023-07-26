const express = require("express");
const Car_Info = require("../models/car_info");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const cars = await Car_Info.findAll();
  const user = req.session.user;
  if (user) {
    res.render("index", { cars, user });
  } else {
    res.render("index", { cars });
  }
});

module.exports = router;
