const Comment = require("../models/Comment");

// @desc		Get All Comments
// @route		GET /api/comments
// @access	Public
exports.getComments = async (req, res, next) => {
  try {
		const comments = await Comment.find();
		return res.status(200).json({
			success: true,
			count: comments.length,
			data: comments,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: "Server Error"
		});
	}
}

// @desc		Add A Comment
// @route		POST /api/Comments
// @access	Private
exports.addComment = async (req, res, next) => {
  try {
		const { content, author } = req.body;
		const Comment = await Comment.create(req.body);
		return res.status(201).json({
			success: true,
			data: Comment,
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