import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/reader/refresh`


const refreshReader = async (readerId) => {
	const response = await axios.post(baseUrl, readerId)
	return response.data
}

export default { 
	refreshReader 
}