const express = require("express");
const router = express.Router();
const { getComments, addComment } = require("../controllers/comments");
const auth = require("../middleware/auth")

router.get("/", getComments)

router.post("/", auth, addComment);

module.exports = router;
