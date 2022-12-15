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

    // 接收消息
    socket.on("clientMessage", (message) => {
      const { chatType, fromId, toId, time, content } = message;
      const type = ["群组", "用户"];
      console.log(
        `用户${fromId}向${type[chatType]}${toId}发送信息：[${time}] ${content}`
      );

      // 广播消息
      io.emit("severMessage", { chatType, fromId, toId, time, content });
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
