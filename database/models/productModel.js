const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Inside of the this it basically takes an object, here we can defined the fields of your model
    name: String,
    price: Number,
    brand: String, //this is how you can define the model & pass this Schema to that particular model
  },
  {
    /*If pass this option as true what it will do is it will automatically store the created at (date) and 
    updated date fields inside of the particular model, That means the whenever the records inserted inside of the particular model, 
    then mongDb will automatically add the created at date for the particular record */

    timestamps: true,

    toObject: {
      transform: function (doc, ret, option) {
        //transform is going to function which has access to three things
        //We can manipulate return data using the ret object
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
        /*This mongoose method manipulate the response data which we have display on website, It's never affect in mongoDB database
          here we are change the _id to id and removing __v properties in payload to showing the data or retrieving data*/
      },
    },
  }
);
module.exports = mongoose.model("Product", productSchema); //Inside the model we have to pass model name : "Product" and 2nd argument you have to specify the schema
//Schema basically define what kind of data should be inserted in the particular model
