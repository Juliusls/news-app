const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const writerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	userName: String,
	passwordHash: String,
	earnings: Number,
	totalViews: Number,
	joined: String,
	writerDescription: String,
	writerGenres: [String],
	oneArticlePrice: Number,
	montlySubscriptionPrice: Number,
	yearlySubscriptionPrice: Number,
	myarticles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}
	],
	subscribers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subscription'
		}
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reader'
		}
	],
})

writerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Writer', writerSchema)