import arcticleService from '../services/articles'

const articlesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_ARTICLES':
		return action.data
	default:
		return state
	}
}

export const initArticles = () => {
	return async dispatch => {
		const articles = await arcticleService.getAll()
		dispatch ({
			type: 'INIT_ARTICLES',
			data: articles
		})
	}
}

export default articlesReducer