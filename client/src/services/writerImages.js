import axios from 'axios'
const baseUrl = '/api/images/writers'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getOne = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const create = async (newImage) => {
	const response = await axios.post(baseUrl, newImage)
	return response.data
}

export default { getAll, getOne, create }