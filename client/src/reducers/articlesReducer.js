import articlesService from '../services/articles'

const articlesReducer = (state = [], action) => {
	switch(action.type) {
	case 'INIT_ARTICLES':
		return action.data
	case 'CREATE_ARTICLE':
		return [...state, action.data]
	case 'ADD_VIEW_TO_ARTICLE':
		return state.map(article => article.id === action.data ? { ...article, views: article.views + 1 } : article)
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

export const createArticle = (newArticle) => {
	return async dispatch => {
		dispatch ({
			type: 'CREATE_ARTICLE',
			data: newArticle
		})
	}
}

export const addViewToArticle = (article) => {
	return async dispatch => {
		const articleUpdated = { views: article.views + 1 }
		await articlesService.update(articleUpdated, article.id)
		dispatch ({
			type: 'ADD_VIEW_TO_ARTICLE',
			data: article.id
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