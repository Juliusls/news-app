import writerService from '../services/writers'

const writersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_WRITERS':
		return action.data
	default:
		return state
	}
}

export const initWriters = () => {
	return async dispatch => {
		const writers = await writerService.getAll()
		dispatch ({
			type: 'INIT_WRITERS',
			data: writers
		})
	}
}

export default writersReducer