const { db } = require("./utils/db");

db.promise()
  .query("SELECT `id` FROM `user`")
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(console.log);
