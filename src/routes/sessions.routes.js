const { Router } = require('express')
const SessionsController = require('../controllers/SessionsController')


const sessionsRoutes = Router()


sessionsRoutes.post('/', new SessionsController().create)


module.exports = sessionsRoutes