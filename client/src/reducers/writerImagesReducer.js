import writerImagesService from '../services/writerImages'

const writerImagesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_WRITER_IMAGES':
		return action.data
	case 'ADD_WRITER_IMAGE':
		return state.concat(action.data)
	default:
		return state
	}
}

export const initWriterImages = () => {
	return async dispatch => {
		const images = await writerImagesService.getAll()
		dispatch ({
			type: 'INIT_WRITER_IMAGES',
			data: images
		})
	}
}

export const addWriterImage = (newImage) => {
	return async dispatch => {
		dispatch ({
			type: 'ADD_WRITER_IMAGE',
			data: newImage
		})
	}
}

export default writerImagesReducer