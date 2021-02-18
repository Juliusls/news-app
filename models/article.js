const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const articleSchema = new mongoose.Schema({
	title: String,
	content: [String],
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Writer'
	},
	published: String,
	views: Number,
	paid: {
		type: String,
		enum: ['yes', 'no'],
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	],
	genres: [
		{
			type: String
		}
	]
})

articleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Article', articleSchema)