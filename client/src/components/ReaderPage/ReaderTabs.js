import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'


import { AppBar, Tabs, Tab, Typography, Box, ListItem, ListItemText, List, makeStyles, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import { removeFavoriteWriter } from '../../reducers/readersReducer'
import { removeReaderFromFollowers } from '../../reducers/writersReducer'
import { removeReader } from '../../reducers/loginReaderReducer'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'

 
const useStyles = makeStyles(theme => ({
	text: {
		color: theme.palette.text.secondary,
		textTransform: 'uppercase'
	},
	root: {
		color: theme.palette.text.blueish,
		textDecoration: 'underline'
	},
	listItem: {
		borderColor: theme.palette.primary.main,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		marginBottom: 10
	}
}))

const TabPanel = (props) => {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component="span">{children}</Typography>
				</Box>
			)}
		</div>
	)
}

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const ListItemLink = (props) => {
	return <ListItem button component="a" {...props}/>
}

const ReaderTabs = ({ reader }) => {
	const [value, setValue] = useState(0)
	const classes = useStyles()
	const dispatch = useDispatch()
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie'])
	const history = useHistory()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleRemove = async (favoriteWriter) => {
		try {
			await dispatch(removeFavoriteWriter(favoriteWriter, reader))
			await dispatch(removeReaderFromFollowers(reader, favoriteWriter))
			dispatch(notifySuccess(`${favoriteWriter.firstName} ${favoriteWriter.lastName} removed from favorites`))
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

	return (
		<div>
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
					<Tab label="Favorite writers" {...a11yProps(0)} />
					<Tab label="Subscribtions" {...a11yProps(1)} />
					<Tab label="Comments" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				{reader.favoritewriters.length !== 0 
					? 
					(<List component="div">
						{reader.favoritewriters.map(favoriteWriter =>
							<ListItem key={favoriteWriter.id} className={classes.listItem}>
								<ListItemLink component={ Link } to={`/author/${favoriteWriter.id}`} >
									<ListItemText primary={`${favoriteWriter.firstName} ${favoriteWriter.lastName}`} classes={{ root: classes.root }} />
								</ListItemLink>
								<Button
									variant="contained"
									color="secondary"
									className={classes.button}
									startIcon={<DeleteIcon />}
									onClick={() => handleRemove(favoriteWriter)}
								>
									Remove
								</Button>
							</ListItem>
						)}
					</List>)
					: (<Typography className={classes.text} variant='subtitle1'>No favorited writers</Typography>)
				}
			</TabPanel>
			<TabPanel value={value} index={1}>
				{reader.subscriptions.length !== 0 
					? 
					(<List component="div">
						{reader.subscriptions.map(subscription => 
							<ListItem button key={subscription.id} className={classes.listItem}>
								<ListItemLink component={ Link } to={`/author/${subscription.recipient[0].id}`} >
									<ListItemText primary={`${subscription.recipient[0].firstName} ${subscription.recipient[0].lastName}`} classes={{ root: classes.root }} />
									<Typography className={classes.text} style={{ paddingRight: 30 }}  variant='subtitle1'>{`type: ${subscription.type}`}</Typography>
									<Typography className={classes.text} variant='subtitle1'>{`Duration: ${subscription.startDate.slice(0, -5)} - ${subscription.endDate.slice(0, -5)}`}</Typography>
								</ListItemLink>
							</ListItem>
						)}
					</List>) 
					: (<Typography className={classes.text} variant='subtitle1'>No subscribed writers</Typography>)
				}
			</TabPanel>
			<TabPanel value={value} index={2}>
				{reader.readerComments.length !== 0 
					? 
					(<List component="div">
						{reader.readerComments.map(comment => 
							<ListItem key={comment.id} className={classes.listItem}>
								<ListItemText className={classes.flexGrow} primary={`${comment.comment}`} secondary={`Posted: ${comment.date}`} />
								<Link to={`/article/${comment.article.id}`}>
									<ListItemText primary={`${comment.article.title}`} classes={{ root: classes.root }} />
								</Link>
							</ListItem>
						)}
					</List>)
					: (<Typography className={classes.text} variant='subtitle1'>No comments written</Typography>)
				}
			</TabPanel>
		</div>
	)
}

export default ReaderTabs