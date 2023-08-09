const express = require("express");
const { Op, Sequelize } = require("sequelize"); // Op 객체를 가져옵니다.
const Car_Info = require("../models/car_info");
const moment = require("moment");
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

    res.redirect(`car/${carnum}`);
  } else {
    const cars = await Car_Info.findAll({
      where: {
        CarNum: carnum,
      },
    });
    const enter = moment(cars[0].EnterTime, dateFormat);
    const exit = moment(cars[0].ExitTime, dateFormat);

    const differenceInMinutes = exit.diff(enter, "minutes");

    const money = (differenceInMinutes / 10) * 1000;

    console.log("enter: " + cars[0].EnterTime);
    console.log("exit: " + cars[0].ExitTime);
    console.log("주차한 분: " + differenceInMinutes);
    console.log("돈: " + money);

    await Car_Info.update(
      {
        Time: differenceInMinutes,
        Money: money,
      },
      {
        where: {
          CarNum: carnum,
        },
      }
    );
    console.log("ddsfdsfsd" + carnum);
    res.redirect(`car/${carnum}`);
  }

  //   if (cars.length > 0) {
  //     val = 1;
  //     exit = await Car_Info.findAll({
  //       where: {
  //         ExitTime: {
  //           [Op.not]: null,
  //         },
  //         CarNum: req.body.carnum,
  //       },
  //     });
  //     if (exit.length > 0) {
  //       const exitTime = new Date(cars[0].ExitTime);
  //       const enterTime = new Date(cars[0].EnterTime);

  //       const enter = moment(cars[0].EnterTime, dateFormat);
  //       const exit = moment(cars[0].ExitTime, dateFormat);

  //       const differenceInMinutes = exit.diff(enter, "minutes");

  //       await Car_Info.update(
  //         {
  //           Time: differenceInMinutes,
  //         },
  //         {
  //           where: {
  //             CarNum: req.body.carnum,
  //           },
  //         }
  //       );
  //     } else {
  //       await Car_Info.update(
  //         {
  //           ExitTime: Sequelize.literal("NOW()"),
  //         },
  //         {
  //           where: {
  //             CarNum: req.body.carnum,
  //           },
  //         }
  //       );
  //       cars = await Car_Info.findAll({
  //         where: {
  //           CarNum: req.body.carnum,
  //         },
  //       });
  //       const exitTime = new Date(cars[0].ExitTime);
  //       const enterTime = new Date(cars[0].EnterTime);

  //       const timeDifferenceInMillis = exitTime - enterTime;

  //       timeDifferenceInMinutes = timeDifferenceInMillis / (1000 * 60);

  //       money = (timeDifferenceInMinutes / 10) * 1000;

  //       console.log("Time Difference (in minutes):", timeDifferenceInMinutes);

  //       await Car_Info.update(
  //         {
  //           Time: timeDifferenceInMinutes,
  //           ExitTime: null,
  //           Money: money,
  //         },
  //         {
  //           where: {
  //             CarNum: req.body.carnum,
  //           },
  //         }
  //       );
  //       cars = await Car_Info.findAll({
  //         where: {
  //           CarNum: req.body.carnum,
  //         },
  //       });
  //     }
  //   } else {
  //     val = 0;
  //   }
  //   try {
  //     res.json(cars);
  //   } catch (err) {
  //     console.error(err);
  //     next(err);
  //   }
});

module.exports = router;
