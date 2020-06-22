/* Since the productService is going to a simple function it can be reuse, We can't use createProduct controller function 
which is declared in productController.js again & again bcoz it's a basically handler to the router middleware 
and it has access to the request / response object */

/* Once the productController.js pass the data to the productService.js, productService is the one who write the business logic to insert the data 
to the database, then service basically gives response of the newly created product to the controller */
const Product = require("../database/models/productModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

//const mongoose = require("mongoose");

// productService basically returning data to the client
module.exports.createProduct = async (serviceData) => {
  try {
    //  have inserted received data from productController.js to database
    // It will basically receives the data in the argument(serviceData)
    let product = new Product({ ...serviceData }); // have created instance of the productModel and pass required data from serviceData and called the save method to insert the data Here we have used spread operator to defined the serviceData object as an arguments
    //inside of the product() you have pass the data that you want to insert in productModel
    //Instead of directly returning this result I would like to call toObject() method before returning
    let result = await product.save(); // SO save method will returns a promise,  can use the await keyword and also async keyword
    //simply return whatever return by the saved method and adding toObject for manipulating response
    return formatMongoData(result); //This formatMongoData method  have declared in the dbHelper.js, This is only apply to the single document(1 record in mongoDB is the one document)
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};

//this below service created for GET method which is get the inputs from controller
module.exports.getAllProducts = async ({ skip = 0, limit = 10 }) => {
  try {
    let products = await Product.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    // have to write a query to getting all the products, Find({}) is going to empty object
    // SO now instead of iterating over what the products over here can call the simply formatMongoData method will do the task
    return formatMongoData(products);
  } catch (error) {
    console.log("Something went wrong: Service: getAllProducts", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};

//this below service created for GET method which is get the inputs from controller
module.exports.getProductById = async ({ id }) => {
  try {
    checkObjectId(id);
    let product = await Product.findById(id);
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    //have to write a query to getting the product by ID, FindById(id) is going to empty object
    // SO now instead of iterating over what the products over here can call the simply formatMongoData method will do the task
    return formatMongoData(product);
  } catch (error) {
    console.log("Something went wrong: Service: getProductById ", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};

//this below service created for PUT method which will update the from user to existing product details
module.exports.updateProduct = async ({ id, updateInfo }) => {
  // getting the ID and req.body from updateProduct() method in productController
  try {
    checkObjectId(id);
    let product = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      updateInfo,
      { new: true } //what this will do is it will basically gives us the updated document after the Update the existing product details in PUT method
      //If  not set the new: true then It will gives the document but it is not going to returned us to the updated document
    );
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    // have to write a query to getting the product by ID, FindById(id) is going to empty object
    // SO now instead of iterating over what the products over here can call the simply formatMongoData method will do the task
    return formatMongoData(product);
  } catch (error) {
    console.log("Something went wrong: Service: updateProduct", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};

//this below service created for PUT method which will update the from user to existing product details
module.exports.deleteProduct = async ({ id }) => {
  //We are getting the ID and req.body from updateProduct() method in productController
  try {
    checkObjectId(id);
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw new Error(constants.productMessage.PRODUCT_NOT_FOUND);
    }
    // have to write a query to getting the product by ID, FindById(id) is going to empty object
    // SO now instead of iterating over what the products over here we can call the simply formatMongoData method will do the task
    return formatMongoData(product);
  } catch (error) {
    console.log("Something went wrong: Service: deleteProduct", error);
    //controller set it in the appropriate response object basically send to the client
    throw new Error(error);
  }
};
