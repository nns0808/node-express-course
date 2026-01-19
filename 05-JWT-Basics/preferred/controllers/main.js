const jwt = require('jsonwebtoken')

// Create JWT token
function createToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )
}

// POST /api/v1/logon
const logon = (req, res) => {
  const { name, password } = req.body

  // validation
  if (!name || !password) {
    return res.status(400).json({ msg: 'Please provide name and password' })
  }

  // Store user's name inside the token
  const token = createToken({ name })

  res.status(200).json({ token })
}

// GET /api/v1/hello
const hello = (req, res) => {
  res.status(200).json({
    msg: `Hello, ${req.user.name}!`
  })
}

module.exports = {
  logon,
  hello,
}


