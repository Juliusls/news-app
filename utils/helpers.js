const getDateFormated = (formated, value = 0) => {
	let twoHours = 7200000
	let myDate = null
	if (formated) {
		if (value !== 0) {
			myDate = Date.now() + value + twoHours
		} else {
			myDate = Date.now() + twoHours
		}
		let date = myDate !== null
			? (new Date(myDate).toISOString().replace(/T/, ' ').replace(/\..+/, '')).slice(0, -3)
			: (new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')).slice(0, -3)
	
		return date
	} 
	return Date.now() + twoHours
}

module.exports = {
	getDateFormated
}