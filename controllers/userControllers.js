const User = require("./../models/userModel");

// @Desc - Create a new user
// @Method - POST
// @Route - /api/users
exports.createUser = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.json({
        message: "Please enter username",
      });
    }

    let newUser = await User.create({
      username: req.body.username,
    });

    newUser = await User.findById(newUser._id).select("-exercises -logs");

    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({
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

    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({
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
      return res.json({
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
      return res.json({
        message: "Please fill in all required fields",
      });
    }

    const newExercise = {
      username,
      id,
      description,
      duration,
      date,
    };

    user.exercises.push(newExercise);

    await user.save();

    res.json(newExercise);
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};
