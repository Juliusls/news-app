const articlesRouter = require('express').Router()
const Article = require('../models/article')

articlesRouter.get('/', async (request, response) => {
	const articles = await Article
		.find({})
		.populate('writer')
		.populate('commnet')
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

articlesRouter.put('/:id', async (request, response) => {
	const body = request.body
    
	const article = {
		title: body.title,
		content: body.content,
		published: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
		views: 0,
		author: body.author,
		paid: body.paid,
		genres: body.genres
	}

	await Article.findByIdAndUpdate(request.params.id, article, {new: true})
		.then(updatedArticle => {
			response.status(200).json(updatedArticle.toJSON())
		})
})

articlesRouter.post('/', (request, response) => {
	const body = request.body
  
	if (body.title === undefined) {
		return response.status(400).json({ error: 'title missing' })
	} 
	if (body.content === undefined) {
		return response.status(400).json({ error: 'content missing' })
	} 
	if (body.author === undefined) {
		return response.status(400).json({ error: 'author missing' })
	}
  
	const article = new Article({
		title: body.title,
		content: body.content,
		published: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
		author: body.author,
		views: 0,
		paid: body.paid || 'no',
		genres: body.genres
	})
  
	article.save()
		.then(savedArticle => {
			response.json(savedArticle.toJSON())
		})
		.catch(error => console.log(error))
})

articlesRouter.delete('/:id', async (request, response) => {
	await Article.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

module.exports = articlesRouter
