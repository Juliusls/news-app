const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
	logger.error('ERROR NAME', error.name)
	logger.error('ERROR KIND', error.kind)
	logger.error('ERROR MESSAGE', error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'JsonWebTokenError' && error.message !== 'jwt must be provided') {
		return response.status(401).json({ error: 'invalid token' })
	} else if (error.name === 'JsonWebTokenError' && error.message === 'jwt must be provided') {
		return response.status(401).json({ error: 'token not provided' })
	} else if (error.name === 'TokenExpiredError' && error.message === 'jwt expired') {
		return response.status(401).send({ error: 'token expired' })
	}
	next(error)
}

// const cookieChecker = (request, response, next) => {
// 	response.setHeader('Access-Control-Allow-Origin', 'https://julius-news-app.netlify.app')
// 	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
// 	response.setHeader('Access-Control-Allow-Headers', 'X-Access-Token, Authorization X-Requested-With, Content-Type, Accept')
// 	response.setHeader('Access-Control-Allow-Credentials', true)
// 	next()
// }

module.exports = {
	errorHandler,
	// cookieChecker
}