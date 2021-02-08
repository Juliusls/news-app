const express = require('express')
const app = express()
const articlesRouter = require('./controllers/articles')
const writersRouter = require('./controllers/writers')
const readersRouter = require('./controllers/readers')

app.use('/api/articles', articlesRouter)
app.use('/api/writers', writersRouter)
app.use('/api/readers', readersRouter)

module.exports = app