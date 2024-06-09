const dotenv = require("dotenv").config();
const app = require("./index");

console.log(process.env.PORT);

// Server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
