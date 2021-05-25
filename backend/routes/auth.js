const express = require("express");
const router = express.Router();
const { authUser } = require("../controllers/auth");

router
	.route("/")
	.post(authUser);

module.exports = router;
