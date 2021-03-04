import React, { useEffect } from 'react'
import Navbar from './components/Navigation/Navbar'
import { useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import { initWriters } from './reducers/writersReducer'
import Container  from '@material-ui/core/Container'
import ArticlesList from './components/ArticlesList/ArticlesList'
import ArticlePage from './components/ArticlePage/ArticlePage'
import WriterPage from './components/WriterPage'
import SignUpWriter from './components/WriterSection/SignUpWriter'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginReader from './components/LoginReader'
import SnackBar from './components/SnackBar'
import LoginWriter from './components/WriterSection/LoginWriter'
import SignUpReader from './components/SignUpReader'
import { initReaders } from './reducers/readersReducer'
import ReaderPage from './components/ReaderPage/ReaderPage'
import AllWriters from './components/AllWriters'
import WriterAdminPage from './components/WriterSection/WriterAdminPage'
import NewArticle from './components/WriterSection/NewArticle'
import { useCookies } from 'react-cookie'

const App = () => {
	const dispatch = useDispatch()
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie', 'writerAuthCookie'])

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


// TODO funcionality for paying for individual articles

// TODO Expiration time for login reader and writer tokens

// TODO Expiration time for subscription

// TODO date value trough entire project
// TODO Edit article functionality
// TODO Fix project theme https://bareynol.github.io/mui-theme-creator/