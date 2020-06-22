const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }); //This basically expect some arguments, such as the URL for database and the extra options
    console.log("Database Connected");
    //For the second argument pass the various option one the option is the useNewUrlParser, You need to pass it for the newer version of mongoDB
    //We are fetching URL from environment variable(from .env folder)
  } catch (error) {
    console.log("Database Connectivity Error", error);
    throw new Error(error);
  }
  //This connect method returns a promises that is why we are using async and await
};
