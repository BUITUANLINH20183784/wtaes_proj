const mongoose = require("mongoose");
const General = require("./General");

class Community extends General {
  constructor() {
    super();
    this.fields = {
      ...this.fields,
      name: {
        type: String,
        required: true,
        unique: true,
      },
      creatorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      postID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post"
        }
      ],
      memberID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      memberCount: {
        type: Number,
        required: true,
        default: 0,
      },
      desc: {
        type: String,
      }
    }
  }
}

const CommunitySchema = new mongoose.Schema(new Community().fields);

module.exports = mongoose.model("Community", CommunitySchema);
