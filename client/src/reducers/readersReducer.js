import readersService from '../services/readers'

const readersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_READERS':
		return action.data
	case 'CREATE_READER':
		return state.concat(action.data)
	case 'UPDATE_READER':
		return state.filter(reader => reader.id !== action.data.id ? reader : action.data) 
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
		dispatch ({
			type: 'CREATE_READER',
			data: reader
		})
	}
}

export const updateReaderFunds = (fundsToAdd, reader) => {
	return async dispatch => {
		const readerToUpdate = { ...reader, funds: reader.funds + fundsToAdd }
		const updatedReader = await readersService.update(readerToUpdate, reader.id)
		dispatch ({
			type: 'UPDATE_READER',
			data: updatedReader
		})
	}
}

export default readersReducer