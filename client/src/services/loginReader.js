import axios from 'axios'
const baseUrl = 'https://own-news-app.herokuapp.com/api/reader/login'

const login = async credentials => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

export default { login }