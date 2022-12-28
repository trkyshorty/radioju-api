const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res
      .status(403)
      .json({ message: 'A token is required for authentication' })
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findOne({ user_id: decoded.id })

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    if (user.role !== 'user') {
      return res
        .status(401)
        .json({ message: 'You are not authorized for this action' })
    }

    req.user = user
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  next()
}

module.exports = verifyToken
