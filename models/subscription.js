const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
	subscriber: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Reader'
	}],
	recipient: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Writer'
	}],
	type: String,
	startDate: String,
	endDate: String,
	// expireAt: {
	// 	type: Date,
	// 	default: Date.now,
	// 	index: { expires: Number },
	// },
	expirationDate: Number
})

subscriptionSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Subscription', subscriptionSchema)