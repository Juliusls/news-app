import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'


function App() {
	const dispatch = useDispatch()
	const articles = useSelector(state => state.articles)

	useEffect(() => {
		async function getAllArticles() {
			await dispatch(initArticles())
		}
		getAllArticles()
	}, [dispatch])

	return (
		<div className="App">
			<Navbar />
			<ul>
				{articles.map(article => <li key={article.id}>{article.title}</li>)}
			</ul>
		</div>
	)
}

export default App
