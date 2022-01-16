const vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const { response } = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.get("/", async (request, response, next) => {
  let vacations;

  try {
    vacations = await vacationsLogic.getAllVacations();
    response.json(vacations);
  } catch (error) {
    return next(error);
  }
  return vacations;
});

router.get("/:vacationID", async (request, response, next) => {
  let vacationID = request.params.vacationID;
  let vacation;

  try {
    vacation = await vacationsLogic.getVacationByID(vacationID);
    response.json(vacation);
  } catch (error) {
    return next(error);
  }
  return vacation;
});

router.delete("/:id", async (request, response, next) => {
  let vacationID = request.params.id;

  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userID = decoded.userID;
    await vacationsLogic.deleteVacation(vacationID, userID);
    response.json();
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  let newVacationAdd = request.body;
  let newVacation;
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userID = decoded.userID;
    newVacation = await vacationsLogic.addNewVacation(newVacationAdd, userID);
    response.json(newVacation);
  } catch (error) {
    return next(error);
  }
  return newVacation;
});

router.put("/", async (request, response, next) => {
  let editedVacation = request.body;
  let editVacation;

  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userID = decoded.userID;
    editVacation = await vacationsLogic.editVacation(editedVacation, userID);
    response.json(editedVacation);
  } catch (error) {
    return next(error);
  }
  return editVacation;
});

module.exports = router;
