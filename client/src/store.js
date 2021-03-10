import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './reducers/articlesReducer'
import writersReducer from './reducers/writersReducer'
import loginWriterReducer from './reducers/loginWriterReducer'
import loginReaderReducer from './reducers/loginReaderReducer'
import readersReducer from './reducers/readersReducer'
import notificationReducer from './reducers/notificationReducer'
import artcileImagesReducer from './reducers/articleImagesReducer'
import thunk from 'redux-thunk'
import { combineReducers } from 'redux' 
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const reducers = combineReducers({
	articles: articlesReducer,
	writer: loginWriterReducer,
	writers: writersReducer,
	reader: loginReaderReducer,
	readers: readersReducer,
	notification: notificationReducer,
	articleImages: artcileImagesReducer
})

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers)


export default configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
})
