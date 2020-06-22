const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const dbConnection = require("./database/connection");
dotEnv.config(); //Once you called dotEnv.config() what it will do, it will look for a file in your project folder called as .env file
//Whatever variable declared in .env file this particular package make available in the process.env and that particular variable name

const app = express();
//All you need to configure the CORS

//db Connectivity
dbConnection();

//cors
app.use(cors());

//Request payload middleware
app.use(express.json()); // This will help in parsing the Request Content-Type:'application/json'
app.use(express.urlencoded({ extended: true })); //This particular middleware is going to help in parsing in the form URLencoded data

// going to use third-party middleware called CORS(cross-origin Resource Sharing) which is used for cross origin request
/*Whenever you are building the REST API it is really important to have your server CORS enable, 
If you don't enable your server with CORS, what will happens is you will get a error */

//The way you can used application-level middleware we can use app.use() below
//app.use to implement application-level middleware

//going to create the route for handling the product related API in below use method
//Below have defined the base path, then transfer the handler to the router middleware /routes/productRoutes
app.use("/api/v1/product", require("./routes/productRoutes"));
// this particular API path will be handles by the productRoutes.js file
//have defined this API base path in application level middleware, but  will handles this particular things in Router-level middleware
/*This is a standard to start your API with /api naming then you can name the API version like /v1 .
suppose you have made major changes in v2 version, so at least you have the v1 routes for back supporting existing user
if you override the existing API then all your existing users who are using the previous APi that API will be broke   */

app.use("/api/v1/user", require("./routes/userRoutes"));

//API Documentation
if (process.env.NODE_ENV != "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.get("/", (req, res, next) => {
  //have assign myMiddleware inside the get method that is called sub-stack middleware, or we can say mounted on the path itself
  res.send("Hello from Node API Server");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Error handling middleware
/*This middleware comes in handy whenever you forget to try & catch run-time any sort of error
That particular error will fallbacks to this particular error middleware */
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
