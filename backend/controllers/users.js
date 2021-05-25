const User = require("../models/User");
const bcrypt = require("bcryptjs")

// @desc		Register New User
// @route		POST /api/users
// @access	Public
exports.postUser = async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Enter all field" })
  }

  // Check existing
  const user = await User.findOne({ username })
  if (user) return res.status(400).json({ msg: "User already exist" })

  const newUser = new User({
    username,
    password
  });

  // Hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save()
        .then(user => {
          res.json({
            user: {
              id: user.id,
              username: user.username
            }
          })
        })
    })
  })
}