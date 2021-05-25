const express = require("express");
const router = express.Router();
const { getPosts, addPost, deletePost, updatePost } = require("../controllers/posts");
const auth = require("../middleware/auth")

router.use(auth)

router
	.route("/")
	.get(getPosts)
	.post(addPost);

router
	.route("/:id")
	.delete(deletePost)
	.put(updatePost);

module.exports = router;
