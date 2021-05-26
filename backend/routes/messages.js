const express = require("express");
const router = express.Router();
const { addMessage } = require("../controllers/messages");
const auth = require("../middleware/auth")

router.post("/", auth, addMessage);

module.exports = router;
