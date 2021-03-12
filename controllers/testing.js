const router = require('express').Router()
const Article = require('../models/article')
const Writer = require('../models/writer')
const Reader = require('../models/reader')
const Comment = require('../models/comment')
const Subscription = require('../models/subscription')
const ArticleImage = require('../models/articleImage')
const WriterImage = require('../models/writerImage')
const ReaderImage = require('../models/readerImage')


router.post('/reset', async (request, response) => {
	await Article.deleteMany({})
	await Writer.deleteMany({})
	await Reader.deleteMany({})
	await Comment.deleteMany({})
	await Subscription.deleteMany({})
	await Reader.deleteMany({})

	await ArticleImage.deleteMany({})
	await WriterImage.deleteMany({})
	await ReaderImage.deleteMany({})

	response.status(204).end()
})

module.exports = router