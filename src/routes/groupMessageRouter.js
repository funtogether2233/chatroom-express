const express = require("express");
const router = express.Router();
const groupMessageController = require("../controllers/groupMessageController");

router.post("/group_message", groupMessageController.getMessage);

module.exports = router;
