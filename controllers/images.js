const imagesRouter = require('express').Router()
const Image = require('../models/images')
const multer = require('multer')
const fs = require('fs')
const path = require('path')


var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

var upload = multer({ storage: storage })

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


imagesRouter.post('/', upload.single('image'), (req, res) => {
 
	var obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	Image.create(obj, (err, item) => {
		if (err) {
			console.log(err)
		}
		else {
			item.save()
			res.redirect('/')
		}
	})
})

module.exports = imagesRouter
