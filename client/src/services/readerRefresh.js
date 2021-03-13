import axios from 'axios'
const baseUrl = '/api/reader/refresh'

const refreshReader = async (readerId) => {
	const response = await axios.post(baseUrl, readerId)
	return response.data
}

export default { refreshReader }