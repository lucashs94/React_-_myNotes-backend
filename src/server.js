require('express-async-errors')
require('dotenv/config')
const express = require('express')
const cors = require('cors')

const migrationsRun = require('./database/sqlite/migrations')
const handlerError = require('./utils/handlerError')
const routes = require('./routes')
const uploadConfig = require('./configs/upload')

migrationsRun()

const PORT = process.env.PORT || 3333

const app = express()
app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use(handlerError)



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))