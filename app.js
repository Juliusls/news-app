const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const imagesRouter = require('./controllers/images')
const writersRouter = require('./controllers/writers')
const readersRouter = require('./controllers/readers')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cookieParser = require('cookie-parser')
const middleware = require('./utils/middleware')
const loginReaderRouter = require('./controllers/loginReader')
// const refreshReader = require('./controllers/refreshReader')
const loginWriterRouter = require('./controllers/loginWriter')
// const refreshWriter = require('./controllers/refreshWriter')

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
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ 
	limit: '50mb',
	parameterLimit: 52428800,
	extended: false }))
app.set('view engine', 'ejs')
app.use('/api/articles', articlesRouter)
app.use('/api/images', imagesRouter)
app.use('/api/writers', writersRouter)
app.use('/api/readers', readersRouter)
app.use('/api/reader/login', loginReaderRouter)
app.use('/api/writer/login', loginWriterRouter)
app.get('/*',(req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'))
})
// app.post('/api/reader/refresh', refreshReader)

app.use(middleware.errorHandler)

module.exports = app