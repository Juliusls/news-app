import writersService from '../services/writers'

const writersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_WRITERS':
		return action.data
	case 'ADD_READER_TO_FOLLOWERS':
		return state.filter(writer => writer.id !== action.data.id ? writer : action.data)
	default:
		return state
	}
}

export const initWriters = () => {
	return async dispatch => {
		const writers = await writersService.getAll()
		dispatch ({
			type: 'INIT_WRITERS',
			data: writers
		})
	}
}


export const addReaderToFollowers = (readerToAdd, writer) => {
	return async dispatch => {
		const writerToUpdate = { ...writer, followers: writer.followers.concat(readerToAdd.id) }
		const updatedWriter = await writersService.update(writerToUpdate, writer.id)
		dispatch ({
			type: 'ADD_READER_TO_FOLLOWERS',
			data: updatedWriter
		})
	}
}

export default writersReducer