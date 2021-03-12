import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/reader/refresh'

const refreshReader = async (readerId) => {
	const response = await axios.post(baseUrl, readerId)
	return response.data
}

export default { refreshReader }