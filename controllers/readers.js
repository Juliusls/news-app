const readersRouter = require('express').Router()

let readers = [
	{
		'id': 1,
		'name': 'Ross',
		'funds': 0,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Harvey']
	},
	{
		'id': 2,
		'name': 'Chandler',
		'funds': 25,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Louis']
	},
	{
		'id': 3,
		'name': 'Joey',
		'funds': 100,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Donna']
	},
	{
		'id': 4,
		'name': 'Rachel',
		'funds': 50,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Mike']
	},
	{
		'id': 5,
		'name': 'Phoebe',
		'funds': 50,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Jessica']
	},
	{
		'id': 6,
		'name': 'Monica',
		'funds': 50,
		'readinghistory': [],
		'readercomments': [],
		'subscriptions': [],
		'favoritewriters': ['Katrina']
	},
]

// eslint-disable-next-line no-unused-vars
readersRouter.get('/', (request, response) => {
	response.json(readers)
})

readersRouter.get('/:id', (request, response) => {
	const id = Number(request.params.id)
	const reader = readers.find(reader => reader.id === id)
	if (reader) {
		response.json(reader)
	} else {
		response.status(404).end()
	}
})

module.exports = readersRouter