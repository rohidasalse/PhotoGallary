const mongoose = require("mongoose");

require("dotenv").config();

let mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on("connect", () => {
  console.log("connection successful");
});

module.exports = database;
