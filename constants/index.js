module.exports = {
  defaultServerResponse: {
    status: 400,
    message: "",
    body: {},
  },
  productMessage: {
    PRODUCT_CREATED: "Product Created Successfully", //This message for Post method
    PRODUCT_FETCHED: "Product Fetched Successfully", //This message for Get method
    PRODUCT_UPDATED: "Product Updated Successfully",
    PRODUCT_DELETED: "Product Deleted Successfully",
    PRODUCT_NOT_FOUND: "Product Not Found",
  },
  userMessage: {
    SIGNUP_SUCCESS: "Signup Success",
    LOGIN_SUCCESS: "Login Success",
    DUPLICATE_EMAIL: "User already exist with given email ID",
    USER_NOT_FOUND: "User not found",
    INVALID_PASSWORD: "Incorrect Password",
  },
  requestValidateMessage: {
    BAD_REQUEST: "Invalid fields",
    TOKEN_MISSING: "Token missing from header",
  },
  databaseMessage: {
    INVALID_ID: "Invalid ID",
  },
};
