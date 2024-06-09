const express = require("express");
const userControllers = require("./../controllers/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

router.route("/:_id/exercises").post(userControllers.createExercise);
router.route("/:_id/logs").get(userControllers.getExerciseLog);

module.exports = router;
