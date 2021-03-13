import axios from 'axios'
const baseUrl = 'https://own-news-app.herokuapp.com/api/reader/refresh'

const refreshReader = async (readerId) => {
	const response = await axios.post(baseUrl, readerId)
	return response.data
}

export default { refreshReader }