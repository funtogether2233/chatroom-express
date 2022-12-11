const fs = require("fs");
const path = require("path");
const socketio = require("socket.io");

const socket = {};

function getSocket(server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  });

  // 连接
  io.on("connection", async (socket) => {
    let timestamps = new Date().getTime();

    socket.emit("severMessage", "hello world!");
    socket.on("clientData", (data) => {
      console.log(data);
    });

    // 断开连接
    socket.on("disconnect", (reason) => {
      console.log("id为" + socket.id + "的用户端口断开……断开原因：" + reason);
      removeUser(socket.id);
    });
  });

  return io;
}

module.exports = socket;
