const db = require("../utils/db");

// 增加一条group聊天记录
const addMessage = async (groupId, memberId, time, content) => {
  return db
    .promise()
    .query(
      `insert into group_message(group_id, member_id, time, content)
      value('${groupId}','${memberId}','${time}','${content}')`
    )
    .catch((error) => {
      console.log(error);
    });
};

// 获取group历史聊天记录
const getMessage = async (groupId) => {
  return db
    .promise()
    .query(
      `select group_id, member_id, time, content from group_message
      where group_id = "${groupId}"`
    )
    .then(([rows]) => {
      return [...rows];
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  addMessage,
  getMessage,
};
