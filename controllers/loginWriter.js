const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginWriterRouter = require('express').Router()
const User = require('../models/writer')
const config = require('../utils/config')

loginWriterRouter.post('/', async (request, response, next) => {
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

		let accessToken = jwt.sign(userForToken, config.WRITER_ACCESS_TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: parseInt(config.WRITER_ACCESS_TOKEN_LIFE)
		})

		let refreshToken = jwt.sign(userForToken, config.WRITER_REFRESH_TOKEN_SECRET, {
			algorithm: 'HS256',
			expiresIn: parseInt(config.WRITER_REFRESH_TOKEN_LIFE)
		})

		user.refreshToken = refreshToken
		await user.save()

		// TODO add secure: true before pushing to Heroku
		response.cookie('writerAuthCookie', accessToken, {httpOnly: true})
		response.status(200).send({ userName: user.userName, id: user._id })
	} catch (error) {
		next(error)
	}
	
})

module.exports = loginWriterRouter
