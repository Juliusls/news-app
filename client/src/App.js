import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import { initWriters } from './reducers/writersReducer'
import Container  from '@material-ui/core/Container'
import ArticlesList from './components/ArticlesList'
import ArticlePage from './components/ArticlePage'
import WriterPage from './components/WriterPage'
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom'

const App = () => {
	const { genre } = useParams()
	const dispatch = useDispatch()
	const [filterValue, setFilerValue] = useState('all')
	const articles = useSelector(state => state.articles)

	console.log('filterValue', filterValue)
	console.log('genre', genre)

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
			<Navbar setFilerValue={setFilerValue} />
			<Container>
				<Switch>
					<Route path='/article/:id'>
						<ArticlePage />
					</Route>
					<Route path='/:genre'>
						Hello
					</Route>
					<Route path='/authors/:id'>
						<WriterPage />
					</Route>
					<Route path='/'>
						<ArticlesList articles={articles} />
					</Route>
				</Switch>
			</Container>
		</Router>
	)
}

export default App

// TODO add categories to router