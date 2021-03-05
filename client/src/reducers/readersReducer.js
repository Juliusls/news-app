import readersService from '../services/readers'

const readersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_READERS':
		return action.data
	case 'CREATE_READER':
		return state.concat(action.data)
	case 'UPDATE_READERS_FUNDS':
		return state.map(reader => {
			if (reader.id === action.data.id) {
				return { ...reader, funds: action.data.funds }
			}
			return reader
		})
	case 'ADD_FAVORITE_WRITER':
		return state.map(reader => reader.id === action.data.id ? action.data : reader)
	case 'REMOVE_FAVORITE_WRITER': 
		return state.map(reader => reader.id === action.data.id ? action.data : reader)
	case 'ADD_SUBSCRIPTION_TO_READER': 
		return state.map(reader => {
			if (reader.id === action.data.subscriber.id) {
				return { ...reader, subscriptions: reader.subscriptions.concat(action.data) }
			}
			return reader
		})
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

export const addFavoriteWriter = (writerToAdd, reader) => {
	return async dispatch => {
		const readerToUpdate = { funds: reader.funds, favoritewriters: reader.favoritewriters.map(favoritewriter => favoritewriter.id).concat(writerToAdd.id) }
		const readerFromDb = await readersService.update(readerToUpdate, reader.id)
		console.log('readerFromDb', readerFromDb)
		const readerForDispatch = { ...reader, favoritewriters: reader.favoritewriters.concat(writerToAdd) }
		dispatch ({
			type: 'ADD_FAVORITE_WRITER',
			data: readerForDispatch
		})
	}
}

export const removeFavoriteWriter = (writerToRemove, reader) => {
	return async dispatch => {
		const readerToUpdate = { favoritewriters: reader.favoritewriters.map(favoritewriter => favoritewriter.id).filter(id => id !== writerToRemove.id) }
		const readerFromDb = await readersService.update(readerToUpdate, reader.id)
		console.log('readerFromDb', readerFromDb)
		const readerForDispatch = { ...reader, favoritewriters: reader.favoritewriters.filter(writer => writer.id !== writerToRemove.id) }
		dispatch ({
			type: 'REMOVE_FAVORITE_WRITER',
			data: readerForDispatch
		})
	}
}


export const addSubscriptionToReader = (newSubscription) => {
	return async dispatch => {
		dispatch ({
			type: 'ADD_SUBSCRIPTION_TO_READER',
			data: newSubscription
		})
	}
}

export const addReaderFunds = (fundsToAdd, reader) => {
	return async dispatch => {
		const readerToUpdate = { favoritewriters: reader.favoritewriters.map(writer => writer.id), funds: reader.funds + fundsToAdd }
		const updatedReader = await readersService.update(readerToUpdate, reader.id)
		dispatch ({
			type: 'UPDATE_READERS_FUNDS',
			data: updatedReader
		})
	}
}

export const substractReaderFunds = (fundsToSubstract, reader) => {
	return async dispatch => {
		const readerToUpdate = { favoritewriters: reader.favoritewriters.map(writer => writer.id) , funds: reader.funds - fundsToSubstract }
		const updatedReader = await readersService.update(readerToUpdate, reader.id)
		dispatch ({
			type: 'UPDATE_READERS_FUNDS',
			data: updatedReader
		})
	}
}

export default readersReducer