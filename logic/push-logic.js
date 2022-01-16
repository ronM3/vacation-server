const express = require("express");
const expressServer = express();
const http = require("http"); // More basic server than express.
const httpServer = http.createServer(expressServer);
const jwt_decode = require("jwt-decode");

const socketIO = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let userIdToSocketsMap = new Map();

socketIO.on("connection", (socket) => {
  console.log("Connection request");
  let handshakeData = socket.request;
  let token = handshakeData._query.token;
  let decoded = jwt_decode(token);
  let userID = decoded.userID;
  userIdToSocketsMap.set(userID, socket);

  console.log(
    "One client has been connected... Total clients: " + userIdToSocketsMap.size
  );

  socket.on("disconnect", () => {
    let handshakeData = socket.request;
    let token = handshakeData._query.token;
    if (token) {
      let decoded = jwt_decode(token);
      let userId = decoded.userID;
      userIdToSocketsMap.delete(userId);
      console.log(
        userId +
          " client has been disconnected. Total clients: " +
          userIdToSocketsMap.size
      );
    }
  });
});

httpServer.listen(8000, () => console.log("Socket httpServer is listening..."));

function broadcastExceptSender(actionName, data, senderId) {
  for (let [id, socket] of userIdToSocketsMap) {
    if (id !== senderId) {
      socket.emit(actionName, data);
    }
  }
}

module.exports = {
  broadcastExceptSender,
};
