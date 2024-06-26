const User = require("./../models/userModel");

// @Desc - Create a new user
// @Method - POST
// @Route - /api/users
exports.createUser = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).json({
        message: "Please enter username",
      });
    }

    let newUser = await User.create({
      username: req.body.username,
    });

    newUser = await User.findById(newUser._id).select("-exercises -log");

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// @Desc - Get an array of all users
// @Method - GET
// @Route - /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// @Desc - Create new exercise
// @Method - POST
// @Route - /api/users/:_id/exercises
exports.createExercise = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    const username = user.username;
    const description = req.body.description;
    const duration = parseInt(req.body.duration);
    const date = req.body.date
      ? new Date(req.body.date).toDateString()
      : new Date().toDateString();

    if (!description || !duration) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const newExercise = {
      username,
      _id: id,
      description,
      duration,
      date,
    };

    user.exercises.push(newExercise);
    user.log.log.push(newExercise);

    await user.save();

    res.status(201).json(newExercise);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// @Desc - Get a full exercise log of any user
// @Method - GET
// @Route - /api/users/:_id/logs
exports.getExerciseLog = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    const username = user.username;
    const exercises = user.exercises || [];
    const count = exercises.length;

    const formattedLogs = (user.log.log || []).map(
      ({ description, duration, date }) => ({
        description,
        duration,
        date: date.toDateString(),
      })
    );

    const logObj = {
      username,
      count,
      _id: id,
      log: formattedLogs,
    };

    res.status(200).json(logObj);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};
