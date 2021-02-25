const writersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Writer = require('../models/writer')
const logger = require('../utils/logger')
const { getDateFormated } = require('../utils/helpers')

writersRouter.get('/', async (request, response) => {
	const writers = await Writer
		.find({})
		.populate('article')
		.populate('readers')
		.populate('followers')
		.populate({
			path: 'subscribers',
			model: 'Subscription',
			populate: {
				path: 'subscriber',
				model: 'Reader'
			},		
		})
		.populate({
			path: 'subscribers',
			model: 'Subscription',
			populate: {
				path: 'recipient',
				model: 'Writer'
			}
		})
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
	if (body.userName === undefined) {
		return response.status(400).json({error: 'User name missing'})
	}
	if (body.writerGenres === undefined) {
		return response.status(400).json({error: 'Genres missing'})
	}
	if (body.writerDescription === undefined) {
		return response.status(400).json({error: 'Writer description missing'})
	}
	if (body.oneArticlePrice === undefined) {
		return response.status(400).json({error: 'One Article Price missing'})
	}
	if (body.montlySubscriptionPrice === undefined) {
		return response.status(400).json({error: 'Montly Subscription Price missing'})
	}
	if (body.yearlySubscriptionPrice === undefined) {
		return response.status(400).json({error: 'Yearly Subscription Price missing'})
	}
	if (body.password === undefined) {
		return response.status(400).json({error: 'password missing'})
	}

	const saltRounds = 12
	const passwordHash = await bcrypt.hash(body.password, saltRounds)


	const writer = new Writer({
		firstName: body.firstName,
		lastName: body.lastName,
		userName: body.userName,
		writerGenres: body.writerGenres,
		writerDescription: body.writerDescription,
		oneArticlePrice: body.oneArticlePrice,
		montlySubscriptionPrice: body.montlySubscriptionPrice,
		yearlySubscriptionPrice: body.yearlySubscriptionPrice,
		passwordHash,
		joined: getDateFormated(true),
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

	const writer = {
		followers: body.followers,
		earnings: body.earnings
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
