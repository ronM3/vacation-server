const connection = require("./connection-wrapper");


async function followVacation(vacationToFollow, userID){
    let sql = "INSERT INTO followed_vacations(vacationID, userID) values(?,?)";
    let parameters = [vacationToFollow.vacationID, userID];
    let newfollowedVacation = await connection.executeWithParameters(sql,parameters);
    return newfollowedVacation;
}

async function unfollowVacation(vacationToUnfollow, userID){
    let sql = "DELETE FROM followed_vacations where vacationID=? and userID=?";
    let parameters = [vacationToUnfollow, userID];
    let unfollowedVacation = await connection.executeWithParameters(sql,parameters);
    return unfollowedVacation
}

async function followedVacations(userID){
    let sql = "SELECT * from followed_vacations where userID = ?";
    let parameters = [userID];
    let followedVacationsByID = await connection.executeWithParameters(sql, parameters)
    return followedVacationsByID
}

async function getAmountOfFollowers(){
let sql = "SELECT vacationID, COUNT(userID) as amountOfFollowers FROM followed_vacations group by vacationID"
let followersAmount = await connection.execute(sql);
return followersAmount;
}

async function getFollowedVacations(){
    let sql = "SELECT v.destination, count(fv.userID) AS followersAmount FROM followed_vacations fv INNER JOIN vacations v ON v.id = fv.vacationID GROUP BY v.destination;";
    let followedVacationsReport = await connection.execute(sql);
    return followedVacationsReport;
}

module.exports = {
    followVacation,
    unfollowVacation,
    followedVacations,
    getFollowedVacations,
    getAmountOfFollowers
}