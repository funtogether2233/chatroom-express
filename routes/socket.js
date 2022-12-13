const socketio = require("socket.io");
const socket = {};

function getSocket(server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  });

  // 连接
  io.on("connection", (socket) => {
    console.log(`[连接成功] socket ${socket.id}`);

    // 进入聊天模块
    socket.on("enterChat", (chatInfo) => {
      const { chatType, userId, chatObject } = chatInfo;
      const type = ["群组", "用户"];
      console.log(`用户${userId}进入${type[chatType]}${chatObject}`);
    });

    socket.on("clientMessage", (message) => {
      const { chatType, fromId, toId, content } = message;
      const type = ["群组", "用户"];
      console.log(
        `用户${fromId}向${type[chatType]}${toId}发送信息：${content}`
      );
      io.emit("severMessage", { chatType, fromId, toId, content });
    });

    // 断开连接
    socket.on("disconnect", (reason) => {
      console.log(`[断开连接] socket ${socket.id} ${reason}`);
    });
  });

  return io;
}

socket.getSocket = getSocket;
module.exports = socket;
