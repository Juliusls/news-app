import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/subscriptions'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const deleteMany = async (array) => {
	const response = await  axios.delete(baseUrl, { data: array })
	return response.data
}

export default { getAll, deleteMany }