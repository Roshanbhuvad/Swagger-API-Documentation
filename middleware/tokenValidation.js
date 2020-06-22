const constants = require("../constants");
const jwt = require("jsonwebtoken");

module.exports.validationToken = (req, res, next) => {
  //Since this going to a middleware it will access to req, res, next objects
  let response = { ...constants.defaultServerResponse };

  try {
    if (!req.headers.authorization) {
      //If check authorization is present inside of the header, we are passing authorization in header

      throw new Error(constants.requestValidateMessage.TOKEN_MISSING);
    }
    //console.log(req.headers.authorization.split("Bearer")[1].trim());
    const token = req.headers.authorization.split("Bearer")[1].trim();
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY || "my-secret-key"
    ); //First argument we have to pass the token, next we have to pass secret key
    console.log("decoded", decoded);
    return next(); //We can call next middleware from here
  } catch (error) {
    console.log("Error", error);
    response.message = error.message;
    response.status = 401;
  }
  return res.status(response.status).send(response);
};
