const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
	logger.error('ERROR NAME', error.name)
	logger.error('ERROR KIND', error.kind)
	logger.error('ERROR MESSAGE', error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	next(error)
}


module.exports = {
	errorHandler
}