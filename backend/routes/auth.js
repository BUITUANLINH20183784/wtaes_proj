const express = require("express");
const router = express.Router();
const { authUser, getUser } = require("../controllers/auth");
const auth = require("../middleware/auth");

router
	.route("/")
	.post(authUser);

router.get("/user", auth, getUser)

module.exports = router;
