const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const readerSchema = new mongoose.Schema({
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
		required: true,
		minlength: 3,
		unique: true
	},
	joined: String,
	passwordHash: String,
	refreshToken: String,
	funds: Number,
	readerComments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	subscriptions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Subscription'
		}
	],
	favoritewriters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Writer'
		}
	]
})

readerSchema.plugin(uniqueValidator)

readerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Reader', readerSchema)
