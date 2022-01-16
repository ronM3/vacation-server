const express = require("express");
const router = express.Router();
const followedVacationLogic = require("../logic/followedV-logic");
const jwt_decode = require("jwt-decode");

router.get("/", async (request, response, next) => {
  let followedVacationsReport;
  try {
    followedVacationsReport =
      await followedVacationLogic.getFollowedVacations();
    response.json(followedVacationsReport);
  } catch (error) {
    return next(error);
  }
});

router.get("/followersAmount", async (request, response, next) => {
  let followersAmount;
  try {
    followersAmount = await followedVacationLogic.getAmountOfFollowers();
    response.json(followersAmount);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/user", async (request, response, next) => {
  let token = request.headers.authorization;
  let decoded = jwt_decode(token);
  let userID = decoded.userID;
  let followedVacations;
  try {
    followedVacations = await followedVacationLogic.followedVacations(userID);
    response.json(followedVacations);
  } catch (error) {
    return next(error);
  }
  return followedVacations;
});

router.post("/", async (request, response, next) => {
  let vacationToFollow = request.body;
  let token = request.headers.authorization;
  let decoded = jwt_decode(token);
  let userID = decoded.userID;

  let followedVacation;
  try {
    followedVacation = await followedVacationLogic.followVacation(
      vacationToFollow,
      userID
    );
    response.json(vacationToFollow);
  } catch (error) {
    return next(error);
  }
  return followedVacation;
});

router.delete("/:vacationID", async (request, response, next) => {
  let vacationToUnfollow = request.params.vacationID;
  let token = request.headers.authorization;
  let decoded = jwt_decode(token);
  let userID = decoded.userID;
  let unfollowVacation;
  try {
    unfollowVacation = await followedVacationLogic.unfollowVacation(
      vacationToUnfollow,
      userID
    );
    response.json(unfollowVacation);
  } catch (error) {
    return next(error);
  }

  return unfollowVacation;
});

module.exports = router;
