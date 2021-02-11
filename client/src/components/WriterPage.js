import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ArticlesList from './ArticlesList'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	profileContaner: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingLeft: 10
	},
	text: {
		textAlign: 'center',
		paddingTop: 50
	},
	textGenres: {
		color: 'grey'
	}
})

const WriterPage = () => {
	const classes = useStyles()
	let { id } = useParams()
	const writers = useSelector(state => state.writers)
	const articles = useSelector(state => state.articles)
	const filteredWriter = writers.filter(writer => writer.id === id)[0]
	const filteredArticles = articles.filter(article => article.author.id === id)

	return (
		<div>
			<div className={classes.profileContaner}>
				<img
					src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80'
					width="200"
					height="150"
				/>
				<div className={classes.infoContainer}>
					<Typography variant='h4'>
						{filteredWriter.firstName} {filteredWriter.lastName}
					</Typography>
					<Typography>
						Description that will be programmed later
					</Typography>
					{filteredWriter.writerGenres.map(genre => 
						<Typography key={genre} className={classes.textGenres} clasvariant='caption'>{genre}</Typography>
					)}
				</div>
			</div>
			<Typography variant='h5' className={classes.text}>
				My Articles
			</Typography>
			<ArticlesList articles={filteredArticles} />
		</div>
	)
}

export default WriterPage


// TODO add writer description to modal