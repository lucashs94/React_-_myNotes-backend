const { Router } = require('express')
const TagsController = require('../controllers/TagsController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const tagsRoutes = Router()

tagsRoutes.use(isAuthenticated)

tagsRoutes.get('/', new TagsController().index)


module.exports = tagsRoutes