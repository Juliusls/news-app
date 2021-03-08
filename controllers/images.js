const imagesRouter = require('express').Router()
const Image = require('../models/images')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname + '-' + Date.now())
	}
})
 
var upload = multer({ storage: storage }).single('file')

imagesRouter.get('/', async (request, response) => {
	await Image.find({}, (error, items) => {
		if (error) {
			console.log(error)
			response.status(500).send('An error occurred', error)
		}
		else {
			response.render('imagesPage', { items: items })
		}
	})
})

imagesRouter.post('/', (request, response) => {

	upload(request, response, function (error) {
		if (error instanceof multer.MulterError) {
			return response.status(500).json(error)
		} else if (error) {
			return response.status(500).json(error)
		}

		console.log('request.file.originalname', request.file.originalname)
		console.log('request.file.originalname', request.file.filename)

		var obj = {
			name: request.file.originalname,
			img: {
				data: fs.readFileSync(path.join(__dirname, '../uploads/' + request.file.filename)),
				contentType: 'image/jpeg'
			}
		}

		console.log(obj)

		// Image.create(obj, (err, item) => {
		// 	if (err) {
		// 		console.log(err)
		// 	}
		// 	else {
		// 		item.save()
		// 		response.redirect('/')
		// 	}
		// })
		console.log(request.file)
		return response.status(200).send(request.file)
	})
})



// imagesRouter.post('/', (request, response) => {

// 	var obj = {
// 		name: request.body.name,
// 		img: {
// 			data: fs.readFileSync(path.join(__dirname, '../uploads/' + request.body.name)),
// 			contentType: 'image/jpeg'
// 		}
// 	}

// 	Image.create(obj, (err, item) => {
// 		if (err) {
// 			console.log(err)
// 		}
// 		else {
// 			item.save()
// 			response.redirect('/')
// 		}
// 	})
// })

module.exports = imagesRouter
