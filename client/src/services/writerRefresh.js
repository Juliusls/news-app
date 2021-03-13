import axios from 'axios'
const baseUrl = 'https://own-news-app.herokuapp.com/api/writer/refresh'

const refreshWriter = async (writerId) => {
	const response = await axios.post(baseUrl, writerId)
	return response.data
}

export default { refreshWriter }