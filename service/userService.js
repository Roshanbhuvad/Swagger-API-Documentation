const User = require("../database/models/userModel");
const constants = require("../constants");
const { formatMongoData } = require("../helper/dbHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL); 
    }
    //Below code is going to return a promise, and 1st argument is password and 2nd is saltRound which can be string or number it depends on approach
    password = await bcrypt.hash(password, 12); //Recommended SaltRound Number:10-12  //we can do let the bcrypt library generates salt for you for that we need pass number,Higher the number so it more complex to process the hash that is why we used 12 number
    const newUser = new User({ email, password }); //Now proceed with saving the user below
    let result = await newUser.save(); //Now we saved the user
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: signup", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND); //can defined the type of error in constants
    }
    const isValid = await bcrypt.compare(password, user.password); //In the first argument we are going to pass plain text password sent by the user and I am going to pass the Hash password
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "1d" }
    );
    //1st argument is payload or claim inside of Json web token, You should not pass any sort of sensitive data inside of the payload bcoz we can decode the data without need of secret key and also don't put huge data in payload

    return { token };
  } catch (error) {
    console.log("Something went wrong: Service: login", error);
    
    throw new Error(error);
  }
};
