const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  joinedCommunityID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    }
  ],
  createdPostID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    }
  ],
  createdCommunityID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    }
  ],
  conversation: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: [
        {
          dest: {
            type: String,
            required: true,
          },
          content: String,
        }
      ]
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
