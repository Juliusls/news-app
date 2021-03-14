import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/writer/refresh`


const refreshWriter = async (writerId) => {
	const response = await axios.post(baseUrl, writerId)
	return response.data
}

export default { 
	refreshWriter
}