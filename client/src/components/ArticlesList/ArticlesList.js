import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import ArticleCard from './ArticleCard'
import { useParams } from 'react-router-dom'


const useStyles = makeStyles({
	text: {
		textAlign: 'center',
	},
	textWithPadding: {
		textAlign: 'center',
		paddingBottom: 20
	}
})

const ArticlesList = () => {
	const articles = useSelector(state => state.articles)
	const classes = useStyles()
	const { genre } = useParams()
	const { searchResult } = useParams()
	let { author } = useParams()
	let articlesFiltered = articles
	let allength = null

	if (!articles) {
		return <p>No data</p>
	}


	if (genre) {
		articlesFiltered = articles.filter(article => article.genres.includes(genre))
	}
    
	if (searchResult) {
		articlesFiltered = articles.filter(article => article.title.toLowerCase().includes(searchResult.toLowerCase()))
		allength = articlesFiltered.length
	}

	if (author) {
		articlesFiltered = articles.filter(article => article.author.id === author)
	}

	return (
		<div>
			<Typography className={classes.textWithPadding} variant='h3' style={{ display: genre === undefined ? 'none' : 'block' }}>
				{genre}
			</Typography>
			<div style={{ display: searchResult === undefined ? 'none' : 'block' }}>
				<Typography className={classes.text} variant='h3' >
                    Results: {searchResult}
				</Typography>
				<Typography className={classes.textWithPadding} variant='subtitle2' >
                    Results found: {allength}
				</Typography>
			</div>
			<Grid
				container
				justify="center"
			>
				{articlesFiltered.map(article =>
					<ArticleCard key={article.id} article={article} />
				)}
			</Grid>
		</div>
	)
}

export default ArticlesList