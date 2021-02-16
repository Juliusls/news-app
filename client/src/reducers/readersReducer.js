import readersService from '../services/readers'

const readersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_READERS':
		return action.data
	case 'CREATE_READER':
		return state.concat(action.data)
	default:
		return state
	}
}

export const initReaders = () => {
	return async dispatch => {
		const readers = await readersService.getAll()
		dispatch ({
			type: 'INIT_READERS',
			data: readers
		})
	}
}

export const createReader = (newReader) => {
	return async dispatch => {
		const reader = await readersService.create(newReader)
		console.log('Reader from reducer', reader)
		dispatch ({
			type: 'CREATE_READER',
			data: reader
		})
	}
}

export default readersReducer