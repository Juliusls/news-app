import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Container  from '@material-ui/core/Container'

import Navbar from './components/Navigation/Navbar'
import ArticlesList from './components/ArticlesList/ArticlesList'
import ArticlePage from './components/ArticlePage/ArticlePage'
import WriterPage from './components/WriterPage'
import SignUpWriter from './components/WriterSection/SignUpWriter'
import LoginReader from './components/LoginReader'
import SnackBar from './components/SnackBar'
import LoginWriter from './components/WriterSection/LoginWriter'
import SignUpReader from './components/SignUpReader'
import ReaderPage from './components/ReaderPage/ReaderPage'
import AllWriters from './components/AllWriters'
import WriterAdminPage from './components/WriterSection/WriterAdminPage'
import NewArticle from './components/WriterSection/NewArticle'

import { initArticles } from './reducers/articlesReducer'
import { initWriters, removeSubsFromWriters } from './reducers/writersReducer'
import { initReaders, removeSubsFromReaders } from './reducers/readersReducer'
import { initArticleImages } from './reducers/articleImagesReducer'
import { initWriterImages } from './reducers/writerImagesReducer'
import { initReaderImages } from './reducers/readerImagesReducer'

import subscriptionService from './services/subscriptions'
import readerRefreshServices from './services/readerRefresh'
import writerRefreshServices from './services/writerRefresh'

const App = () => {
	const dispatch = useDispatch()
	const reader = useSelector(state => state.reader)
	const writer = useSelector(state => state.writer)

	useEffect(() => {
		async function getAllArticles() {
			await dispatch(initArticles())
		}
		getAllArticles()
	})

	useEffect(() => {
		async function getAllWriters() {
			await dispatch(initWriters())
		}
		getAllWriters()
	})
	
	useEffect(() => {
		async function getAllReaders() {
			await dispatch(initReaders())
		}
		getAllReaders()
	})

	useEffect(() => {
		async function getAllImages() {
			await dispatch(initArticleImages())
		}
		getAllImages()
	})
	
	useEffect(() => {
		async function getAllImages() {
			await dispatch(initWriterImages())
		}
		getAllImages()
	})
	
	useEffect(() => {
		async function getAllImages() {
			await dispatch(initReaderImages())
		}
		getAllImages()
	})

	const getSubs = async () => {	
		const twoHours = 7200000
		const subs = await subscriptionService.getAll()	
		const currentTime = Date.now() + twoHours
		const subsToDelete = subs.filter(sub => sub.expirationDate < currentTime)	
		if (subsToDelete.length > 0) {
			const subsIds = subsToDelete.map(sub => sub.id)
			await subscriptionService.deleteMany(subsToDelete)
			dispatch(removeSubsFromWriters(subsIds))
			dispatch(removeSubsFromReaders(subsIds))
		}
	}

	const refreshReader = async () => {	
		const idForService = { id: reader.id }
		await readerRefreshServices.refreshReader(idForService)
		console.log('refreshed reader')
	}

	const refreshWriter = async () => {	
		const idForService = { id: writer.id }
		await writerRefreshServices.refreshWriter(idForService)
		console.log('refreshed writer')
	}
	
	setInterval(() => {
		getSubs()
	}, 60 * 1000)

	setInterval(() => {
		if (reader) {
			refreshReader()
		}
		if (writer) {
			refreshWriter()
		}
	}, 60 * 1000)
	

	return (
		<Router>
			<Navbar />
			<Container>
				<Switch>
					<Route exact path='/article/:id'>
						<ArticlePage />
					</Route>
					<Route exact path='/genres/:genre'>
						<ArticlesList />
					</Route>
					<Route exact path='/search/:searchResult'>
						<ArticlesList />
					</Route>
					<Route exact path='/author/:author'>
						<WriterPage />
					</Route>
					<Route exact path='/reader/login'>
						<LoginReader />
					</Route>
					<Route exact path='/reader/signup'>
						<SignUpReader />
					</Route>
					<Route exact path='/reader/profile/:id'>
						<ReaderPage />
					</Route>
					<Route exact path='/writerssection/signup'>
						<SignUpWriter />
					</Route>
					<Route exact path='/writerssection/login'>
						<LoginWriter />
					</Route>
					<Route exact path='/writerssection/profile/:id'>
						<WriterAdminPage />
					</Route>
					<Route exact path='/writerssection/newarticle'>
						<NewArticle />
					</Route>
					<Route exact path='/allwriters'>
						<AllWriters />
					</Route>
					<Route exact path='/'>
						<ArticlesList />
					</Route>
				</Switch>
			</Container>
			<SnackBar />
		</Router>
	)
}

export default App

// TODO Confirm paying for one paid article
// TODO After new writer or article is added name is not showing up