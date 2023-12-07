const { Router } = require('express')
const NotesController = require('../controllers/NotesController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const notesRoutes = Router()

notesRoutes.use(isAuthenticated)

notesRoutes.get('/', new NotesController().index)
notesRoutes.post('/', new NotesController().create)
notesRoutes.get('/:id', new NotesController().show)
notesRoutes.delete('/:id', new NotesController().delete)


module.exports = notesRoutes