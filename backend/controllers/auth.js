const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc		Auth User
// @route		POST /api/auth
// @access	Public
exports.authUser = async (req, res, next) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ msg: "Enter all field" })
  }

  // Check existing
  const user = await User.findOne({ username })
  if (!user) return res.status(400).json({ msg: "User doesn't exist" })

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid" });
  jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user,
      })
    }
  )
}

// @desc		Get User Data
// @route		GET /api/auth/user
// @access	Private
exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user);
}