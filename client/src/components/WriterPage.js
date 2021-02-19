import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import ArticlesList from './ArticlesList/ArticlesList'
import { Typography, ButtonGroup, Button } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'
import { addFavoriteWriter } from '../reducers/readersReducer'
// import { addReaderToFollowers } from '../reducers/writersReducer'

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
	text: {
		textAlign: 'center',
		paddingTop: 50
	},
	textGenres: {
		color: 'grey'
	},
	button: {
		margin: theme.spacing(1),
	},
}))

const WriterPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	// const [subscribed, setSubscribed] = useState(false)
	let { author } = useParams()
	const filteredWriter = useSelector(state => state.writers.filter(writer => writer.id === author)[0])
	const loggedInReader = useSelector(state => state.reader)
	const currentReader = useSelector(state => state.readers.filter(reader => reader.id === loggedInReader.id)[0])

	const isInFavotrites = currentReader.favoritewriters.some(writer => writer.id === author)

	const handleAddToFavorites = () => {
		dispatch(addFavoriteWriter(filteredWriter, currentReader))
		// dispatch(addReaderToFollowers(currentReader, filteredWriter))
	}
	
	const handleRemoveFromFavorites = () => {
		console.log('remove')
	}
	
	// const handleSubscribe = () => {
	// 	setSubscribed(!subscribed)
	// }

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
						{isInFavotrites 
							?
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								endIcon={<CheckOutlinedIcon />}
								onClick={handleRemoveFromFavorites}
							>
								Added to favorites
							</Button>
							: 
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								endIcon={<AddOutlinedIcon />}
								onClick={handleAddToFavorites}
							>
								Add to favorites
							</Button>
						}
						
						{/* <Button
							variant="contained"
							color="primary"
							className={classes.button}
							endIcon={subscribed ? <CheckOutlinedIcon /> : <AddOutlinedIcon />}
							onClick={handleSubscribe}

						>
							{subscribed ? 'Subscribed' : 'Subscribe' }
						</Button> */}
					</ButtonGroup>
				</div>
			</div>
			<Typography variant='h5' className={classes.text}>
				My Articles
			</Typography>
			<ArticlesList />
		</div>
	)
}

export default WriterPage


// TODO fix multiple genres not in one line