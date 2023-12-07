const { Router } = require('express')
const multer = require('multer')

const uploadConfig = require('../configs/upload')
const UserController = require('../controllers/UserController')
const isAuthenticated = require('../middlewares/isAuthenticated')


const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)


userRoutes.post('/', new UserController().create)
userRoutes.put('/', isAuthenticated, new UserController().update)
userRoutes.patch('/avatar', isAuthenticated, upload.single('avatar'), new UserController().upload)


module.exports = userRoutes