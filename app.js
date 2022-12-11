const app = require("express")();
const server = require("http").Server(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
// const io = require("socket.io")(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(userRouter);

// 监听3000
server.listen(3000, () => {
  console.log("监听3000 http://localhost:3000/");
});
