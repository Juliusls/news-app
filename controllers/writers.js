const writersRouter = require('express').Router()
const Writer = require('../models/writer')

// eslint-disable-next-line no-unused-vars
writersRouter.get('/', async (request, response) => {
	const writers = await Writer
		.find({})
		.populate('article')
		.populate('readers')
	response.json(writers)
})

// writersRouter.get('/:id', (request, response) => {
// 	const id = Number(request.params.id)
// 	const writer = writers.find(writer => writer.id === id)
// 	if (writer) {
// 		response.json(writer)
// 	} else {
// 		response.status(404).end()
// 	}
// })

writersRouter.post('/', async (request, response) => {
	const body = request.body

	if (body.firstName === undefined) {
		return response.status(400).json({error: 'First name missing'})
	}
	if (body.lastName === undefined) {
		return response.status(400).json({error: 'Last name missing'})
	}
	if (body.writergenres === undefined) {
		return response.status(400).json({error: 'Genres missing'})
	}

	const writer = new Writer({
		firstName: body.firstName,
		lastName: body.lastName,
		writergenres: body.genres,
		earnings: 0,
		totalviews: 0,
	})

	writer.save()
		.then(savedWriter => {
			response.json(savedWriter.toJSON())
		})
		.catch(error => console.log(error))
})

module.exports = writersRouter




// 'id': 1, 
// 'firstName': 'Harvey',
// 'lastName': 'Specter',
// 'writergenres': [],
// 'earnings': 0,
// 'totalviews': 0,
// 'myarticles': [],
// 'subscribers': [],
// 'followers': []
