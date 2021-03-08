import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/images'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newImage) => {
	console.log('image from service', newImage)
	const response = await axios.post(baseUrl, newImage)
	return response.data
}

export default { getAll, create }