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
