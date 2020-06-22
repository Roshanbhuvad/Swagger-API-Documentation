//This file handles the Router-level middleware

const express = require("express");

const router = express.Router();
const productController = require("../controller/productController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation"); // have added this middleware for productRoutes.js
const productSchema = require("../apiSchema/productSchema"); //I already have the product schema over here which we have imported from apischema --> product
const tokenValidation = require("../middleware/tokenValidation");
/* after routes the handler to Router-level middleware from server.js 
 then that passed the handler to createProduct controller */
router.post(
  "/",
  tokenValidation.validationToken,
  joiSchemaValidation.validateBody(productSchema.createProductSchema),
  productController.createProduct //until and unless this (joiSchemaValidation) validation is success will not able to call createProduct function in ProductController.js
);

/*Since this productSchema file is going to holds multiple schemas for  various product related API, I am simply fetching the createProductSchema becoz that's what routes is for .this validateBody middleware expects a schema that we want to validate
 Whatever wrote over here will handled by the productController.js
this particular route will handle those routes who starts with "/api/v1/product",
 you can say that you have basically defined your base path on the app level middleware inside the server.js and all the further routes we are basically handling inside the productRoutes.js
It good to define base path over here instead of defining for each route path, because all the product related routes will always start with "/api/v1/product" */

router.get("/:id", productController.getProductById);

router.put(
  "/:id",
  tokenValidation.validationToken,
  joiSchemaValidation.validateBody(productSchema.updateProductSchema),
  productController.updateProduct
);

//In get method are transferred the request to the productController.js
router.get(
  "/",
  tokenValidation.validationToken,
  joiSchemaValidation.validateQueryParams(productSchema.getAllProductSchema),
  /*applying schema validation middleware over here, This time not calling the validateBody 
         because want the query params in API not the body. we want validate request.query params*/
  productController.getAllProducts
);

router.delete(
  "/:id",
  tokenValidation.validationToken,
  productController.deleteProduct
);

module.exports = router;
// can make use of this routes to handle  this particular path app.use("/api/v1/product"); in server.js file
