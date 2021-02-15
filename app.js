const express = require('express')
const app = express()
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const writersRouter = require('./controllers/writers')
const readersRouter = require('./controllers/readers')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const loginReaderRouter = require('./controllers/loginReader')
// const refreshReader = require('./controllers/refreshReader')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		logger.info('Connecting to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecing to MongoDB', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
app.use('/api/articles', articlesRouter)
app.use('/api/writers', writersRouter)
app.use('/api/readers', readersRouter)
app.use('/api/reader/login', loginReaderRouter)
// app.post('/api/reader/refresh', refreshReader)

module.exports = app