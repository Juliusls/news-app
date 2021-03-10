const readerImageRouter = require('express').Router()
const ReaderImage = require('../models/readerImage')
// const Writer = require('../models/writer')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { getDateFormated } = require('../utils/helpers')
// const jwt = require('jsonwebtoken')
 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/readers/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + getDateFormated(true).replace(/\s+/g, '-') + '.jpeg')
	}
})
 
var upload = multer({ storage: storage })

readerImageRouter.get('/', async (request, response) => {
	const images = await ReaderImage.find({})
	if (images) {
		response.send(images)
	} else {
		response.status(404).end()
	}
})

readerImageRouter.get('/:id', async (request, response) => {
	const image = await ReaderImage.findById(request.params.id)
	if (image) {
		response.send(image)
	} else {
		response.status(404).end()
	}
})

readerImageRouter.post('/', upload.single('file'), async (request, response, next) => {
	try {
		if (request.file === undefined) {
			return response.status(400).json({ error: 'file missing' })
		}

		const imageForDb = new ReaderImage({
			name: request.file.originalname,
			img: {
				data: fs.readFileSync(path.join(__dirname, '../uploads/readers/' + request.file.filename)),
				contentType: 'image/jpeg'
			}
		})
		
		const savedImage = await imageForDb.save()
		return response.status(200).send(savedImage)
	} catch (error) {
		next(error)
	}	
})

module.exports = readerImageRouter
