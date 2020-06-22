/*Our service is ready in productService.js Simply handles things in productController.js
because the productController is the one which is going to return the data to the client */

const productService = require("../service/productService");

const constants = require("../constants");

module.exports.createProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    //CreateProduct is sending the data to the createProduct service, basically sending the response to the client with appropriate data
    //from here what will do first of all try to get the data in request body(req object)

    //res.send("Product created Successfully");
    //console.log("===", req.body); //Now I am going to pass req.body data to the ProductService.js and the services will going to interact with database and create the product

    const responseFromService = await productService.createProduct(req.body);
    //Since this createProduct function returning the promise We can get the result in responseFromService variable
    response.status = 200;

    response.message = constants.productMessage.PRODUCT_CREATED; //here we are importing the message from constants folder and calling productMessage object and key PRODUCT-CREATED
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createProduct", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

//This below syntax for get() method
module.exports.getAllProducts = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await productService.getAllProducts(req.query); //this req.query going to send skip & limit values to the getAllProduct service//createProduct is a function

    response.status = 200;

    response.message = constants.productMessage.PRODUCT_FETCHED; //here we are importing the message from constants folder and calling productMessage object and key PRODUCT-CREATED
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllProducts", error);

    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

// This controller for fetching the product by their ID
module.exports.getProductById = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await productService.getProductById(req.params); //So your path params are basically presents inside of the req.params
    //All we need to do a product service for getProductById

    response.status = 200;

    response.message = constants.productMessage.PRODUCT_FETCHED; //here we are importing the message from constants folder and calling productMessage object and key PRODUCT-CREATED
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getProductById", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

// This controller for updating the product by their ID
module.exports.updateProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await productService.updateProduct({
      id: req.params.id,
      updateInfo: req.body, //Here I am getting ID and req.body for updating the existing product from PUT method
    }); //So path params are basically presents inside of the req.params
    //need to do a product service for updateProduct

    response.status = 200;

    response.message = constants.productMessage.PRODUCT_UPDATED; //here we are importing the message from constants folder and calling productMessage object and key PRODUCT_UPDATED
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateProduct", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

// This controller for deleting the product by their ID
module.exports.deleteProduct = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await productService.deleteProduct(req.params);
    //Here getting  re.params for deleting the existing product from DELETE method;
    //So path params are basically presents inside of the req.params

    response.status = 200;

    response.message = constants.productMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteProduct", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};
