const getDateFormated = (formated, value = 0) => {
	let myDate = null
	if (formated) {
		if (value !== 0) {
			myDate = Date.now() + value
		}
		let date = myDate !== null
			? (new Date(myDate).toISOString().replace(/T/, ' ').replace(/\..+/, '')).slice(0, -3)
			: (new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')).slice(0, -3)
	
		return date
	} 
	return Date.now() 
}

module.exports = {
	getDateFormated
}