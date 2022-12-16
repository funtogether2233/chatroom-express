const db = require("../utils/db");

// 给user表增加一行信息，若userId重复，则返回true，否则返回false
const addUser = async (userId, password) => {
  return db
    .promise()
    .query(
      `insert into user(user_id,password) value('${userId}','${password}')`
    )
    .then(() => {
      return false;
    })
    .catch((error) => {
      console.log(error);
      return true;
    });
};

// 根据userId判断用户是否存在, 存在返回user，存在返回undefined
const getUser = async (userId) => {
  return db
    .promise()
    .query(
      `select id,user_id,password,nickname,user_state from user
      where user_id = "${userId}"`
    )
    .then(([rows]) => {
      return rows[0];
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  getUser,
  addUser,
};
