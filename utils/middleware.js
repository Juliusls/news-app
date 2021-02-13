const tokenExtractor = (request, response, next) => {
	let accessToken = request.cookies.authCookie
	
	if (accessToken){
		request.token = accessToken
	}
	
	next()
}

module.exports = {
	tokenExtractor
}