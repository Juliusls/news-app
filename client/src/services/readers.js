import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/readers'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newReader) => {
	const response = await axios.post(baseUrl, newReader)
	return response.data
}

const update = async (updatedReader, id) => {
	const response = await axios.put(`${baseUrl}/${id}`, updatedReader)
	return response.data
}

const createSubscribtion = async (newSubscription, readerId) => {
	const response = await axios.post(`${baseUrl}/${readerId}/subscriptions`, newSubscription)
	return response.data
}

export default { 
	create,
	getAll,
	update,
	createSubscribtion
}