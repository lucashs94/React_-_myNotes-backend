const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')


function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization

  if(!authHeader){
    throw new AppError('Token is missing', 401)
  }

  const token = authHeader.split(' ')[1]

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    req.user = {
      id: Number(user_id)
    }

    return next()

  } catch (error) {

    throw new AppError('Token is missing', 401)
  }
}

module.exports = isAuthenticated