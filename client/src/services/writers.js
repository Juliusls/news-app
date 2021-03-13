import axios from 'axios'
const baseUrl = 'https://own-news-app.herokuapp.com/api/writers'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const getOne = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const create = async (newWriter) => {
	const response = await axios.post(baseUrl, newWriter)
	return response.data
}

const update = async (updatedWriter, id) => {
	const response = await axios.put(`${baseUrl}/${id}`, updatedWriter)
	return response.data
}

export default { getAll, getOne, create, update }