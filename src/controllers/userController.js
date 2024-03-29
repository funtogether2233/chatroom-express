const userDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const jwtKey = "abcdefghijklmn";

// 登陆验证
const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // 判断用户名和密码是否为空
    if (!userId || !password) {
      res.send(
        JSON.stringify({
          code: 400,
          data: "账号和密码不能为空!",
        })
      );
      return;
    }

    // 查询用户是否存在或已登录
    const user = await userDao.getUser(userId);
    if (!user) {
      res.send(
        JSON.stringify({
          code: 400,
          msg: "账号不存在!",
        })
      );
      return;
    }

    // 查询用户是否已登录
    if (user.user_state) {
      res.send(
        JSON.stringify({
          code: 400,
          msg: "账号已登录!",
        })
      );
      return;
    }

    // 验证密码
    if (user.password !== password) {
      res.send(
        JSON.stringify({
          code: 400,
          msg: "密码错误!",
        })
      );
      return;
    }

    // 登录成功
    jwt.sign({ userId }, jwtKey, { expiresIn: "30s" }, (err, token) => {
      res.send(
        JSON.stringify({
          code: 200,
          msg: "登录成功!",
          userInfo: {
            id: user.id,
            userId: user.user_id,
            nickname: user.nickname,
          },
          token,
        })
      );
    });

    console.log(`用户${user.user_id}登陆`);
  } catch (error) {
    console.log(error);
  }
};

// user注册
const registerUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    // 验证注册userId是否重复
    const isDuplicate = await userDao.addUser(userId, password);

    // userId重复
    if (isDuplicate) {
      res.send(
        JSON.stringify({
          code: 400,
          msg: "账号重复!",
        })
      );
      return;
    }

    // 注册成功
    res.send(
      JSON.stringify({
        code: 200,
        msg: "注册成功!",
      })
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
};
