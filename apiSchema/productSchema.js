//All the Products related API schema will go into this particular file
const Joi = require("@hapi/joi");

//We are going to export a function below
module.exports.createProductSchema = Joi.object().keys({
  //I want to define object schema
  //Inside of the keys we can pass an object , here we can define all the fields that I want to validate
  name: Joi.string().required(), // This name field should be filled with use of Joi validation to the user input
  brand: Joi.string().required(),
  price: Joi.number().required(),
  // We have successfully created schema
});

module.exports.getAllProductSchema = Joi.object().keys({
  skip: Joi.string(), // we can make use of this schema and apply schema validation middleware on the get method in productRoutes.js
  limit: Joi.string(),
});

module.exports.updateProductSchema = Joi.object().keys({
  name: Joi.string(),
  price: Joi.number(),
  brand: Joi.string(),
});
