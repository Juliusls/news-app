import axios from 'axios'
const baseUrl = 'https://own-news-app.herokuapp.com/api/subscriptions'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const deleteMany = async (array) => {
	const response = await  axios.delete(baseUrl, { data: array })
	return response.data
}

export default { getAll, deleteMany }