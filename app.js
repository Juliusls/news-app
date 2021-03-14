const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const articleImageRouter = require('./controllers/articleImage')
const writerImageRouter = require('./controllers/writerImage')
const readerImageRouter = require('./controllers/readerImage')
const writersRouter = require('./controllers/writers')
const readersRouter = require('./controllers/readers')
const subscriptionsRouter = require('./controllers/subscriptions')

const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cookieParser = require('cookie-parser')
const middleware = require('./utils/middleware')
const loginReaderRouter = require('./controllers/loginReader')
const refreshReaderRouter = require('./controllers/refreshReader')
const loginWriterRouter = require('./controllers/loginWriter')
const refreshWriterRouter = require('./controllers/refreshWriter')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		logger.info('Connecting to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecing to MongoDB', error.message)
	})

app.use(cors({ origin: 'https://julius-news-app.netlify.app' }))
app.use(express.static('build'))
app.use(cookieParser())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ 
	limit: '50mb',
	parameterLimit: 52428800,
	extended: false }))
app.set('view engine', 'ejs')
app.use('/api/articles', articlesRouter)
app.use('/api/images/articles', articleImageRouter)
app.use('/api/images/writers', writerImageRouter)
app.use('/api/images/readers', readerImageRouter)
app.use('/api/writers', writersRouter)
app.use('/api/readers', readersRouter)
app.use('/api/reader/login', loginReaderRouter)
app.use('/api/writer/login', loginWriterRouter)
app.use('/api/subscriptions', subscriptionsRouter)
app.get('/*',(req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.use('/api/reader/refresh', refreshReaderRouter)
app.use('/api/writer/refresh', refreshWriterRouter)

// For testing
if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.cookieChecker)

module.exports = app