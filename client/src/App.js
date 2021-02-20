import React, { useEffect } from 'react'
import Navbar from './components/Navigation/Navbar'
import { useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import { initWriters } from './reducers/writersReducer'
import Container  from '@material-ui/core/Container'
import ArticlesList from './components/ArticlesList/ArticlesList'
import ArticlePage from './components/ArticlePage/ArticlePage'
import WriterPage from './components/WriterPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginReader from './components/LoginReader'
import SignUpReader from './components/SignUpReader'
import { initReaders } from './reducers/readersReducer'
import ReaderPage from './components/ReaderPage/ReaderPage'

const App = () => {
	const dispatch = useDispatch()
	// const [articlesFetchInProgress, setArticlesFetchInProgress] = useState(true)
	// const [readersFetchInProgress, setReadersFetchInProgress] = useState(true)

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
					<Route exact path='/'>
						<ArticlesList />
					</Route>
				</Switch>
			</Container>
		</Router>
	)
}

export default App

// TODO add new data

// TODO show my favorites for only logged in users
// TODO Ability to search also by text content
// TODO All writers component
// TODO Token lifetime
// TODO Add fields to side menu: Writers, Become a writer, Login as writer
// TODO Fix project theme https://bareynol.github.io/mui-theme-creator/