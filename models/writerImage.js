const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
	name: String,
	img: {
		data: Buffer,
		contentType: String
	},
	writer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Writer'
	},
})

imageSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('WriterImage', imageSchema)