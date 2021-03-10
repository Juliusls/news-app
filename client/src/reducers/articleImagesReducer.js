import articleImagesService from '../services/articleImages'

const artcileImagesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_ARTICLES_IMAGES':
		return action.data
	case 'ADD_ARTICLE_IMAGE':
		return state.concat(action.data)
	default:
		return state
	}
}

export const initArticleImages = () => {
	return async dispatch => {
		const images = await articleImagesService.getAll()
		dispatch ({
			type: 'INIT_ARTICLES_IMAGES',
			data: images
		})
	}
}

export const addArticleImage = (newImage) => {
	return async dispatch => {
		dispatch ({
			type: 'ADD_ARTICLE_IMAGE',
			data: newImage
		})
	}
}


export default artcileImagesReducer