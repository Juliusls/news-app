const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const readerSchema = new mongoose.Schema({
	name: String,
	funds: Number,
	readingHistory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	},
	readercomments: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	subscriptions: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Writer'
	},
	favoritewriters: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Writer'
	},
})

readerSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Reader', readerSchema)
