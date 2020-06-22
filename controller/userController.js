const constants = require("../constants");
const userService = require("../service/userService");

module.exports.signup = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    //signup is sending the data to the signup service, basically sending the response to the client with appropriate data
    //from here what will do first of all try to get the data in request body(req object)
    const responseFromService = await userService.signup(req.body);

    response.status = 200;

    response.message = constants.userMessage.SIGNUP_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: signup", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};

module.exports.login = async (req, res) => {
  let response = { ...constants.defaultServerResponse }; //declared the object
  try {
    const responseFromService = await userService.login(req.body);
    //Since this login function returning the promise We can get the result in responseFromService variable

    response.status = 200;

    response.message = constants.userMessage.LOGIN_SUCCESS;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: login", error);
    //response.status = 400;
    response.message = error.message;
    //response.body = {};
  }
  return res.status(response.status).send(response);
};
