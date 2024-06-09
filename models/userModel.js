const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({});

const user = mongoose.model("user", UserSchema);

module.exports = user;
