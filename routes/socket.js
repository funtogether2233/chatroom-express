const socketio = require("socket.io");
const socket = {};

function getSocket(server) {
  const io = socketio(server, {
    cors: true,
    maxHttpBufferSize: 3 * 1024 * 1024,
  });

  // 连接
  io.on("connection", async (socket) => {
    console.log(`${socket.id}-连接成功`);
    socket.emit("severMessage", "hello world!");
    socket.on("clientData", (data) => {
      console.log(data);
    });

    // 监听进入聊天模块
    socket.on("enterChat", async () => {
      console.log("该用户上线");
    });

    // 断开连接
    socket.on("disconnect", async (reason) => {
      console.log(`${socket.id}-断开连接-${reason}`);
      // removeUser(socket.id);
    });
  });

  return io;
}

socket.getSocket = getSocket;
module.exports = socket;
