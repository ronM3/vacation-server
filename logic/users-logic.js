const usersDao = require("../dao/users-dao");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const config = require("../config.json");
const crypto = require("crypto");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

async function login(userLoginDetails) {
  if (userLoginDetails.userName === "" || userLoginDetails.password === "") {
    throw new ServerError(ErrorType.GENERAL_ERROR);
  }
  userLoginDetails.password = crypto
    .createHash("md5")
    .update(saltLeft + userLoginDetails.password + saltRight)
    .digest("hex");

  userLoginDetails = await usersDao.login(userLoginDetails);

  const token = jwt.sign(
    {
      userID: userLoginDetails.userID,
      userType: userLoginDetails.userType,
    },
    config.secret
  );
  return {
    token: token,
    userID: userLoginDetails.userID,
    userType: userLoginDetails.userType,
  };
}

async function addUser(userDetails, userType) {
  if (await usersDao.isUserExistByName(userDetails.userName)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  userDetails.password = crypto
    .createHash("md5")
    .update(saltLeft + userDetails.password + saltRight)
    .digest("hex");

  await usersDao.addUser(userDetails, userType);
}

async function deleteUser(userToDelete) {
  let userDelete = await usersDao.deleteUser(userToDelete);
  return userDelete;
}

async function getUserID(userID) {
  let user = await usersDao.getUserID(userID);
  return user;
}

module.exports = {
  login,
  getUserID,
  addUser,
  deleteUser,
};
