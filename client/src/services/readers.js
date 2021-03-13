import axios from 'axios'
const baseUrl = '/api/readers'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getOne = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
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
	getOne,
	update,
	createSubscribtion
}