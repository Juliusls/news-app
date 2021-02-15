const readerReducer = (state = null, action) => {
	switch(action.type) {
	case 'ADD_READER':
		return action.data
	case 'REMOVE_READER':
		return action.data
	default:
		return state
	}
}

export const addReader = (reader) => {
	return dispatch => {
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

export default readerReducer