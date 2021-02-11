import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './reducers/articlesReducer'
import writersReducer from './reducers/writersReducer'

export default configureStore({
	reducer: {
		articles: articlesReducer,
		writers: writersReducer
	},
})
