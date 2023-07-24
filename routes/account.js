const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("account");
});

router.post("/", async (req, res, next) => {
  var user;
  if (req.session.user) {
    user = await User.findAll({
      where: {
        id: req.session.user.id,
        UserName: req.session.user.username,
        CarNum: req.body.carnum,
      },
    });
  } else {
    res.send("fail");
  }
  try {
    if (req.session.user && user.length > 0) {
      await User.update(
        {
          AccountNum: req.body.account,
        },
        {
          where: {
            id: req.session.user.id,
            UserName: req.session.user.username,
            CarNum: req.body.carnum,
          },
        }
      );
      res.send("success");
    } else if (req.session.user) {
      res.send("notcarnum");
    } else {
      res.send("fail");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
