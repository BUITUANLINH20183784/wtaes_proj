const injection = (req, res, next) => {
  try {
    // console.log(`req.body`, req.body)
    Object.keys(req.body).forEach(key => {
      // console.log(`key`, key)
      // console.log(`req.body[key]`, req.body[key])
      req.body[key] = escape(req.body[key])
      // console.log(`req.body[key]`, req.body[key])
    })
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid request" })
  }
}

module.exports = injection;