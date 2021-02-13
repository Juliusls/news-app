const getDate = () => {
	const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
	return date
}

module.exports = {
	getDate
}




