const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

//Routers
const propertyRouter = require("./routes/properties");
app.use("/properties", propertyRouter);

const userRouter = require("./routes/users");
app.use("/auth", userRouter); // as per https://www.youtube.com/watch?v=OGGnjBE5qr0&list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL&index=10&t=1882s

const paymentRouter = require("./routes/payment");
app.use("/payment", paymentRouter);

const imageRouter = require("./routes/images");
app.use("/images", imageRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running on port 3001");
  });
});

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: "admin",
  password: "adminadmin",
  database: "justselldb",
  host: "fsd10-justselldb.cj4k4u2em2n1.us-east-1.rds.amazonaws.com",
  dialect: "mysql",
  port: 3306, // Default MySQL port
});
