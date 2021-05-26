const Comment = require("../models/Comment");
const User = require("../models/User");

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
// @route		POST /api/comments
// @access	Private
exports.addComment = async (req, res, next) => {
  try {
		const { postID, content } = req.body;
		const comment = await Comment.create({
			authorID: req.user.id,
			content,
			postID,
			voteCount: 0
		});
    const user = await User.findById(req.user.id)
    user.createdCommentID.push(comment.id);
    await user.save();
		return res.status(201).json({
			success: true,
			data: comment,
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

// @desc		Vote Comment
// @route		POST /api/comments/vote
// @access	Private
exports.voteComment = async (req, res, next) => {
  try {
		const { status, commentID } = req.body;
		const comment = await Comment.findById(commentID);
    if (!comment) return res.status(400).json({ msg: "Comment doesn't exist" })

		const index = comment.vote.toObject().findIndex(vote => vote.userID == req.user.id)
    if (status === "up" || status === "down") {
			if (index === -1) {
				comment.vote.push({ status, userID: req.user.id });
				if (status == "up") comment.voteCount++;
				else comment.voteCount--;
			} else {
				if (comment.vote[index].status !== status) {
					if (status === "up") comment.voteCount += 2;
					else comment.voteCount -= 2;
					comment.vote[index].status = status;
				} else return res.status(200).json({ msg: "Already voted" })
			}
    } else if (status === "neutral") {
      if (index !== -1) {
        if (comment.vote[index].status === "up") comment.voteCount--;
				else comment.voteCount++;
        comment.vote.pull(comment.vote[index]);
      } else return res.status(200).json({ msg: "Not voted already" })
    } else return res.status(400).json({ msg: "Invalid option" })

    await comment.save();
		return res.status(200).json({
			success: true,
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
