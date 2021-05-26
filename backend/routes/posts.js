const express = require("express");
const router = express.Router();
const { getPosts, addPost, votePost } = require("../controllers/posts");
const auth = require("../middleware/auth")

router.get("/", getPosts)
router.post("/", auth, addPost);
router.post("/vote", auth, votePost);

// router
// 	.route("/:id")
// 	.delete(deletePost)
// 	.put(updatePost);

module.exports = router;
