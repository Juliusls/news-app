import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { makeStyles, Typography, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

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
	},
	coverPhoto: {
		height: 200
	}
})

const ArticlePage = () => {
	const classes = useStyles()
	let { id } = useParams()
	const articles = useSelector(state => state.articles)
	const images = useSelector(state => state.articleImages)

	const filteredImage = images && images.length !== 0 && images.filter(img => img.article === id)[0].img.data.data
	var base64 = btoa(new Uint8Array(filteredImage).reduce((data, byte) => data + String.fromCharCode(byte), ''))

	if (!articles) {
		return <p>Loading...</p>
	}

	const filteredArticle = articles.filter(article => article.id === id)[0]

	return (
		<div>
			<div className={classes.articleDiv}>
				{images.length === 0 
					? <Skeleton variant="rect" width={1232} height={200} animation="wave"/>
					: <img
						style={{ width: '100%', height: 200, borderRadius: 5, objectFit: 'cover' }}
						fullWidth
						// imageStyle={{ height: 300 }}
						src={`data:image/jpeg;base64,${base64}`}
					/>
				}
				
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
				{filteredArticle.content.map((content, index) => 
					<div key={index} >
						<Typography >
							{content}
						</Typography>
						<br />
					</div>
				)}
			</div>
			<Comments />
		</div>
	)
}

export default ArticlePage