const articlesRouter = require('express').Router()
const Comment = require('../models/comment')
const Article = require('../models/article')
const Writer = require('../models/writer')
const Reader = require('../models/reader')
const { getDate } = require('../utils/middleware')
const logger = require('../utils/logger')

articlesRouter.get('/', async (request, response) => {
	const articles = await Article
		.find({})
		.populate('author')
		.populate('comments')
	response.json(articles)
})

articlesRouter.get('/:id', async (request, response) => {
	const article = await Article.findById(request.params.id)
		.populate('writer')
		.populate('commnet')
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
		const writer = await Writer.findById('602288e0ffcb1ec19d68c5de')
  
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

	if (body.comment === undefined) {
		return response.status(400).json({error: 'comment missing'})
	}
	try {
		const article = await Article.findById(request.params.id)
		const reader = await Reader.findById('6022782ae7f9c9bb9c6d581d')

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
