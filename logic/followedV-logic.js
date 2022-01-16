const followVacationDao = require("../dao/followedV-dao");

async function getFollowedVacations() {
  let followedVacationsReport = await followVacationDao.getFollowedVacations();
  return followedVacationsReport;
}

async function getAmountOfFollowers() {
  let followersAmount = await followVacationDao.getAmountOfFollowers();
  return followersAmount;
}

async function followVacation(vacationToFollow, userID) {
  let followingVacation = await followVacationDao.followVacation(
    vacationToFollow,
    userID
  );
  return followingVacation;
}

async function unfollowVacation(vacationToUnfollow, userID) {
  let unfollowVacation = await followVacationDao.unfollowVacation(
    vacationToUnfollow,
    userID
  );
  return unfollowVacation;
}

async function followedVacations(userID) {
  let followedById = await followVacationDao.followedVacations(userID);
  return followedById;
}

module.exports = {
  followVacation,
  unfollowVacation,
  followedVacations,
  getFollowedVacations,
  getAmountOfFollowers,
};
