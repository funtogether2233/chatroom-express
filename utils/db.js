const mysql = require("mysql2");
// 定义 连接数据 默认端口 3306
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "chatroom",
  charset: "utf8",
});

module.exports = { db };
