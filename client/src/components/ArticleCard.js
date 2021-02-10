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
		backgroundColor: '#bdbebe',
		margin: 20
	},
	media: {
		height: 140,
	},
	text: {
		color: theme.palette.text.secondary,
		fontWeight: 'bold'
	}
}))

const ArticleCard = ({ article }) => {
	const classes = useStyles()
	return (
		<Card className={classes.root} onClick={() => console.log(article.id) }>
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/article/${article.id}`}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image="https://i.picsum.photos/id/10/300/300.jpg?hmac=-HNJRisuHIZRc8PHpxFmPyT6yP7T3SZ6puHalS_MgqQ"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography className={classes.text}>
							{article.title}
						</Typography>
						{article.genres.map(genre => 
							<Typography key={genre}>
								{genre}
							</Typography>
						)}
					</CardContent>
				</CardActionArea>
			</Link>
		</Card>
	)
}

export default ArticleCard

