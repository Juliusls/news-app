import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import { TextField, Accordion, makeStyles, Card, CardContent } from '@material-ui/core'
import { addComment } from '../../reducers/articlesReducer'
import { notifySuccess, notifyError } from '../../reducers/notificationReducer'
import articlesService from '../../services/articles'
import { useCookies } from 'react-cookie'
import { removeReader } from '../../reducers/loginReaderReducer'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
	text: {
		color: theme.palette.text.secondary
	},
	loginSignupText: {
		color: theme.palette.text.secondary,
		textAlign: 'center'
	},
	categoryButton: {
		marginBottom: 10,
		marginRight: 10
	},
	accordion: {
		display: 'flex',
		flexDirection: 'column',
	},
	accordionMargin: {
		marginBottom: 50
	},
	accordionLabel: {
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	rootBorder: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: theme.palette.primary.main,
		margin: 5
	},
	commentButton: {
		padding: 10,
		marginLeft: 10
	},
	inputColor:{
		color: theme.palette.text.secondary
	},
	loginSignupContainer:{
		background: theme.palette.primary.lightGrey,
		flexGrow: 1,
		padding: 10
	},
	commentForm: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexGrow: 1
	},
}))

const Comments = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [commentValue, setCommentValue] = useState('')
	const articles = useSelector(state => state.articles)
	const reader = useSelector(state => state.reader)
	const readers = useSelector(state => state.readers)
	const commentator = reader && readers.filter(readerOne => readerOne.id === reader.id)[0]
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie'])
	const history = useHistory()

	let { id } = useParams()
	const filteredArticle = articles.filter(article => article.id === id)[0]

	if (!articles) {
		return <p>Loading...</p>
	}

	const onChangeComment = event => {
		setCommentValue(event.target.value)
	}
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const newComment = { comment: commentValue }
			console.log('newComment', newComment)
			const savedComment = await articlesService.postComment(newComment, id)
			dispatch(addComment(savedComment, commentator))
			dispatch(notifySuccess(`${commentValue} added`))
			setCommentValue('')
		} catch (error) {
			console.log('error response from catch block', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				console.log('do action here with expired token')
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeReader())
				removeCookie('readerAuthCookie')
				history.push('/reader/login')
			}
		}
	}

	return (
		<div className={classes.accordionMargin}>
			<Accordion classes={{ root: classes.rootBorder }}>
				<AccordionSummary
					color="primary"
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<Typography variant='h5' className={classes.accordionLabel}>
                        Comments
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.accordion}>
					<AccordionActions>
						{reader !== null
							? (
								<form onSubmit={handleSubmit} className={classes.commentForm}>
									<TextField
										fullWidth
										label="Comment"
										value={commentValue}
										onChange={onChangeComment}
										variant="outlined"
										InputProps={{
											className: classes.inputColor
										}}
									/>
								
									<Button size="small" color="primary" variant="contained" type="submit" className={classes.commentButton}>
										Comment
									</Button>
								</form>
							) : (
								<div className={classes.loginSignupContainer}>
									<Typography variant="h6" className={classes.loginSignupText}>
										Something to say?
									</Typography>
									<Typography variant="h6" className={classes.loginSignupText}>
										<Link to='/reader/login'>Log in</Link> or <Link to='/reader/signup'>Sign up</Link>
									</Typography>
								</div>
							)
						}
					</AccordionActions>
					{filteredArticle.comments.length !== 0
						? (
							filteredArticle.comments.map(comment => 
								<Card key={comment.id} classes={{ root: classes.rootBorder }}>
									<CardContent>
										<Typography className={classes.text} style={{ fontWeight: 'bold' }}>
											{comment.commentator.userName}
										</Typography>
										<Typography className={classes.text}>
											{comment.comment}
										</Typography>
										<Typography className={classes.text} variant='caption'>
										Posted on {comment.date}
										</Typography>
									</CardContent>
								</Card>)
						)
						: (
							<Typography className={classes.text} variant='subtitle1'>No comments</Typography>
						)
					}
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default Comments

{/* <Typography key={value} variant="caption" className={classes.text}>
							{value}
</Typography> */}