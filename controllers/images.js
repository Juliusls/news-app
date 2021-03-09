const imagesRouter = require('express').Router()
const Image = require('../models/images')
// const Writer = require('../models/writer')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const { getDateFormated } = require('../utils/helpers')
// const jwt = require('jsonwebtoken')
 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + getDateFormated(true).replace(/\s+/g, '-') + '.jpeg')
	}
})
 
var upload = multer({ storage: storage })

imagesRouter.get('/', async (request, response) => {
	const images = await Image.find({})
	if (images) {
		response.send(images)
	} else {
		response.status(404).end()
	}
})

imagesRouter.get('/:id', async (request, response) => {
	const image = await Image.findById(request.params.id)
	if (image) {
		response.send(image)
	} else {
		response.status(404).end()
	}
})

imagesRouter.post('/', upload.single('file'), async (request, response, next) => {
	try {

		// let accessToken = request.cookies.writerAuthCookie

		// const decodedToken = jwt.verify(accessToken, process.env.WRITER_ACCESS_TOKEN_SECRET)

		// if (!request.cookies.writerAuthCookie || !decodedToken.id) {
		// 	return response.status(401).json({ error: 'token missing or invalid' })
		// }

		if (request.file === undefined) {
			return response.status(400).json({ error: 'file missing' })
		}

		const imageForDb = new Image({
			name: request.file.originalname,
			img: {
				data: fs.readFileSync(path.join(__dirname, '../uploads/' + request.file.filename)),
				contentType: 'image/jpeg'
			}
		})
		
		const savedImage = await imageForDb.save()
		return response.status(200).send(savedImage)
	} catch (error) {
		next(error)
	}	
})

module.exports = imagesRouter
