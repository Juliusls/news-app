import readerImagesService from '../services/readerImages'

const readerImagesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_READERS_IMAGES':
		return action.data
	case 'ADD_READER_IMAGE':
		return state.concat(action.data)
	default:
		return state
	}
}

export const initReaderImages = () => {
	return async dispatch => {
		const images = await readerImagesService.getAll()
		dispatch ({
			type: 'INIT_READERS_IMAGES',
			data: images
		})
	}
}

export const addReaderImage = (newImage) => {
	return async dispatch => {
		dispatch ({
			type: 'ADD_READER_IMAGE',
			data: newImage
		})
	}
}


export default readerImagesReducer