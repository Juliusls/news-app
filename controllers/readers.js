const readersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Reader = require('../models/reader')
const Writer = require('../models/writer')
const Subscription = require('../models/subscription')
const logger = require('../utils/logger')
const { getDateFormated } = require('../utils/helpers')
const jwt = require('jsonwebtoken')

// eslint-disable-next-line no-unused-vars
readersRouter.get('/', async (request, response) => {
	const readers = await Reader.find({})
		.populate({
			path: 'readerComments',
			model: 'Comment',
			populate: {
				path: 'article',
				model: 'Article'
			}
		})
		.populate('favoritewriters')
		.populate({
			path: 'subscriptions',
			model: 'Subscription',
			populate: {
				path: 'subscriber',
				model: 'Reader'
			},		
		})
		.populate({
			path: 'subscriptions',
			model: 'Subscription',
			populate: {
				path: 'recipient',
				model: 'Writer'
			}
		})
	response.json(readers)
})

readersRouter.get('/:id', async (request, response) => {
	const reader = await Reader.findById(request.params.id)
		.populate({
			path: 'readerComments',
			model: 'Comment',
			populate: {
				path: 'article',
				model: 'Article'
			}
		})
		.populate('favoritewriters')
		.populate({
			path: 'subscriptions',
			model: 'Subscription',
			populate: {
				path: 'subscriber',
				model: 'Reader'
			},		
		})
		.populate({
			path: 'subscriptions',
			model: 'Subscription',
			populate: {
				path: 'recipient',
				model: 'Writer'
			}
		})
	if (reader) {
		response.json(reader)
	} else {
		response.status(404).end()
	}
})

readersRouter.post('/', async (request, response) => {
	try {
		const body = request.body

		if (body.password.length < 3) {
			return response.status(400).json({ error: 'password too short' }).end()
		}
		if (body.firstName === undefined) {
			return response.status(400).json({error: 'first name missing'})
		}
		if (body.lastName === undefined) {
			return response.status(400).json({error: 'last name missing'})
		}
		if (body.userName === undefined) {
			return response.status(400).json({error: 'username missing'})
		}
		if (body.password === undefined) {
			return response.status(400).json({error: 'password missing'})
		}

		const saltRounds = 12
		const passwordHash = await bcrypt.hash(body.password, saltRounds)


		const reader = new Reader({
			firstName: body.firstName,
			lastName: body.lastName,
			userName: body.userName,
			joined: getDateFormated(true),
			funds: 0,
			passwordHash
		})

		const savedReader = await reader.save()
		response.status(201).json(savedReader)
	} catch(error) {
		logger.error(error)
	}
})

readersRouter.put('/:id', (request, response) =>{
	const body = request.body

	let accessToken = request.cookies.readerAuthCookie

	const decodedToken = jwt.verify(accessToken, process.env.READER_ACCESS_TOKEN_SECRET)

	if (!request.cookies.readerAuthCookie || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}

	const reader = {
		funds: body.funds,
		favoritewriters: body.favoritewriters
	}

	Reader.findByIdAndUpdate(request.params.id, reader, { new: true })
		.then(updatedReader => {
			response.status(200).json(updatedReader)
		})
		.catch(error => logger.error(error))
})

readersRouter.delete('/:id', async (request, response) => {
	await Reader.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

readersRouter.post('/:id/subscriptions', async (request, response) => {
	const body = request.body
	let accessToken = request.cookies.readerAuthCookie

	const decodedToken = jwt.verify(accessToken, process.env.READER_ACCESS_TOKEN_SECRET)

	if (!request.cookies.readerAuthCookie || !decodedToken.id) {
		return response.status(401).json({ error: 'Token missing or invalid' })
	}

	if (body.type === undefined) {
		return response.status(400).json({error: 'Type missing'})
	}
	if (body.writerId === undefined) {
		return response.status(400).json({error: 'Writers id missing'})
	}

	try {
		const reader = await Reader.findById(decodedToken.id)
		const writer = await Writer.findById(body.writerId)

		if (!writer) {
			return response.status(400).json({ error: 'writer that you are trying to subscribe to does not exist' })
		}

		const subscription = new Subscription({
			subscriber: reader._id,
			recipient: writer._id,
			type: body.type,
			startDate: getDateFormated(true),
			endDate: getDateFormated(true, (body.type === 'montly' ? 2592000000 : 31556952000)),
			// TODO check how it works
			createdAt: { 
				index: {
					expires: (body.type === 'montly') ? 300 : 600
				}
			}
		})

		const savedSubscription = await subscription.save()

		reader.subscriptions = reader.subscriptions.concat(savedSubscription._id)
		writer.subscribers = writer.subscribers.concat(savedSubscription._id)
		await reader.save()
		await writer.save()
		response.status(201).json(savedSubscription)
	} catch(error) {
		logger.error(error)
	}
})

module.exports = readersRouter