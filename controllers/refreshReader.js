const jwt = require('jsonwebtoken')
const refreshReaderRouter = require('express').Router()
const Reader = require('../models/reader')
const config = require('../utils/config')

refreshReaderRouter.post('/', async (request, response, next) => {
	const body = request.body
	let accessToken = request.cookies.readerAuthCookie

	if (!accessToken){
		return response.status(403).send()
	}

	try{
		jwt.verify(accessToken, config.READER_ACCESS_TOKEN_SECRET)
		console.log('Access Token Is Still Valid')
		return response.status(204).send()
	} catch(error) {
		console.log('error response', error)
		if (error.name === 'TokenExpiredError' && error.message === 'jwt expired') {
			console.log('Access Token Is Not Valid')
			const user = await Reader.findById(body.id)

			let refreshToken = user.refreshToken

			if (!refreshToken){
				return response.status(403).send()
			}

			try {
				jwt.verify(refreshToken, config.READER_REFRESH_TOKEN_SECRET)
				console.log('Refresh Token Is Still Valid')
				const userForToken = {
					userName: user.userName,
					id: user._id,
				}

				let newToken = jwt.sign(userForToken, config.READER_ACCESS_TOKEN_SECRET, {
					algorithm: 'HS256',
					expiresIn: parseInt(config.READER_ACCESS_TOKEN_LIFE)
				})
			
				console.log('newToken', newToken)
			
				response.cookie('readerAuthCookie', newToken, {httpOnly: true})
				response.send({ userName: user.userName, id: user._id })
			}
			catch(error){
				next(error)
			}

		}
	}	
})

module.exports = refreshReaderRouter