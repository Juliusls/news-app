const writersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Writer = require('../models/writer')
const WriterImage = require('../models/writerImage')
const { getDateFormated } = require('../utils/helpers')
const jwt = require('jsonwebtoken')

writersRouter.get('/', async (request, response) => {
	const writers = await Writer
		.find({})
		.populate('myarticles')
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
	if (writer) {
		response.json(writer)
	} else {
		response.status(404).end()
	}
})

writersRouter.post('/', async (request, response, next) => {
	try {
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

		const image = await WriterImage.findById(body.imageId)

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
			image: image._id,
			joined: getDateFormated(true),
			earnings: 0,
		})

		const savedWriter = await writer.save()
		image.writer = savedWriter._id
		await image.save()
		response.status(201).json(savedWriter)
	} catch (error) {
		next(error)
	}
})

writersRouter.put('/:id', async (request, response, next) => {
	try {
		const body = request.body

		const writerFromDb = await Writer.findById(request.params.id)

		if (writerFromDb.oneArticlePrice !== body.oneArticlePrice || writerFromDb.montlySubscriptionPrice !== body.montlySubscriptionPrice || writerFromDb.yearlySubscriptionPrice !== body.yearlySubscriptionPrice) {
			let accessToken = request.cookies.writerAuthCookie

			const decodedToken = jwt.verify(accessToken, process.env.WRITER_ACCESS_TOKEN_SECRET)

			if (!request.cookies.writerAuthCookie || !decodedToken.id) {
				return response.status(401).json({ error: 'token missing or invalid' })
			}
		}

		const writer = {
			followers: body.followers,
			earnings: body.earnings, 
			oneArticlePrice: body.oneArticlePrice,
			montlySubscriptionPrice: body.montlySubscriptionPrice,
			yearlySubscriptionPrice: body.yearlySubscriptionPrice,
		}

		const updatedWriter = await Writer.findByIdAndUpdate(request.params.id, writer, { new: true })
		response.status(200).json(updatedWriter.toJSON())
	} catch (error) {
		next(error)
	}
})

writersRouter.delete('/:id', async (request, response) => {
	await Writer.findByIdAndRemove(request.params.id)
	response.status(204).end()
})



module.exports = writersRouter
