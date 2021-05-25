const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  vote: [
    {
      status: {
        type: String,
        required: true,
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      }
    }
  ],
  voteCount: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
