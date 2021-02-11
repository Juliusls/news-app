import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
	infoText: {
		color: '#6A6A6A'
	},
	categoryButton: {
		marginBottom: 10,
		marginRight: 10
	}
})

const ArticlePage = () => {
	const classes = useStyles()
	let { id } = useParams()
	const articles = useSelector(state => state.articles)

	const filteredArticle = articles.filter(article => article.id === id)[0]

	return (
		<div>
			<div className={classes.categoryButton}>
				{filteredArticle.genres.map(genre => 
					<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${genre.toLowerCase()}`} key={genre}><Button marginottom='50' size='small' variant="outlined" color="primary">{genre}</Button></Link>
				)}
			</div>
			<Typography variant='h4' className={classes.title}>
				{filteredArticle.title}
			</Typography>
			<br/>
			<Typography variant="subtitle1" className={classes.infoText}>
				By <Link to={`/authors/${filteredArticle.author.id}`}>{filteredArticle.author.firstName} {filteredArticle.author.lastName}</Link> | {filteredArticle.published}
			</Typography>
			<br/>
			<Typography>
				{filteredArticle.content}
			</Typography>
		</div>
	)
}

export default ArticlePage

// TODO: Link author name to authors page

// TODO: Fix article not working on refresh

// TODO: Create db model so that article can have multiple paragrahs and map them in this component
// {filteredArticle.content.map(content => 
// 	<Typography key={content.id} >
// 		{content}
// 	</Typography>
// )}
