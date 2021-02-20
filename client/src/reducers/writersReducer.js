import writersService from '../services/writers'

const writersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_WRITERS':
		return action.data
	case 'ADD_READER_TO_FOLLOWERS':
		return state.map(writer => writer.id === action.data.id ? action.data : writer)
	case 'REMOVE_READER_FROM_FOLLOWERS':
		// return state.map(writer => writer.id !== action.data.id ? writer : action.data)
		return state.map(writer => writer.id === action.data ? action.data : writer)

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
		const writerToUpdate = { followers: writer.followers.map(follower => follower.id).concat(readerToAdd.id) }
		await writersService.update(writerToUpdate, writer.id)
		const writerForDispatch = { ...writer, followers: writer.followers.concat(readerToAdd) }
		dispatch ({
			type: 'ADD_READER_TO_FOLLOWERS',
			data: writerForDispatch
		})
	}
}

export const removeReaderFromFollowers = (readerToRemove, writer) => {
	return async dispatch => {
		const writerToUpdate = { ...writer, followers: writer.followers.map(follower => follower.id).filter(id => id !== readerToRemove.id) }
		await writersService.update(writerToUpdate, writer.id)
		const writerForDispatch = { ...writer, followers: writer.followers.filter(writer => writer.id !== readerToRemove.id) }
		dispatch ({
			type: 'REMOVE_READER_FROM_FOLLOWERS',
			data: writerForDispatch
		})
	}
}

export default writersReducer