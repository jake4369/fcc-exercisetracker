const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please enter username"],
    },
    exercises: {
      type: [Object],
    },
    log: {
      type: [Object],
    },
  },
  { versionKey: false }
);

const user = mongoose.model("user", UserSchema);

module.exports = user;
