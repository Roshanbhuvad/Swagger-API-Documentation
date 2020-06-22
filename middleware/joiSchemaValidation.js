//I add middleware on the routes(productRoutes.js) so that I can check the schema before handing over the request to the controller
const Joi = require("@hapi/joi");
const constants = require("../constants");

const validateObjectSchema = (data, schema) => {
  /* this function has object that we want to validate, it has also access to the schema against which we have to validate the data
    & going to pass this data object to the schema*/
  const result = Joi.validate(data, schema, { convert: false });
  //const result = schema.validate(data); //I can make it use of joi validate method and compare both of the data & schema objects
  //First argument have to pass the object(data) that you want to validate and then pass the schema to validate

  if (result.error) {
    const errorDetails = result.error.details.map((value) => {
      //here I mapped(iterate) the Joi validated error details and only getting the message and key from the error object
      //Here I prepare the object
      return {
        //Here displaying what type of error in user requested data, while user entering new product
        error: value.message, //getting the message and path error details from errorDetails object
        path: value.path,
      };
    });
    return errorDetails;
  }
  return null;
  //console.log("errorDetails", errorDetails);
};

module.exports.validateBody = (schema) => {
  /*Since this middleware that  will be adding to the routes(productRoutes.js) as a sub-stack middleware
        so this middleware is going to have the access to the request and response and next function like a (req, res, next) */

  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.body, schema); //For the data get it from the req.body
    //Inside of this going to write a logic for validating the schema against the request body
    // will add this middleware to the productRoutes.js, All we need to call the joi.validate method

    if (error) {
      //here If there is any error then respond the client with error
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; // Here calling the requestValidateMessage object in index.js from constants
      return res.status(response.status).send(response); //Here  sending the response from middleware itself  back to the client no need to further controller
    }
    return next(); //otherwise call the next function from the middleware which is create productController if there is no any error
    //If the next() function is called it is going to the createProduct  function in productController.js
  };
};

module.exports.validateQueryParams = (schema) => {
  return (req, res, next) => {
    let response = { ...constants.defaultServerResponse };
    const error = validateObjectSchema(req.query, schema); //req.query holds the variable which we pass in the API like query parameters

    if (error) {
      response.body = error;
      response.message = constants.requestValidateMessage.BAD_REQUEST; // Here we are calling the requestValidateMessage object in index.js from constants
      return res.status(response.status).send(response); //Here we are sending the response from middleware itself  back to the client no need to further controller
    }
    return next();
  };
};
