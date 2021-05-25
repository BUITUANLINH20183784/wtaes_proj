const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.header("x-auth-token")
  if (!token) res.status(401).json({ msg: "No token" })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" })
  }
}

module.exports = auth;