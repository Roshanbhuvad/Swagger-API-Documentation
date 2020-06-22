const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Inside of the this it basically takes an object, here we can defined the fields of your mode
    email: String,
    password: String, //this is how you can define the model & pass this Schema to that particular model
  },
  {
    /* That means the whenever the records inserted inside of the particular model, 
    then mongDb will automatically add the created at date for the particular record */

    timestamps: true,

    toObject: {
      transform: function (doc, ret, option) {
        //transform is going to function which has access to three things
        //We can manipulate return data using the ret object
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
        /*This mongoose method manipulate the response data which we have display on website, It's never affect in mongoDB database
          here we are change the _id to id and removing password properties in payload to showing the data or retrieving data*/
      },
    },
  }
);
module.exports = mongoose.model("User", userSchema); //Inside the model we have to pass model name : "User" and 2nd argument you have to specify the schema
//Schema basically define what kind of data should be inserted in the particular model
