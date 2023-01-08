const socketio = require("socket.io");
const socket = {};
const groupMessageController = require("../controllers/groupMessageController");

function getSocket(server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  });

  // 连接
  io.on("connection", (socket) => {
    console.log(`[连接成功] socket ${socket.id}`);

    // 进入聊天模块
    socket.on("enterChat", async (chatInfo) => {
      try {
        const { chatType, userId, chatObject } = chatInfo;
        const type = ["群组", "用户"];
        console.log(`用户${userId}进入${type[chatType]}${chatObject}`);
      } catch (error) {
        console.log(error);
      }
    });

    // 接收消息
    socket.on("clientMessage", async (message) => {
      try {
        const { chatType, fromId, toId, time, content } = message;
        const type = ["群组", "用户"];
        console.log(
          `用户${fromId}向${type[chatType]}${toId}发送信息：[${time}] ${content}`
        );
        if (chatType === "0") {
          // 数据库增加group消息记录
          await groupMessageController.addMessage(toId, fromId, time, content);

          // 广播group消息
          io.emit("severMessage", { chatType, fromId, toId, time, content });
        }
      } catch (error) {
        console.log(error);
      }
    });

    // 断开连接
    socket.on("disconnect", async (reason) => {
      try {
        console.log(`[断开连接] socket ${socket.id} ${reason}`);
      } catch (error) {
        console.log(error);
      }
    });
  });

  return io;
}

socket.getSocket = getSocket;
module.exports = socket;
