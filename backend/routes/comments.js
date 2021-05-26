const express = require("express");
const router = express.Router();
const { getComments, addComment, voteComment } = require("../controllers/comments");
const auth = require("../middleware/auth")

router.get("/", getComments)
router.post("/", auth, addComment);
router.post("/vote", auth, voteComment)

module.exports = router;
