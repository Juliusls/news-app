const jwt = require('jsonwebtoken')
const refreshWriterRouter = require('express').Router()
const Writer = require('../models/writer')
const config = require('../utils/config')

refreshWriterRouter.post('/', async (request, response, next) => {
	const body = request.body
	let accessToken = request.cookies.writerAuthCookie

	if (!accessToken){
		return response.status(403).send()
	}

	try {
		jwt.verify(accessToken, config.WRITER_ACCESS_TOKEN_SECRET)
		return response.status(204).send()
	} catch (error) {
		if (error.name === 'TokenExpiredError' && error.message === 'jwt expired') {

			const user = await Writer.findById(body.id)

			let refreshToken = user.refreshToken

			if (!refreshToken){
				return response.status(403).send()
			}

			try {
				jwt.verify(refreshToken, config.WRITER_REFRESH_TOKEN_SECRET)
				const userForToken = {
					userName: user.userName,
					id: user._id,
				}

				let newToken = jwt.sign(userForToken, config.WRITER_ACCESS_TOKEN_SECRET, {
					algorithm: 'HS256',
					expiresIn: parseInt(config.WRITER_ACCESS_TOKEN_LIFE)
				})
						
				response.cookie('writerAuthCookie', newToken, {httpOnly: true})
				response.send({ userName: user.userName, id: user._id })
			}
			catch(error){
				next(error)
			}

		}
	}	
})

module.exports = refreshWriterRouter