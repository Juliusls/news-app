const subscriptionsRouter = require('express').Router()
const Subscription = require('../models/subscription')


subscriptionsRouter.get('/', async (request, response) => {
	const subs = await Subscription
		.find({})
	response.json(subs)
})

subscriptionsRouter.delete('/', async (request, response) => {
	const body = request.body

	if (body.length > 1) {
		const arrayOfIds = body.map(sub => sub.id)
		await Subscription.deleteMany({ _id: {$in: arrayOfIds}})
		response.status(204).end()
	} else {
		const oneIdObject = { _id: body[0].id }
		await Subscription.deleteOne(oneIdObject)
		response.status(204).end()
	}
})

module.exports = subscriptionsRouter
