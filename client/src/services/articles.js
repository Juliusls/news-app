import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/articles'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const postComment = async (newComment, id) => {
	const response = await axios.post(`${baseUrl}/${id}/comments`, newComment)
	return response.data
}

export default { getAll, postComment }