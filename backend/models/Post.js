const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  title: {
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
  communityID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Community",
  },
  commentID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
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

module.exports = mongoose.model("Post", PostSchema);
