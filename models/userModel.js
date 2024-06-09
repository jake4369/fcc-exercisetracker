const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, "Please enter username"],
  },
});

const user = mongoose.model("user", UserSchema);

module.exports = user;
