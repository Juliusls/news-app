import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/images/articles`

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

export default { 
	getAll,
	getOne, 
	create
}