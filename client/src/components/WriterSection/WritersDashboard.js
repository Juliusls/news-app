import React, {  } from 'react'
import { makeStyles, Grid, Card, Typography, CardContent, CardActionArea } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		paddingTop: 20
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	titleText: {
		color: theme.palette.text.grey,
	},
	infoText: {
		color: theme.palette.text.secondary
	},
	card: {
		backgroundColor: theme.palette.primary.lightGrey,
		minHeight: 105
	},
	actionArea: {
		'&:hover $focusHighlight': {
			opacity: 0.5
		}
	},
	focusHighlight: {
	}
}))

const WritersDashboard = ({ writer, setComponentToOpen }) => {
	const classes = useStyles()

	const totalViews = writer.myarticles.map(article => article.views).reduce((accumulator, currentValue) => accumulator + currentValue, 0)

	return (
		<div className={classes.root}>
			<Grid container spacing={2} >
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea onClick={() => setComponentToOpen('articles')} classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>
							<CardContent>
								<Typography className={classes.titleText} gutterBottom>
									My Articles
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{writer.myarticles.length}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea onClick={() => setComponentToOpen('subscribers')} classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>
							<CardContent>
								<Typography className={classes.titleText} gutterBottom>
									Subscribers
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{writer.subscribers.length}
								</Typography>
							</CardContent>
						</CardActionArea>

					</Card>
				</Grid>
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea onClick={() => setComponentToOpen('followers')} classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>

							<CardContent>
								<Typography className={classes.titleText} gutterBottom>
									Followers
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{writer.followers.length}
								</Typography>
							</CardContent>
						</CardActionArea>

					</Card>
				</Grid>
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea onClick={() => setComponentToOpen('prices')} classes={{ root: classes.actionArea, focusHighlight: classes.focusHighlight }}>
							<CardContent>
								<Typography className={classes.titleText} gutterBottom variant='body2'>
									My prices, €
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{writer.oneArticlePrice || 0}, {writer.montlySubscriptionPrice || 0}, {writer.yearlySubscriptionPrice || 0}
								</Typography>
							</CardContent>
						</CardActionArea>

					</Card>
				</Grid>
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea>
							<CardContent>
								<Typography className={classes.titleText} gutterBottom>
									Total Views
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{totalViews}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>				
				</Grid>
				<Grid item xs={2}>
					<Card variant="outlined" className={classes.card}>
						<CardActionArea>
							<CardContent>
								<Typography className={classes.titleText} gutterBottom>
									Earnings, €
								</Typography>
								<Typography className={classes.infoText} variant='h4'>
									{writer.earnings ? writer.earnings : 0}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}

export default WritersDashboard
