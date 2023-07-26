const express = require("express");
const { Op, Sequelize, } = require("sequelize"); // Op 객체를 가져옵니다.
const Car_Info = require("../models/car_info");
const router = express.Router();

var cars;
var val;
var exit;
var timeDifferenceInMinutes;

router.get("/", async (req, res, next) => {
  res.render("show", { cars });
});

router.post("/", async (req, res, next) => {
  console.log(req.body.carnum);
  console.log("console 실행중");
  cars = await Car_Info.findAll({
    where: {
      CarNum: req.body.carnum,
    },
  });
  if (cars.length > 0) {
    val = 1;
    exit = await Car_Info.findAll({
      where: {
        ExitTime: {
          [Op.not]: null,
        },
        CarNum: req.body.carnum,
      },
    });
    if (exit.length > 0) {
      const exitTime = new Date(cars[0].ExitTime);
      const enterTime = new Date(cars[0].EnterTime);

      const timeDifferenceInMillis = exitTime - enterTime;

      timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);

      console.log("Time Difference (in minutes):", timeDifferenceInMinutes);

      await Car_Info.update(
        {
          Time: timeDifferenceInMinutes,
        },
        {
          where: {
            CarNum: req.body.carnum,
          }

        },
      )
    } else {
      await Car_Info.update(
        {
          ExitTime: Sequelize.literal('NOW()'),
        },
        {
          where: {
            CarNum: req.body.carnum,
          }

        },
      )
      cars = await Car_Info.findAll({
        where: {
          CarNum: req.body.carnum,
        },
      });
      const exitTime = new Date(cars[0].ExitTime);
      const enterTime = new Date(cars[0].EnterTime);

      const timeDifferenceInMillis = exitTime - enterTime;

      timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);

      console.log("Time Difference (in minutes):", timeDifferenceInMinutes);

      await Car_Info.update(
        {
          Time: timeDifferenceInMinutes,
          ExitTime: null,
        },
        {
          where: {
            CarNum: req.body.carnum,
          }

        },
      )
      cars = await Car_Info.findAll({
        where: {
          CarNum: req.body.carnum,
        },
      });
    }
  } else {
    val = 0;
  }
  try {
    res.json(cars);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
