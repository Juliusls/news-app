const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const writerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	earnings: Number,
	totalViews: Number,
	writerGenres: [String],
	myarticles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}
	],
	subscribers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reader'
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