const mongoose = require("mongoose");
const General = require("./General");

class Post extends General {
  constructor() {
    super();
    this.fields = {
      ...this.fields,
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
    }
  }
}

const PostSchema = new mongoose.Schema(new Post().fields);

module.exports = mongoose.model("Post", PostSchema);
