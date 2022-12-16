const groupMessageDao = require("../dao/groupMessageDao");

// 增加一条group聊天记录
const addMessage = async (groupId, memberId, time, content) => {
  try {
    await groupMessageDao.addMessage(groupId, memberId, time, content);
  } catch (error) {
    console.log(error);
  }
};

// 获取group历史聊天记录
const getMessage = async (req, res) => {
  try {
    const { groupId } = req.body;
    const messageList = await groupMessageDao.getMessage(groupId);
    res.send(
      JSON.stringify({
        code: 200,
        msg: `${groupId}群组历史记录`,
        messageList,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMessage,
  getMessage,
};
