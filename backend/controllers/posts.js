const Post = require("../models/Post");
const User = require("../models/User");
const Community = require("../models/Community");

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
// @access	Private
exports.addPost = async (req, res, next) => {
  try {
		const { communityID, title, content } = req.body;
		const post = await Post.create({
			authorID: req.user.id,
			title,
			content,
			communityID,
			voteCount: 0
		});
		const community = await Community.findById(communityID);
		if (!communityID) return res.status(400).json({ msg: "Community not found" })
		community.postID.push(post.id);
		await community.save();
    const user = await User.findById(req.user.id)
    user.createdPostID.push(post.id);
    await user.save();
		return res.status(201).json({
			success: true,
			data: post,
			community,
			user,
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

// @desc		Vote Post
// @route		POST /api/posts/vote
// @access	Private
exports.votePost = async (req, res, next) => {
  try {
		const { status, postID } = req.body;
		const post = await Post.findById(postID);
    if (!post) return res.status(400).json({ msg: "Post doesn't exist" })

		const index = post.vote.toObject().findIndex(vote => vote.userID == req.user.id)
    if (status === "up" || status === "down") {
			if (index === -1) {
				post.vote.push({ status, userID: req.user.id });
				if (status == "up") post.voteCount++;
				else post.voteCount--;
			} else {
				if (post.vote[index].status !== status) {
					if (status === "up") post.voteCount += 2;
					else post.voteCount -= 2;
					post.vote[index].status = status;
				} else return res.status(200).json({ msg: "Already voted" })
			}
    } else if (status === "neutral") {
      if (index !== -1) {
        if (post.vote[index].status === "up") post.voteCount--;
				else post.voteCount++;
        post.vote.pull(post.vote[index]);
      } else return res.status(200).json({ msg: "Not voted already" })
    } else return res.status(400).json({ msg: "Invalid option" })

    await post.save();
		return res.status(200).json({
			success: true,
			post,
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