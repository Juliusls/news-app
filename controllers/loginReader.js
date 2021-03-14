const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginReaderRouter = require('express').Router()
const User = require('../models/reader')
const config = require('../utils/config')

loginReaderRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body

		const user = await User.findOne({ userName: body.userName })
		const passwordCorrect = user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash)

		if (!(user && passwordCorrect)) {
			return response.status(401).json({
				error: 'invalid username or password'
			})
		}

		const userForToken = {
			userName: user.userName,
			id: user._id,
		}

		let accessToken = jwt.sign(userForToken, config.READER_ACCESS_TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: parseInt(config.READER_ACCESS_TOKEN_LIFE)
		})

		let refreshToken = jwt.sign(userForToken, config.READER_REFRESH_TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: parseInt(config.READER_REFRESH_TOKEN_LIFE)
		})

		user.refreshToken = refreshToken
		await user.save()

		response.cookie('readerAuthCookie', accessToken)
		response.status(200).send({ userName: user.userName, id: user._id })
	} catch (error) {
		next(error)
	}
	
})

module.exports = loginReaderRouter

// { 
// 	httpOnly: true,
// 	secure: true,
// 	domain: 'julius-news-app.netlify.app',
// 	sameSite: false 
// }