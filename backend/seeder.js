const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const colors = require("colors");
const users = require("./data/users.js");
const requests = require("./data/requests.js");
const Request = require("./models/requestModel.js");
const User = require("./models/userModel.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Request.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    //first user = admin
    const adminUser = createdUsers[0]._id;

    const sampleRequests = requests.map((request) => {
      return { ...request, user: adminUser };
    });

    await Request.insertMany(sampleRequests);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Request.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
