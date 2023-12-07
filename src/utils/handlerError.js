const AppError = require('../utils/AppError')



const handlerError = (error, req, res, next) => {
  if(error instanceof AppError){
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: `Server error!!`
  })
}


module.exports = handlerError