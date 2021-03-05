/* eslint-disable no-fallthrough */
import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import ArticlesList from './ArticlesList/ArticlesList'
import SubscriptionPlans from './SubscriptionPlans'
import { Typography, ButtonGroup, Button, Tooltip, Fade, Card, CardContent, List } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import { addFavoriteWriter, removeFavoriteWriter, substractReaderFunds, initReaders } from '../reducers/readersReducer'
import { addReaderToFollowers, removeReaderFromFollowers, addEarningsToWriter, initWriters } from '../reducers/writersReducer'
import readersService from '../services/readers'
import { notifySuccess, notifyError } from '../reducers/notificationReducer'
import { removeReader } from '../reducers/loginReaderReducer'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

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
	subscribedCard: {
		margin: 5,
		minWidth: 390,
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
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	genresList: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	textGenres: {
		color: 'grey',
		flex: 0,
		paddingRight: 10
	},
	button: {
		margin: theme.spacing(1),
	},
	disabledButton: {
		margin: theme.spacing(1),
		backgroundColor: '#E5E5E5',
		color: '#CCCCCC',
		boxShadow: 'none'
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
	let { author } = useParams()
	const loggedInReader = useSelector(state => state.reader)
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie'])
	const history = useHistory()


	const filteredWriter = useSelector(state => state.writers.filter(writer => writer.id === author)[0])
	const currentReader = loggedInReader && useSelector(state => state.readers.filter(reader => reader.id === loggedInReader.id)[0])

	if (!filteredWriter) {
		return <p>Loading...</p>
	}
	const isInFavotrites = currentReader && currentReader.favoritewriters.some(writer => writer.id === author)

	const writersSubs = filteredWriter.subscribers.map(subscriber => subscriber)
	const readersSubs = (currentReader && currentReader.subscriptions.length !== 0) && currentReader.subscriptions.map(subscription => subscription)


	const matchingSub = (currentReader && currentReader.subscriptions.length !== 0) && writersSubs.filter(suber => readersSubs.some(sub => sub.id === suber.id))[0]
		
	const handleAddToFavorites = async () => {
		try {
			await dispatch(addFavoriteWriter(filteredWriter, currentReader))
			await dispatch(addReaderToFollowers(currentReader, filteredWriter))
			dispatch(notifySuccess(`${filteredWriter.firstName} ${filteredWriter.lastName} added to favorites`))
		} catch (error) {
			console.log('error response', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				console.log('add to favorite error')
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeReader())
				removeCookie('readerAuthCookie', { path: '/' })
				history.push('/reader/login')
			} else {
				dispatch(notifyError('An error occurred. Please try again'))
			}
		}
	}
	
	const handleRemoveFromFavorites = async () => {
		try {
			await dispatch(removeFavoriteWriter(filteredWriter, currentReader))
			await dispatch(removeReaderFromFollowers(currentReader, filteredWriter))
			dispatch(notifySuccess(`${filteredWriter.firstName} ${filteredWriter.lastName} removed from favorites`))
		} catch (error) {
			console.log('error response', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeReader())
				removeCookie('readerAuthCookie', { path: '/' })
				history.push('/reader/login')
			} else {
				dispatch(notifyError('An error occurred. Please try again'))
			}
		}
	}

	const handleSubscirbe = async (value) => {
		if (currentReader.funds < filteredWriter[value]) {
			window.alert('Not enought funds')
		} else if (window.confirm('Confirm Subscription')) {
			try {
				await dispatch(addEarningsToWriter(filteredWriter[value], filteredWriter))
				await dispatch(substractReaderFunds(filteredWriter[value], currentReader))
				let typeForSub = value === 'montlySubscriptionPrice' ? 'montly' : 'yearly'
				const newSubscription = { type: typeForSub, writerId: filteredWriter.id }
				await readersService.createSubscribtion(newSubscription, currentReader.id)
				await dispatch(initReaders())
				await dispatch(initWriters())
				dispatch(notifySuccess(`Subsribed ${typeForSub} to ${filteredWriter.firstName} ${filteredWriter.lastName}`))
			} catch (error) {
				console.log('error response', error.response)
				if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
					dispatch(notifyError('You session has expired. Please login again'))
					dispatch(removeReader())
					removeCookie('readerAuthCookie', { path: '/' })
					history.push('/reader/login')
				} else {
					dispatch(notifyError('An error occurred. Please try again'))
				}
			}
		}
	}


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
				<div>
					<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Login to add to favorites">
						<Button variant="contained" endIcon={<AddOutlinedIcon />}>
							Add to favorites
						</Button>
					</BigTooltip>
				</div>
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
					<List className={classes.genresList}>
						{filteredWriter.writerGenres.map(genre => 
							<Typography key={genre} className={classes.textGenres} variant='caption'>
								{genre}
							</Typography>
						)}	
					</List>				
					<ButtonGroup color="primary" aria-label="outlined primary button group">
						{addToFavoritesButton()}
					</ButtonGroup>
				</div>
			</div>
			<div>
				{matchingSub !== false && matchingSub !== null && matchingSub !== undefined
					? (
						<Card className={classes.subscribedCard} variant="outlined">
							<CardContent>
								<Typography color="textSecondary" gutterBottom className={classes.subText}>
										Subscribed
								</Typography>
								<Typography color="textSecondary" gutterBottom className={classes.subText}>
										Type: {matchingSub.type}
								</Typography>
								<Typography color="textSecondary" gutterBottom className={classes.subText}>
										Period: {matchingSub.startDate.slice(0, -6)} - {matchingSub.endDate.slice(0, -6)}
								</Typography>
							</CardContent>
						</Card>
					)
					: <SubscriptionPlans handleSubscirbe={handleSubscirbe} filteredWriter={filteredWriter} matchingSub={matchingSub} />
				}
			</div>
			<Typography variant='h4' color="primary" className={classes.text}>
				Articles
			</Typography>
			<ArticlesList />
		</div>
	)
}

export default WriterPage