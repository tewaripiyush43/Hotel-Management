require("dotenv").config();
const PORT = process.env.PORT || 9000;
const CORS_PORT = process.env.CORS_PORT;

const express = require("express");
const cors = require("cors");

const { connectMongoDB } = require("./connection");

const roomTypeRouter = require("./routes/roomType");

var app = express();

app.use(cors({ origin: CORS_PORT, methods: "*" }));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//connection
const DB = process.env.DB;
connectMongoDB(DB);

app.use("/roomtype", roomTypeRouter);

app.listen(PORT, function () {
  console.log("server is connected to port 9000");
});
