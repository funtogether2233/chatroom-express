const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./routes/socket.js");
socket.getSocket(server);
const userRouter = require("./routes/userRouter");
const groupMessageRouter = require("./routes/groupMessageRouter");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);
app.use(groupMessageRouter);

server.listen(3000, () => {
  console.log("监听3000 http://localhost:3000/");
});
