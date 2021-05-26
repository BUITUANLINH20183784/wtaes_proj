const express = require("express");
const router = express.Router();
const { getUser,  postUser } = require("../controllers/users");

router
	.route("/")
	.get(getUser)
	.post(postUser);

module.exports = router;
