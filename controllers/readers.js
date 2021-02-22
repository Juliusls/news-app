const readersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Reader = require('../models/reader')
const logger = require('../utils/logger')
const { getDate } = require('../utils/helpers')
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
	response.json(readers)
})

readersRouter.get('/:id', async (request, response) => {
	const reader = await Reader.findById(request.params.id)
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
			joined: getDate(),
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

module.exports = readersRouter