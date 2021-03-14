import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_BASE_URL}/api/writer/login`



const login = async credentials => {
	const response = await axios.post(baseUrl, credentials, { withCredentials: true })
	return response.data
}

export default { login }