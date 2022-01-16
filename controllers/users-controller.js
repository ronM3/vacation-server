const express = require("express");
const router = express.Router();
const usersLogic = require("../logic/users-logic");
const { response } = require("express");

router.post("/login", async (request, response, next) => {
  let userLoginDetails = request.body;
  let userSuccessfullLogin;

  try {
    userSuccessfullLogin = await usersLogic.login(userLoginDetails);
    response.json(userSuccessfullLogin);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let userDetails = request.body;
  let userType = "customer";
  try {
    await usersLogic.addUser(userDetails, userType);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.delete("/:userID", async (request, response, next) => {
  let userToDelete = request.params.userID;
  let deleteUser;
  try {
    deleteUser = await usersLogic.deleteUser(userToDelete);
    response.json();
  } catch (error) {
    return next(error);
  }
  return deleteUser;
});

router.get("/:userID", async (request, response, next) => {
  let userID = request.params.userID;
  let user;

  try {
    user = await usersLogic.getUserID(userID);
    response.json(user);
  } catch (error) {
    return next(error);
  }
  return user;
});

module.exports = router;
