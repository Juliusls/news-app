import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { initArticles } from './reducers/articlesReducer'
import Grid from '@material-ui/core/Grid'
import Container  from '@material-ui/core/Container'
import ArticleCard from './components/ArticleCard'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
	container: {
		maxWidth: 'lg'
	}
})

function App() {
	const classes = useStyles()
	const dispatch = useDispatch()
	const articles = useSelector(state => state.articles)

	useEffect(() => {
		async function getAllArticles() {
			await dispatch(initArticles())
		}
		getAllArticles()
	}, [dispatch])

	return (
		<div>
			<Navbar />
			<Container classes={{ maxWidth: classes.container }} >
				<Grid 
					container
					justify="center"
				>
					{articles.map(article => <ArticleCard key={article.id} article={article}/> )}
				</Grid>
			</Container>
		</div>
	)
}

export default App


// {articles.map(article => <Article key={article.id} article={article}/> )}
