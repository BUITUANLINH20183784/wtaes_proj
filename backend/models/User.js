const mongoose = require("mongoose");
const General = require("./General");

class User extends General {
  constructor() {
    super();
    this.fields = {
      ...this.fields,
      username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      // dateCreated: {
      //   type: Date,
      //   default: Date.now(),
      // },
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
      createdCommentID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
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
              dateCreated: {
                type: Date,
                default: Date.now(),
              },
            }
          ]
        }
      ]
    }
  }
}

const UserSchema = new mongoose.Schema(new User().fields);

module.exports = mongoose.model("User", UserSchema);
