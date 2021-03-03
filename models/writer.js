const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const writerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 2,
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2,
	},
	userName: {
		type: String,
		minlength: 3,
		required: true,
		unique: true
	},
	passwordHash: String,
	earnings: Number,
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

writerSchema.plugin(uniqueValidator)

writerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Writer', writerSchema)