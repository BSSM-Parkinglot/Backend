const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.render("signup");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const dup_carnum = await User.findAll({
    where: {
      CarNum: req.body.carnum,
    },
  });
  const dup_user = await User.findAll({
    where: {
      UserName: req.body.username,
    },
  });
  if (dup_carnum.length > 0) {
    res.send("carnum_fail");
  } else if (dup_user.length > 0) {
    res.send("user_fail");
  } else {
    await User.create({
      UserName: req.body.username,
      Password: req.body.password,
      CarNum: req.body.carnum,
    });
    res.send("success");
  }
});

router.get('/info', async (req, res, next) => {
  const user = await User.findAll();
  res.render('user', { user });
})

module.exports = router;
