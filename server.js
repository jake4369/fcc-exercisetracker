const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");

dotenv.config();

const app = require("./index");
const DB = process.env.MONGODB_URI.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

mongoose
  .connect(DB)
  .then(() =>
    console.log(colors.magenta.underline("\nDatabase succesfully connected"))
  )
  .catch((err) => console.error(err));

// Server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(
    colors.blue.underline(
      "\nYour app is listening on port " + listener.address().port
    )
  );
});
