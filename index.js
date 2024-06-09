const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routers
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRouter);

module.exports = app;
