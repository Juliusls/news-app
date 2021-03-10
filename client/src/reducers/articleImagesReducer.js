import articleImagesService from '../services/articleImages'

const artcileImagesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_IMAGE':
		return action.data
	default:
		return state
	}
}

export const initImages = () => {
	return async dispatch => {
		const images = await articleImagesService.getAll()
		dispatch ({
			type: 'INIT_IMAGE',
			data: images
		})
	}
}

export default artcileImagesReducer