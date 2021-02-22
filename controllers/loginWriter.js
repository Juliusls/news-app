const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginWriterRouter = require('express').Router()
const User = require('../models/writer')
const config = require('../utils/config')

loginWriterRouter.post('/', async (request, response) => {
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

	let accessToken = jwt.sign(userForToken, config.WRITER_ACCESS_TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: 60 * 60
	})

	// let refreshToken = jwt.sign(userForToken, config.REFRESH_TOKEN_SECRET, {
	// 	algorithm: 'HS256',
	// 	expiresIn: config.REFRESH_TOKEN_LIFE
	// })

	// user.refreshToken = refreshToken
	// await user.save()

	response.cookie('writerAuthCookie', accessToken)
	// TODO response.cookie('writerAuthCookie', accessToken, {secure: true, httpOnly: true})
	response.status(200).send({ userName: user.userName, id: user._id })
})

module.exports = loginWriterRouter