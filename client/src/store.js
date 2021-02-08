import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './reducers/articlesReducer'

export default configureStore({
	reducer: {
		articles: articlesReducer,
	},
})
