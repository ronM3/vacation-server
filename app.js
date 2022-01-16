const express = require("express");
const server = express();
const cors = require("cors");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./controllers/vacations-controller");
const followedVacationController = require("./controllers/followedV-controller");
const filesController = require("./controllers/files-controller");

console.log("hello git")

const loginFilter = require("./middleware/login-filter");
const errorHandler = require("./errors/error-handler");
const fileUpload = require("express-fileupload");

server.use(fileUpload());
server.use(express.static("files"));

server.use(cors({ origin: "http://localhost:3000" }));
server.use(express.json());

server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/followedVacations", followedVacationController);
server.use("/files", filesController);

server.use(errorHandler);
server.use(loginFilter());

server.listen(3001, () => console.log("listening on http://localhost:3001"));
