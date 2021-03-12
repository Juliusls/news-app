import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/writer/refresh'

const refreshWriter = async (writerId) => {
	const response = await axios.post(baseUrl, writerId)
	return response.data
}

export default { refreshWriter }