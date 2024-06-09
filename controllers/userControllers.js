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

    const newUser = await User.create({
      username: req.body.username,
    });

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
