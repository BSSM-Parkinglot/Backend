const express = require("express");
const { Op, Sequelize } = require("sequelize"); // Op 객체를 가져옵니다.
const Car_Info = require("../models/car_info");
const moment = require("moment-timezone");
const router = express.Router();

const dateFormat = "YYYY-MM-DD HH:mm:ss";

router.get("/:carnum", async (req, res, next) => {
  const carnum = req.params.carnum;
  console.log("hello" + carnum);
  const cars = await Car_Info.findAll({
    where: {
      CarNum: carnum,
    },
  });
  res.render("show", { cars });
});

router.post("/", async (req, res, next) => {
  const carnum = req.body.carnum;
  const cars = await Car_Info.findAll({
    where: {
      CarNum: carnum,
      ExitTime: null,
    },
  });

  if (cars.length > 0) {
    let i = 0;
    while (cars[i] != undefined) {
      await Car_Info.update(
        {
          ExitTime: Sequelize.literal("NOW()"),
        },
        {
          where: {
            CarNum: carnum,
          },
        }
      );
      const cars = await Car_Info.findAll({
        where: {
          CarNum: carnum,
        },
      });

      const enter = moment(cars[i].EnterTime, dateFormat);
      const exit = moment(cars[i].ExitTime, dateFormat)

      const differenceInMinutes = exit.diff(enter, "minutes");

      const money = (differenceInMinutes / 10) * 1000;

      console.log("enter: " + cars[i].EnterTime);
      console.log("exit: " + cars[i].ExitTime);
      console.log("주차한 분: " + differenceInMinutes);
      console.log("돈: " + money);

      await Car_Info.update(
        {
          Time: differenceInMinutes,
          Money: money,
        },
        {
          where: {
            id: cars[i].id,
            CarNum: carnum,
          },
        }
      );
      i++;
    }
    await Car_Info.update(
      {
        ExitTime: null,
      },
      {
        where: {
          CarNum: carnum,
        },
      }
    );
    res.redirect(`car/${carnum}`);
  } else {
    const cars = await Car_Info.findAll({
      where: {
        CarNum: carnum,
      },
    });
    let i = 0;
    while (cars[i] != undefined) {
      
      const enter = moment(cars[i].EnterTime, dateFormat);
      const exit = moment(cars[i].ExitTime, dateFormat)

      const differenceInMinutes = exit.diff(enter, "minutes");

      const money = (differenceInMinutes / 10) * 1000;

      console.log("enter: " + cars[i].EnterTime);
      console.log("exit: " + cars[i].ExitTime);
      console.log("주차한 분: " + differenceInMinutes);
      console.log("돈: " + money);

      await Car_Info.update(
        {
          Time: differenceInMinutes,
          Money: money,
        },
        {
          where: {
            id: cars[i].id,
            CarNum: carnum,
          },
        }
      );
      i++;
    }
    res.redirect(`car/${carnum}`);
  }
});

module.exports = router;
