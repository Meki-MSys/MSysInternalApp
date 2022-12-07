const mongoose = require("mongoose");
const config = require("config");
const mongoDB = config.get("mongoURI");

// Using Mongoose connect with MongoDatabase

const connectMongoDB = async () => {
  try {
   await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
