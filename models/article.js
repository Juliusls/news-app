const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const articleSchema = new mongoose.Schema({
	title: String,
	content: String,
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
	comments: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'
	},
	genres: [{
		type: String
	}]
})

articleSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Article', articleSchema)

// 'id': 4,
// 'title': 'Fourh article',
// 'content': 'Deserunt eu non veniam sit magna esse magna sunt nisi ullamco. Irure aliquip do nostrud ullamco esse. Mollit dolore commodo minim dolore fugiat laborum qui. Consectetur ut minim quis sint adipisicing laborum minim cillum tempor proident labore nostrud. Nostrud aliqua id esse et eu ullamco dolor.',
// 'published': 2021,
// 'author': 'Fourth author',
// 'views': 0,
// 'type': 'paid',
// 'comments': [],
// 'genres': ['Sport']