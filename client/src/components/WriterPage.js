/* eslint-disable no-fallthrough */
import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import ArticlesList from './ArticlesList/ArticlesList'
import { Typography, ButtonGroup, Button, Tooltip, Fade, CardContent, Card, CardActions } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import { addFavoriteWriter, removeFavoriteWriter } from '../reducers/readersReducer'
import { addReaderToFollowers, removeReaderFromFollowers } from '../reducers/writersReducer'

const useStyles = makeStyles(theme => ({
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
	subscriptionOptionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingLeft: 50
	},
	subscriptionCard: {
		margin: 5,
		minWidth: 130,
		borderRadius: 10,
		borderWidth: 1,
		border: 'solid',
		borderColor: theme.palette.primary.main
	},
	text: {
		textAlign: 'center',
		paddingTop: 50
	},
	subText: {
		textAlign: 'center'
	},
	textGenres: {
		color: 'grey'
	},
	button: {
		margin: theme.spacing(1),
	},
	cardButton: {
		display: 'flex',
		justifyContent: 'center'
	}
}))

const BigTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.primary.main,
		fontSize: 15,
	},
}))(Tooltip)

const WriterPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	// const [subscribed, setSubscribed] = useState(false)
	let { author } = useParams()
	const filteredWriter = useSelector(state => state.writers.filter(writer => writer.id === author)[0])
	const loggedInReader = useSelector(state => state.reader)
	let currentReader = loggedInReader && useSelector(state => state.readers.filter(reader => reader.id === loggedInReader.id)[0])

	if (!filteredWriter) {
		return <p>Loading...</p>
	}

	let isInFavotrites = currentReader && currentReader.favoritewriters.some(writer => writer.id === author)
	let isInSubscriptions = currentReader && currentReader.subscriptions.some(subscription => subscription.recipient.some(reciepent => reciepent.id === author))
	console.log(isInSubscriptions)

	const handleAddToFavorites = () => {
		dispatch(addFavoriteWriter(filteredWriter, currentReader))
		dispatch(addReaderToFollowers(currentReader, filteredWriter))
	}
	
	const handleRemoveFromFavorites = () => {
		dispatch(removeFavoriteWriter(filteredWriter, currentReader))
		dispatch(removeReaderFromFollowers(currentReader, filteredWriter))
	}

	const handleSubscirbe = () => {
		console.log('subsribing')
	}
	
	// const handleSubscribe = () => {
	// 	setSubscribed(!subscribed)
	// }

	const addToFavoritesButton = () => {
		switch (isInFavotrites) {
		case true:
			return (
				<Button variant="contained" color="primary" className={classes.button} endIcon={<CheckOutlinedIcon />} onClick={handleRemoveFromFavorites}>
					Added to favorites
				</Button>
			)
		case false:
			return (
				<Button variant="contained" color="primary" className={classes.button} endIcon={<AddOutlinedIcon />} onClick={handleAddToFavorites}>
					Add to favorites
				</Button>
			)
		case null:
			return (
				<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Log In to add to favorites">
					<div>
						<Button variant="contained" disabled className={classes.button} endIcon={<AddOutlinedIcon />}>
								Add to favorites
						</Button>
					</div>
				</BigTooltip>
			)
		default:
			<p>Erorr</p>
		}
	}

	const subscribeButton = () => {
		switch (isInSubscriptions) {
		case true:
			return (
				<Button size="small" color="primary" variant="contained" endIcon={<CheckOutlinedIcon />}>
					Subscribed
				</Button>
			)
		case false:
			return (
				<Button size="small" color="primary" variant="contained" endIcon={<AddOutlinedIcon />} onClick={handleSubscirbe}>
					Subscribe
				</Button>
			)
		case null:
			return (
				<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Login to subscribe">
					<div>
						<Button variant="contained" disabled endIcon={<AddOutlinedIcon />}>
							Subscribe
						</Button>
					</div>
				</BigTooltip>
			)
		default:
			<p>Erorr</p>
		}
	}

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
						{filteredWriter.writerDescription}
					</Typography>
					{filteredWriter.writerGenres.map(genre => 
						<Typography key={genre} className={classes.textGenres} clasvariant='caption'>{genre}</Typography>
					)}					
					<ButtonGroup color="primary" aria-label="outlined primary button group">
						{addToFavoritesButton()}
					</ButtonGroup>
				</div>
				<div className={classes.subscriptionOptionsContainer}>
					<Card className={classes.subscriptionCard} variant="outlined">
						<CardContent>
							<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Article
							</Typography>
							<Typography variant="h5" color="textSecondary" className={classes.subText}>
								1 €
							</Typography>
						</CardContent>
					</Card>
					<Card className={classes.subscriptionCard} variant="outlined">
						<CardContent>
							<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Month
							</Typography>
							<Typography variant="h5" color="textSecondary" className={classes.subText}>
								10 €
							</Typography>
						</CardContent>
						<CardActions className={classes.cardButton}>
							{subscribeButton('montly')}
						</CardActions>
					</Card>
					<Card className={classes.subscriptionCard} variant="outlined">
						<CardContent>
							<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Year
							</Typography>
							<Typography variant="h5" color="textSecondary" className={classes.subText}>
								100 €
							</Typography>
						</CardContent>
						<CardActions className={classes.cardButton}>
							{subscribeButton('yearly')}
						</CardActions>
					</Card>
				</div>
			</div>
			<Typography variant='h5' color="primary" className={classes.text}>
				Articles
			</Typography>
			<ArticlesList />
		</div>
	)
}

export default WriterPage


// TODO fix multiple genres not in one line