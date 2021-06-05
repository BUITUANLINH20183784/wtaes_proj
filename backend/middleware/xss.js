const sanitizer = require('sanitizer')

const xss = (req, res, next) => {
  try {
    // console.log(`req.body`, req.body)
    Object.keys(req.body).forEach(key => {
      // console.log(`key`, key)
      // console.log(`req.body[key]`, req.body[key])
      if (/(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/ig.test(req.body[key])) return res.status(400).json({ msg: "XSS is not allowed" })
      req.body[key] = sanitizer.escape(req.body[key])
      req.body[key] = sanitizer.sanitize(req.body[key])
      // console.log(`req.body[key]`, req.body[key])
    })
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid request" })
  }
}

module.exports = xss;