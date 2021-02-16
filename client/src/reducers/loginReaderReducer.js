import loginReaderService from '../services/loginReader'

const loginReaderReducer = (state = null, action) => {
	switch(action.type) {
	case 'ADD_READER':
		return action.data
	case 'REMOVE_READER':
		return action.data
	default:
		return state
	}
}

export const addReader = (newReader) => {
	return async dispatch => {
		const reader = await loginReaderService.login(newReader)
		dispatch ({
			type: 'ADD_READER',
			data: reader
		})
	}
}

export const removeReader = () => {
	return dispatch => {
		dispatch ({
			type: 'REMOVE_READER',
			data: null
		})
	}
}

export default loginReaderReducer