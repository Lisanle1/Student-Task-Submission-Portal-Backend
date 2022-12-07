const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Established....");
  } catch (error) {
    console.log(`DB Error: ${error}`);
  }
};

module.exports = connectDB;
