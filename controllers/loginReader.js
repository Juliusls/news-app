const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginReaderRouter = require('express').Router()
const User = require('../models/reader')
const config = require('../utils/config')

loginReaderRouter.post('/', async (request, response) => {
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
		expiresIn: 60 * 60
	})

	// let refreshToken = jwt.sign(userForToken, config.REFRESH_TOKEN_SECRET, {
	// 	algorithm: 'HS256',
	// 	expiresIn: config.REFRESH_TOKEN_LIFE
	// })

	// user.refreshToken = refreshToken
	// await user.save()

	response.cookie('readerAuthCookie', accessToken)
	// TODO response.cookie('readerAuthCookie', accessToken, {secure: true, httpOnly: true})
	response.status(200).send({ userName: user.userName, id: user._id })
})

module.exports = loginReaderRouter
