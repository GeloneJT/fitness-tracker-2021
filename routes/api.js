const router = require("express").Router();
const { Workout } = require("../models");

router.post("/api/workouts", ({ body }, res) => {
  console.log("POST/Create Workouts :", { body });
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Get workouts by ID
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
        totalWeight: {
          $sum: "$exercises.weight",
        },
      },
    },
  ])
    .sort({
      _id: -1,
    })
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
        totalWeight: {
          $sum: "$exercises.weight",
        },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.get("/api/workouts", (req, res) => {
//   Workout.find({})
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.put("/api/workouts/:id", (req, res) => {
  console.log("PUT/FBIAU ", req);
  Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
    .then((dbWorkout) => {
      return res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Look up  .aggregate for Mongoose

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      return res.json(true);
    })
    .catch((err) => {
      res.json(400).json(err);
    });
});
module.exports = router;
