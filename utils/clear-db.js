const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Users = require("./../models/userModel");

dotenv.config();

const DB = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection succesful"));

// DELETE ALL DATA FROM DATABASE
const deleteUsers = async () => {
  try {
    await Users.deleteMany();
    console.log("Users successfuly deleted!");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--delete-users") {
  deleteUsers();
}
