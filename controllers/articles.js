const articlesRouter = require('express').Router()
const Comment = require('../models/comment')
const Article = require('../models/article')
const Writer = require('../models/writer')
const Reader = require('../models/reader')
const { getDate } = require('../utils/helpers')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

articlesRouter.get('/', async (request, response) => {
	const articles = await Article
		.find({})
		.populate('author')
		.populate({
			path: 'comments',
			model: 'Comment',
			populate: {
				path: 'commentator',
				model: 'Reader'
			}
		})

	response.json(articles)
})

articlesRouter.get('/:id', async (request, response) => {
	const article = await Article.findById(request.params.id)
		.populate('writer')
		.populate('comment')
	if (article) {
		response.json(article)
	} else {
		response.status(404).end()
	}
})

articlesRouter.post('/', async (request, response) => {
	const body = request.body
  
	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' })
	} 
	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	}
	if (body.genres === undefined) {
		return response.status(400).json({ error: 'genres missing' })
	} 

	try {
		const writer = await Writer.findById('603236c6701d1e8260168b41')
  
		const article = new Article({
			title: body.title,
			content: body.content,
			published: getDate(),
			author: writer._id,
			views: 0,
			paid: body.paid || 'no',
			genres: body.genres,
		})
  
		const savedArticle = await article.save()
		writer.myarticles = writer.myarticles.concat(savedArticle._id)
		await writer.save()
		response.status(201).json(savedArticle)
	} catch (error) {
		logger.error(error)
	}
})

articlesRouter.put('/:id', async (request, response) => {
	const body = request.body

	const oldArticle = await Article.findById(request.params.id)
	const writer = await Writer.findById(oldArticle.author._id)
    
	const article = {
		title: body.title,
		content: body.content,
		published: getDate(),
		views: 0,
		author: writer._id,
		paid: body.paid,
		genres: body.genres
	}

	Article.findByIdAndUpdate(request.params.id, article, {new: true, runValidators: true})
		.then(updatedArticle => {
			response.status(200).json(updatedArticle.toJSON())
		})
})

articlesRouter.delete('/:id', async (request, response) => {
	await Article.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

articlesRouter.post('/:id/comments', async (request, response) => {
	const body = request.body
	let accessToken = request.cookies.readerAuthCookie

	const decodedToken = jwt.verify(accessToken, process.env.READER_ACCESS_TOKEN_SECRET)

	if (!request.cookies.readerAuthCookie || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	if (body.comment === undefined) {
		return response.status(400).json({error: 'comment missing'})
	}
	try {
		const article = await Article.findById(request.params.id)
		const reader = await Reader.findById(decodedToken.id)

		if (!article) {
			return response.status(400).json({ error: 'article that you are trying to comment does not exist' })
		}

		const comment = new Comment({
			comment: body.comment,
			date: getDate(),
			article: article._id,
			commentator: reader._id
		})

		const savedComment = await comment.save()
		article.comments = article.comments.concat(savedComment._id)
		reader.readerComments = reader.readerComments.concat(savedComment._id)
		await article.save()
		await reader.save()
		response.status(201).json(savedComment)
	} catch (error) {
		logger.error(error)
	}
})

module.exports = articlesRouter
