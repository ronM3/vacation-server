const { response } = require("express");
const connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function login(userLoginDetails) {
  let sql = "SELECT * FROM users where userName =? and password =?";
  let parameters = [userLoginDetails.userName, userLoginDetails.password];
  let usersLoginResult;

  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userLoginDetails),
      e
    );
  }
  if (
    usersLoginResult == null ||
    usersLoginResult.length === 0 ||
    userLoginDetails === ""
  ) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  console.log("You are connected Mr " + userLoginDetails.userName);
  return usersLoginResult[0];
}

async function addUser(userDetails, userType) {
  let sql =
    "INSERT INTO users(userName, password, userType, firstName, lastName) values(?,?,?,?,?)";
  let parameters = [
    userDetails.userName,
    userDetails.password,
    userType,
    userDetails.firstName,
    userDetails.lastName,
  ];

  let userInfo;
  try {
    userInfo = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.USER_NAME_ALREADY_EXIST,
      JSON.stringify(userDetails),
      e
    );
  }
}

async function isUserExistByName(userName) {
  let sql = "SELECT * FROM users where userName = ?";
  let parameters = [userName];

  let userNameCheck;
  try {
    userNameCheck = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, userName, e);
  }
  return userNameCheck[0];
}

async function deleteUser(userID) {
  let sql = "delete from users where userID=?";
  let parameters = [userID];
  let deleteUser = await connection.executeWithParameters(sql, parameters);
  return deleteUser;
}

async function getUserID(userID) {
  let sql = "SELECT * FROM users where userID=?";
  let parameters = [userID];
  let user = await connection.executeWithParameters(sql, parameters);
  return user;
}

module.exports = {
  login,
  getUserID,
  addUser,
  deleteUser,
  isUserExistByName,
};
