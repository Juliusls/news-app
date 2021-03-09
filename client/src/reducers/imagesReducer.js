import imagesService from '../services/images'

const imagesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_IMAGES':
		return action.data
	default:
		return state
	}
}

export const initImages = () => {
	return async dispatch => {
		const images = await imagesService.getAll()
		dispatch ({
			type: 'INIT_IMAGES',
			data: images
		})
	}
}

export default imagesReducer