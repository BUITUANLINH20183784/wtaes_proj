const mongoose = require("mongoose");
const General = require("./General");

class Comment extends General {
  constructor() {
    super();
    this.fields = {
      ...this.fields,
      content: {
        type: String,
        required: true,
      },
      authorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
    }
  }
}

const CommentSchema = new mongoose.Schema(new Comment().fields);

module.exports = mongoose.model("Comment", CommentSchema);
