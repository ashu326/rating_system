require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { serverConfig } = require("./config/config");
const db = require("./client/db");

const rideController = require("./controllers/rideController").rideController;
const userController = require("./controllers/userController").userController;

const app = express();
const rideRouter = express.Router();
const userRouter = express.Router();

/**
 * body parser to retrieve data from body
 */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1/ride", rideRouter);
rideController(rideRouter);

app.use("/api/v1/user", userRouter);
userController(userRouter);

db.connection()
  .then(() => {
    app.listen(serverConfig.PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`server listening at port: ${serverConfig.PORT}`);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
