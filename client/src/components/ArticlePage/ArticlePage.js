import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Comments from './Comments'

const useStyles = makeStyles({
	infoText: {
		color: '#6A6A6A'
	},
	categoryButton: {
		marginBottom: 10,
		marginRight: 10
	},
	articleDiv: {
		marginBottom: 100
	}
})

const ArticlePage = ({ setArticlesFetchInProgress }) => {
	const classes = useStyles()
	let { id } = useParams()
	const articles = useSelector(state => state.articles)

	const filteredArticle = articles.filter(article => article.id === id)[0]

	return (
		<div>
			<div className={classes.articleDiv}>
				<div className={classes.categoryButton}>
					{filteredArticle.genres.map(genre => 
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/genres/${genre}`} key={genre}><Button marginottom='50' size='small' variant="outlined" color="primary">{genre}</Button></Link>
					)}
				</div>
				<Typography variant='h4'>
					{filteredArticle.title}
				</Typography>
				<br/>
				<Typography variant="subtitle1" className={classes.infoText}>
					By <Link to={`/author/${filteredArticle.author.id}`}>{filteredArticle.author.firstName} {filteredArticle.author.lastName}</Link> | {filteredArticle.published}
				</Typography>
				<br/>
				{filteredArticle.content.map(content => 
					<div key={content.id} >
						<Typography >
							{content}
						</Typography>
						<br />
					</div>
				)}
			</div>
			<Comments setArticlesFetchInProgress={setArticlesFetchInProgress} />
		</div>
	)
}

export default ArticlePage