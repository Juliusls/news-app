const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
	logger.error('ERROR NAME', error.name)
	logger.error('ERROR KIND', error.kind)
	logger.error('ERROR MESSAGE', error.message)

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })

	} else if (error.kind === 'ObjectId' && error.stringValue === '"603918f090db115235e7620"') {
		return response.status(400).send({ error: 'wrong id' })

	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' })
	}
	
	
	
	
	// else if (error.name === 'JsonWebTokenError' && error.message === 'jwt must be provided') {
	// 	return response.status(401).json({ error: 'token not provided' })
	// }

	// } else if (error.message === 'jwt expired:') {
	// 	return response.status(400).json({ error: 'token expired'})
	// } 
	// else if (error.name === 'ValidationError') {
	// 	return response.status(400).json({ error: error.message })
	// }  else if (error.name === 'JsonWebTokenError' && error.message !== 'jwt must be provided') {
	// 	return response.status(401).json({ error: 'invalid token' })
	// } 
	next(error)
}


module.exports = {
	errorHandler
}