import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { makeStyles, Grid, Typography } from '@material-ui/core'

import ArticleCard from './ArticleCard'
import ArticlesFilter from './ArticlesFilter'

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
	const classes = useStyles()
	const [filterValue, setFilterValue] = useState('all')
	const { genre } = useParams()
	const { searchResult } = useParams()
	let { author } = useParams()
	const articles = useSelector(state => state.articles)
	const loggedInReader = useSelector(state => state.reader)
	const readersList = useSelector(state => state.readers)
	const oneReader = loggedInReader && readersList.filter(readerFromList => readerFromList.id === loggedInReader.id)[0]
	const readerFavorites = loggedInReader && oneReader.favoritewriters.map(favoritewriter => favoritewriter.id)
	const readerSubscriptions = loggedInReader && oneReader.subscriptions.map(subscription => subscription.recipient[0].id)

	let articlesFiltered = articles
	let allength = null

	if (!articles) {
		return <p>Loading...</p>
	}

	if (genre === 'My Favorites') {
		articlesFiltered = articles.filter(article => readerFavorites.includes(article.author.id))
	} else if (genre === 'My Subscriptions') {
		articlesFiltered = articles.filter(article => readerSubscriptions.includes(article.author.id))
	} else if (genre !== undefined) {
		articlesFiltered = articles.filter(article => article.genres.includes(genre))
	}
    
	if (searchResult) {
		articlesFiltered = articles.filter(article => article.title.toLowerCase().includes(searchResult.toLowerCase()))
		allength = articlesFiltered.length
	}

	if (author) {
		articlesFiltered = articles.filter(article => article.author.id === author)
	}

	let articlesForList = articlesFiltered

	switch (filterValue) {
	case 'all':
		articlesForList
		break
	case 'free':
		articlesForList = articlesFiltered.filter(article => article.paid === 'no')
		break
	case 'paid':
		articlesForList = articlesFiltered.filter(article => article.paid === 'yes')
		break
	default:
		articlesForList
	}

	return (
		<div>
			<ArticlesFilter setFilterValue={setFilterValue} />
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
				{articlesForList.map(article =>
					<ArticleCard key={article.id} article={article}/>
				)}
			</Grid>
		</div>
	)
}

export default ArticlesList