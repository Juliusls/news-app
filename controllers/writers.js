const writersRouter = require('express').Router()

let writers = [
	{
		'id': 1, 
		'name': 'Harvey',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
	{
		'id': 2, 
		'name': 'Donna',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
	{
		'id': 3, 
		'name': 'Jessica',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
	{
		'id': 4, 
		'name': 'Katrina',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
	{
		'id': 5, 
		'name': 'Louis',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
	{
		'id': 6, 
		'name': 'Mike',
		'writergenres': [],
		'earnings': 0,
		'totalviews': 0,
		'myarticles': [],
		'subscribers': [],
		'followers': []
	},
]

// eslint-disable-next-line no-unused-vars
writersRouter.get('/', (request, response) => {
	response.json(writers)
})

writersRouter.get('/:id', (request, response) => {
	const id = Number(request.params.id)
	const writer = writers.find(writer => writer.id === id)
	if (writer) {
		response.json(writer)
	} else {
		response.status(404).end()
	}
})

module.exports = writersRouter