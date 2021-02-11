import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 345,
		borderRadius: 10,
		// backgroundColor: '#bdbebe',
		margin: 20,
	},
	media: {
		height: 140,
	},
	textTitle: {
		color: theme.palette.text.secondary,
		fontWeight: 'bold'
	},
	text: {
		color: theme.palette.text.secondary
	},
	cardInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	}
}))

const ArticleCard = ({ article }) => {
	const classes = useStyles()
	return (
		<Card classes={{ root: classes.rootBorder }} className={classes.root} onClick={() => console.log(article.id) }>
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/article/${article.id}`}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image="https://source.unsplash.com/random"
						title="Contemplative Reptile"
					/>
					<CardContent className={classes.cardContent}>
						<Typography className={classes.textTitle}>
							{article.title}
						</Typography>
						<div className={classes.cardInfoContainer}>
							{article.genres.map(genre => 
								<Typography key={genre} className={classes.text}>
									{genre}
								</Typography>
							)}
							<Typography className={classes.text} variant='caption'>
								{article.paid === 'yes' ? 'Paid' : 'Free'}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}

export default ArticleCard

// TODO add author to the card