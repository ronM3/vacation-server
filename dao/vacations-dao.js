const connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function getAllVacations() {
  let sql = "SELECT v.id,v.image ,v.destination,v.details,v.dates,v.price, count(fv.userID) AS amountOfFollowers FROM vacations v LEFT JOIN followed_vacations fv ON v.id = fv.vacationID GROUP BY v.id;";
  let vacations = await connection.execute(sql);
  return vacations;
}

async function addNewVacation(newVacationAdd) {
  let sql =
    "INSERT INTO vacations(image, destination, details, dates, price) values(?,?,?,?,?)";
  let parameters = [
    newVacationAdd.image,
    newVacationAdd.destination,
    newVacationAdd.details,
    newVacationAdd.dates,
    newVacationAdd.price,
  ];

  let newVacation;
  try {
    newVacation = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(newVacationAdd),
      e
    );
  }
  return newVacation.insertId;
}

async function editVacation(editedVacation) {
  let sql =
    "UPDATE vacations SET image = ?, destination = ?, details = ?, dates = ?, price = ? where id = ? ";
  let parameters = [
    editedVacation.image,
    editedVacation.destination,
    editedVacation.details,
    editedVacation.dates,
    editedVacation.price,
    editedVacation.id,
  ];
  let editVacation = await connection.executeWithParameters(sql, parameters);
  return editVacation;
}

async function getVacationByID(vacationID) {
  let sql = "SELECT * FROM vacations where id=?";
  let parameters = [vacationID];
  let vacation = await connection.executeWithParameters(sql, parameters);
  return vacation;
}

async function deleteVacation(vacationID) {
  let sql = "delete from vacations where id=?";
  let parameters = [vacationID];
  await connection.executeWithParameters(sql, parameters);
}

module.exports = {
  getAllVacations,
  getVacationByID,
  deleteVacation,
  addNewVacation,
  editVacation,
};
