import writersService from '../services/writers'

const writersReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_WRITERS':
		return action.data
	case 'ADD_NEW_WRITER':
		return state.concat(action.data)
	case 'UPDATE_WRITER_EARNINGS':
		return state.map(writer => {
			if (writer.id === action.data.id) {
				return { ...writer, earnings: action.data.earnings }
			}
			return writer
		})
	case 'UPDATE_PRICING':
		return state.map(writer => {
			if (writer.id === action.data.id) {
				return { ...writer, oneArticlePrice: action.data.oneArticlePrice, montlySubscriptionPrice: action.data.montlySubscriptionPrice, yearlySubscriptionPrice: action.data.yearlySubscriptionPrice,  }
			}
			return writer
		})
	case 'ADD_ARTICLE_TO_WRITER':
		return state.map(writer => {
			if (writer.id === action.data.author) {
				return { ...writer, myarticles: writer.myarticles.concat(action.data) }
			}
			return writer
		})
	case 'ADD_READER_TO_FOLLOWERS':
		return state.map(writer => writer.id === action.data.id ? action.data : writer)
	case 'REMOVE_READER_FROM_FOLLOWERS':
		return state.map(writer => writer.id === action.data ? action.data : writer)
	case 'REMOVE_SUBS_FROM_WRITERS':
		return state.map(writer => ({ ...writer, subscriptions: writer.subscribers.filter(sub => !action.data.includes(sub.id)) }))
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

export const createWriter = (newWriter) => {
	return async dispatch => {
		dispatch({
			type: 'ADD_NEW_WRITER',
			data: newWriter
		})
	}
}

export const addReaderToFollowers = (readerToAdd, writer) => {
	return async dispatch => {
		const writerToUpdate = { ...writer, followers: writer.followers.map(follower => follower.id).concat(readerToAdd.id) }
		const writerFromDb = await writersService.update(writerToUpdate, writer.id)
		console.log('writerFromDb', writerFromDb)
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
		const writerFromDb = await writersService.update(writerToUpdate, writer.id)
		console.log('writerFromDb', writerFromDb)
		const writerForDispatch = { ...writer, followers: writer.followers.filter(writer => writer.id !== readerToRemove.id) }
		dispatch ({
			type: 'REMOVE_READER_FROM_FOLLOWERS',
			data: writerForDispatch
		})
	}
}

export const addEarningsToWriter = (earningsToAdd, writer) => {
	return async dispatch => {
		const writerToUpdate = { ...writer, followers: writer.followers.map(follower => follower.id) , earnings: writer.earnings + earningsToAdd }
		const updatedWriter = await writersService.update(writerToUpdate, writer.id)
		dispatch ({
			type: 'UPDATE_WRITER_EARNINGS',
			data: updatedWriter
		})
	}
}

export const updatePricing = (newValues, writer) => {
	return async dispatch => {
		const writerToUpdate = { followers: writer.followers.map(follower => follower.id), earnings: writer.earnings, ...newValues }
		await writersService.update(writerToUpdate, writer.id)
		const writerToDispatch = { ...writer, ...newValues }
		dispatch ({
			type: 'UPDATE_PRICING',
			data: writerToDispatch
		})
	}
}

export const addArticleToWriter = (article) => {
	return async dispatch => {
		dispatch ({
			type: 'ADD_ARTICLE_TO_WRITER',
			data: article
		})
	}
}

export const removeSubsFromWriters = (subsToRemove) => {
	return async dispatch => {
		dispatch ({
			type: 'REMOVE_SUBS_FROM_WRITERS',
			data: subsToRemove
		})
	}
}


export default writersReducer