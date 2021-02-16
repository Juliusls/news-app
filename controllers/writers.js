const writersRouter = require('express').Router()
const Writer = require('../models/writer')
const logger = require('../utils/logger')
const { getDate } = require('../utils/helpers')

writersRouter.get('/', async (request, response) => {
	const writers = await Writer
		.find({})
		.populate('article')
		.populate('readers')
	response.json(writers)
})

writersRouter.get('/:id', async (request, response) => {
	const writer = await Writer
		.findById(request.params.id)
		.populate('article')
		.populate('readers')
	if (writer) {
		response.json(writer)
	} else {
		response.status(404).end()
	}
})

writersRouter.post('/', async (request, response) => {
	const body = request.body

	if (body.firstName === undefined) {
		return response.status(400).json({error: 'First name missing'})
	}
	if (body.lastName === undefined) {
		return response.status(400).json({error: 'Last name missing'})
	}
	if (body.writerGenres === undefined) {
		return response.status(400).json({error: 'Genres missing'})
	}
	if (body.writerDescription === undefined) {
		return response.status(400).json({error: 'Writer description missing'})
	}

	const writer = new Writer({
		firstName: body.firstName,
		lastName: body.lastName,
		writerGenres: body.writerGenres,
		writerDescription: body.writerDescription,
		joined: getDate(),
		earnings: 0,
		totalViews: 0,
	})

	writer.save()
		.then(savedWriter => {
			response.json(savedWriter.toJSON())
		})
		.catch(error => logger.error(error))
})

writersRouter.put('/:id', (request, response) => {
	const body = request.body

	if (body.firstName === undefined) {
		return response.status(400).json({error: 'First name missing'})
	}
	if (body.lastName === undefined) {
		return response.status(400).json({error: 'Last name missing'})
	}
	if (body.writerGenres === undefined) {
		return response.status(400).json({error: 'Genres missing'})
	}
	if (body.earnings === undefined) {
		return response.status(400).json({error: 'Earinings missing'})
	}
	if (body.totalViews === undefined) {
		return response.status(400).json({error: 'Total views missing'})
	}
	if (body.writerDescription === undefined) {
		return response.status(400).json({error: 'Writer description missing'})
	}

	const writer = {
		firstName: body.firstName,
		lastName: body.lastName,
		writerGenres: body.writerGenres,
		earnings: body.earnings,
		totalViews: body.totalViews,
		writerDescription: body.writerDescription,

	}

	Writer.findByIdAndUpdate(request.params.id, writer, { new: true })
		.then(updatedWriter => {
			response.status(200).json(updatedWriter.toJSON())
		})
})

writersRouter.delete('/:id', async (request, response) => {
	await Writer.findByIdAndRemove(request.params.id)
	response.status(204).end()
})



module.exports = writersRouter
