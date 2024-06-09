const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please enter username"],
    },
    exercises: {
      type: [
        {
          username: { type: String },
          description: { type: String },
          duration: { type: Number },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  },
  { versionKey: false }
);

const user = mongoose.model("user", UserSchema);

module.exports = user;
