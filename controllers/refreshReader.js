const jwt = require('jsonwebtoken')
const refreshReaderRouter = require('express').Router()
const Reader = require('../models/reader')
const config = require('../utils/config')

refreshReaderRouter.post('/', async (request, response) => {
	const body = request.body

	console.log('refreshTokenRequestBody', body.id)

	// let accessToken = request.cookies.writerAuthCookie

	// const decodedToken = jwt.verify(accessToken, process.env.WRITER_ACCESS_TOKEN_SECRET)

	// if (!request.cookies.writerAuthCookie || !decodedToken.id) {
	// 	return response.status(401).json({ error: 'token missing or invalid' })
	// }

	let accessToken = request.cookies.readerAuthCookie

	if (!accessToken){
		return response.status(403).send()
	}

	let payload
	try {
		payload = jwt.verify(accessToken, config.READER_ACCESS_TOKEN_SECRET)
	} catch (error) {
		return response.status(401).send('Readers token expired')
	}

	const user = await Reader.findById(body.id)


	//retrieve the refresh token from the users array
	let refreshToken = user.refreshToken

	//verify the refresh token
	try {
		jwt.verify(refreshToken, config.READER_REFRESH_TOKEN_SECRET)
	} catch (error) {
		return response.status(401).send()
	}

	let newToken = jwt.sign(payload, config.READER_ACCESS_TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: 60
	})

	response.cookie('readerAuthCookie', newToken, {secure: true, httpOnly: true})
	response.status(200).send({ userName: user.userName, id: user._id })
})


module.exports = refreshReaderRouter
