import articlesService from '../services/articles'


const articlesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_ARTICLES':
		return action.data
	case 'ADD_COMMENT': {
		return state.map(article => {
			if (article.id === action.data.article) {
				return { ...article, comments: article.comments.concat(action.data) }
			}
			return article
		})
	}
		
	default:
		return state
	}
}

export const initArticles = () => {
	return async dispatch => {
		const articles = await articlesService.getAll()
		dispatch ({
			type: 'INIT_ARTICLES',
			data: articles
		})
	}
}

export const addComment = (newComment, id, commentator) => {
	return async dispatch => {
		const savedComment = await articlesService.postComment(newComment, id)
		const commentForDispatch = { ...savedComment, commentator: commentator }
		dispatch ({
			type: 'ADD_COMMENT',
			data: commentForDispatch
		})
	}
}


export default articlesReducer