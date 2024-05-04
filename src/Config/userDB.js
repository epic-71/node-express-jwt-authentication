const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURL = process.env.mongoDB_url;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
