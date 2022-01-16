const vacationsDao = require("../dao/vacations-dao");
let pushLogic = require("./push-logic");

async function getAllVacations(vacations, userID) {
  vacations = await vacationsDao.getAllVacations(vacations, userID);
  return vacations;
}

async function addNewVacation(newVacationAdd, senderId) {
  let newVacationToAdd;
  newVacationToAdd = await vacationsDao.addNewVacation(newVacationAdd);

  pushLogic.broadcastExceptSender("addVacation", newVacationAdd, senderId);
  return newVacationToAdd;
}

async function editVacation(editedVacation, senderId) {
  let curentVacationEdit = await vacationsDao.editVacation(editedVacation);
  pushLogic.broadcastExceptSender("editVacation", editedVacation, senderId);
  return curentVacationEdit;
}

async function getVacationByID(vacationID) {
  let vacation = await vacationsDao.getVacationByID(vacationID);
  return vacation;
}

async function deleteVacation(vacationID, senderId) {
  await vacationsDao.deleteVacation(vacationID);
  pushLogic.broadcastExceptSender("deleteVacation", vacationID, senderId);
}

module.exports = {
  getAllVacations,
  getVacationByID,
  deleteVacation,
  addNewVacation,
  editVacation,
};
