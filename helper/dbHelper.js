//this helper method just checking whether sending data is array of data or single data
const mongoose = require("mongoose");
const constants = require("../constants"); //We need a mongoose for ObjectId validation in GET method for getProductById

module.exports.formatMongoData = (data) => {
  //It is going to receive the data or can say going to receive the document
  //This can be a array of documents or single document

  if (Array.isArray(data)) {
    //this isArray() is going to return a boolean value
    //So if this is an array we need to iterate over these data call the toObject() method on individual documents
    //here I am  using ""for of"" loop
    let newDataList = [];
    for (value of data) {
      //in this iteration i will get single data
      newDataList.push(value.toObject());
      //value.toObject(); //we need to store newly transform value object newDataList[]
    }
    return newDataList;
  }
  return data.toObject(); //If data are not array then simply returns toObject()
};

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(constants.databaseMessage.INVALID_ID);
  }
};
