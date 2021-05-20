const Post = require("../models/Post");

// @desc		Get All Posts
// @route		GET /api/posts
// @access	Public
exports.getPosts = async (req, res, next) => {
  try {
		const posts = await Post.find();
		return res.status(200).json({
			success: true,
			count: posts.length,
			data: posts,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
}

// @desc		Add A Post
// @route		POST /api/posts
// @access	Public
exports.addPost = async (req, res, next) => {
  try {
		const { content, author } = req.body;
		const post = await Post.create(req.body);
		return res.status(201).json({
			success: true,
			data: post,
		});
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(val => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error"
			});
		}
	}
}

// @desc		Delete A Post
// @route		DELETE /api/posts/:id
// @access	Public
exports.deletePost = async (req, res, next) => {
  try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				succes: false,
				error: "No post found",
			});
		}
		await post.remove();
		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
}

// @desc		Update A Post
// @route		PUT /api/posts/:id
// @access	Public
exports.updatePost = async (req, res, next) => {
  try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({
				succes: false,
				error: "No post found",
			});
		}
		await post.updateOne(req.body);
		return res.status(204).json({
			success: true,
			data: {},
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
}