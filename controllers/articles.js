const articlesRouter = require('express').Router()

let articles = [
	{
		'id': 1,
		'title': 'First article',
		'content': 'Deserunt eu non veniam sit magna esse magna sunt nisi ullamco. Irure aliquip do nostrud ullamco esse. Mollit dolore commodo minim dolore fugiat laborum qui. Consectetur ut minim quis sint adipisicing laborum minim cillum tempor proident labore nostrud.    Nostrud aliqua id esse et eu ullamco dolor.',
		'published': 2010,
		'author': 'First author',
		'views': 0,
		'type': 'free',
		'comments': [],
		'genres': ['Business']
	},
	{
		'id': 2,
		'title': 'Second article',
		'content': 'Deserunt eu non veniam sit magna esse magna sunt nisi ullamco. Irure aliquip do nostrud ullamco esse. Mollit dolore commodo minim dolore fugiat laborum qui. Consectetur ut minim quis sint adipisicing laborum minim cillum tempor proident labore nostrud. Nostrud aliqua id esse et eu ullamco dolor.',
		'published': 2020,
		'author': 'Second author',
		'views': 10,
		'type': 'paid',
		'comments': [],
		'genres': ['Economy']
	},
	{
		'id': 3,
		'title': 'Third article',
		'content': 'Deserunt eu non veniam sit magna esse magna sunt nisi ullamco. Irure aliquip do nostrud ullamco esse. Mollit dolore commodo minim dolore fugiat laborum qui. Consectetur ut minim quis sint adipisicing laborum minim cillum tempor proident labore nostrud. Nostrud aliqua id esse et eu ullamco dolor.',
		'published': 2015,
		'author': 'Third author',
		'views': 0,
		'type': 'free',
		'comments': [],
		'genres': ['Crime']
	},
	{
		'id': 4,
		'title': 'Fourh article',
		'content': 'Deserunt eu non veniam sit magna esse magna sunt nisi ullamco. Irure aliquip do nostrud ullamco esse. Mollit dolore commodo minim dolore fugiat laborum qui. Consectetur ut minim quis sint adipisicing laborum minim cillum tempor proident labore nostrud. Nostrud aliqua id esse et eu ullamco dolor.',
		'published': 2021,
		'author': 'Fourth author',
		'views': 0,
		'type': 'paid',
		'comments': [],
		'genres': ['Sport']
	}
]

// eslint-disable-next-line no-unused-vars
articlesRouter.get('/', (request, response) => {
	response.json(articles)
})

articlesRouter.get('/:id', (request, response) => {
	const id = Number(request.params.id)
	const article = articles.find(article => article.id === id)
	if (article) {
		response.json(article)
	} else {
		response.status(404).end()
	}
})

module.exports = articlesRouter