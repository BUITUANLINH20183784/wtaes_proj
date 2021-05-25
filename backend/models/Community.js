const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
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
  dateCreated: {
    type: Date,
    default: Date.now(),
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
  }
});

module.exports = mongoose.model("Community", CommunitySchema);
