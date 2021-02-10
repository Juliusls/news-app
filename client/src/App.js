import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import Container  from '@material-ui/core/Container'
import ArticlesList from './components/ArticlesList'
import ArticlePage from './components/ArticlePage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const App = () => {
	const dispatch = useDispatch()
	const [filterValue, setFilerValue] = useState('all')
	const articles = useSelector(state => state.articles)

	console.log('filterValue', filterValue)

	useEffect(() => {
		async function getAllArticles() {
			await dispatch(initArticles())
		}
		getAllArticles()
	}, [dispatch])

	return (
		<Router>
			<Navbar setFilerValue={setFilerValue} />
			<Container>
				<Switch>
					<Route path="/article/:id">
						<ArticlePage />
					</Route>
					<Route path="/">
						<ArticlesList articles={articles} />
					</Route>
				</Switch>
			</Container>
		</Router>
	)
}

export default App