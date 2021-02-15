import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import { initWriters } from './reducers/writersReducer'
import Container  from '@material-ui/core/Container'
import ArticlesList from './components/ArticlesList'
import ArticlePage from './components/ArticlePage'
import WriterPage from './components/WriterPage'
import Comments from './components/Comments'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginReader from './components/LoginReader'

const App = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		async function getAllArticles() {
			await dispatch(initArticles())
		}
		getAllArticles()
	}, [])

	useEffect(() => {
		async function getAllWriters() {
			await dispatch(initWriters())
		}
		getAllWriters()
	}, [])

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
					<Route exact path='/comments'>
						<Comments />
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


// TODO Check ArticlePage
// TODO Ability to search also by text content
// TODO All writers component
// TODO Add fields to side menu: Writers, Become a writer, Login as writer
// TODO Fix all todo
// TODO Add new data with description and add it to writer page
// TODO Fix project theme https://bareynol.github.io/mui-theme-creator/