import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addViewToArticle } from '../../reducers/articlesReducer'
import { useSelector } from 'react-redux'
import { notifyError } from '../../reducers/notificationReducer'
import { substractReaderFunds } from '../../reducers/readersReducer'
import { addEarningsToWriter } from '../../reducers/writersReducer'
import DialogBoxToLogin from './DialogBoxToLogIn'
import DialogBoxToAddFunds from './DialogBoxToAddFunds'
// import DialogBoxToPay from './DialogBoxToPay'

const useStyles = makeStyles(theme => ({
	root: {
		width:380,
		borderRadius: 5,
		margin: 5,
	},
	media: {
		height: 140,
	},
	textTitle: {
		color: theme.palette.text.secondary,
		fontWeight: 'bold'
	},
	textauthor: {
		color: theme.palette.text.secondary
	},
	text: {
		color: '#6A6A6A',
		paddingRight: 10
	},
	cardInfoContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 10
	},
	cardInfoCategories: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	}
}))

const ArticleCard = ({ article }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const reader = useSelector(state => state.reader)
	const readers = useSelector(state => state.readers)
	const images = useSelector(state => state.articleImages)
	const loggedInReader = reader && readers.filter(readerOne => readerOne.id === reader.id)[0]
	const [openLoginDialog, setOpenLoginDialog] = useState(false)
	const [openAddFundsDialog, setOpenAddFundsDialog] = useState(false)

	const filteredImage = images && images.filter(img => img.article === article.id)[0].img.data.data
	var base64 = btoa(new Uint8Array(filteredImage).reduce((data, byte) => data + String.fromCharCode(byte), ''))

	if (!article) {
		return <p>Loading...</p>
	}

	const handleCardPress = async (article) => {
		if (article.paid === 'yes') {
			if (!loggedInReader) {
				setOpenLoginDialog(true)
			} else {
				if (loggedInReader.subscriptions.some(subscription => subscription.recipient[0].id === article.author.id)) {
					dispatch(addViewToArticle(article))
					history.push(`/article/${article.id}`)
				} else {
					if (loggedInReader.funds < article.author.oneArticlePrice) {
						setOpenAddFundsDialog(true)
					} else if (window.confirm(`Confirm payment for this article for ${article.author.oneArticlePrice} €`)) {
						try {
							await dispatch(substractReaderFunds(article.author.oneArticlePrice, loggedInReader))
							await dispatch(addEarningsToWriter(article.author.oneArticlePrice, article.author))
							dispatch(addViewToArticle(article))
							history.push(`/article/${article.id}`)
						} catch (error) {
							dispatch(notifyError('An error occurred. Please try again'))
						}
					}
				}
			}
		} else {
			dispatch(addViewToArticle(article))
			history.push(`/article/${article.id}`)
		}
	}

	const classes = useStyles()
	return (
		<Card className={classes.root} >
			<Link style={{ textDecoration: 'none', color: 'inherit' }} to="#" onClick={() => handleCardPress(article)}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={`data:image/jpeg;base64,${base64}`}
						// image="https://source.unsplash.com/random"					// src={`data:${images[0].img.contentType};base64,${images[0].img.data}`}
						title="Contemplative Reptile"
					/>
					<CardContent className={classes.cardContent}>
						<Typography className={classes.textTitle}>
							{article.title}
						</Typography>
						<Typography className={classes.textauthor}>
							By {article.author.firstName} {article.author.lastName}
						</Typography>
						<div className={classes.cardInfoContainer}>
							<div className={classes.cardInfoCategories}>
								{article.genres.map(genre => 
									<Typography key={genre} className={classes.text}>
										{genre}
									</Typography>
								)}
							</div>
							<Typography className={classes.text} variant='caption'>
								{article.paid === 'yes' ? 'Paid' : 'Free'}
							</Typography>
						</div>
					</CardContent>
				</CardActionArea>
			</Link>
			<DialogBoxToLogin openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} />
			{/* <DialogBoxToPay openPayDialog={openPayDialog} setOpenPayDialog={setOpenPayDialog} price={article.author.oneArticlePrice} onConfirm={handlePaymentSubmit}/> */}
			{loggedInReader && <DialogBoxToAddFunds openAddFundsDialog={openAddFundsDialog} setOpenAddFundsDialog={setOpenAddFundsDialog} loggedInReader={loggedInReader} price={article.author.oneArticlePrice} />}
		</Card>
	)
}

export default ArticleCard