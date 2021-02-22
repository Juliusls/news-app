import loginWriterService from '../services/loginWriter'

const loginWriterReducer = (state = null, action) => {
	switch(action.type) {
	case 'ADD_WRITER':
		return action.data
	case 'REMOVE_WRITER':
		return action.data
	default:
		return state
	}
}

export const addWriter = (newWriter) => {
	return async dispatch => {
		const writer = await loginWriterService.login(newWriter)
		dispatch ({
			type: 'ADD_WRITER',
			data: writer
		})
	}
}

export const removeWriter = () => {
	return dispatch => {
		dispatch ({
			type: 'REMOVE_WRITER',
			data: null
		})
	}
}

export default loginWriterReducer