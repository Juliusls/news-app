import React, { useState } from 'react'
import { AppBar, Tabs, Tab, Typography, Box, ListItem, ListItemText, List, makeStyles, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	text: {
		color: theme.palette.text.secondary
	},
	root: {
		color: theme.palette.text.blueish,
		textDecoration: 'underline'
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
					<Typography>{children}</Typography>
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
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	console.log(reader)
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
					( reader.favoritewriters.map(favoriteWriter => {
						<List component="nav">
							<ListItem button>
								<ListItemLink component={ Link } to={`/author/${favoriteWriter.id}`} >
									<ListItemText primary={`${favoriteWriter.firstName} ${favoriteWriter.lastName}`} classes={{ root: classes.root }} />
								</ListItemLink>
								<Button>Remove from favorites</Button>
							</ListItem>
						</List> })
					) : (
						<Typography className={classes.text} variant='subtitle1'>No favorited writers</Typography>
					)
				}
			</TabPanel>
			<TabPanel value={value} index={1}>
				{reader.subscriptions.length !== 0 
					? 
					(<List component="nav">
						{reader.subscriptions.map(subscription => 
							<ListItem button key={subscription.id}>
								<ListItemLink component={ Link } to={`/author/${subscription.id}`} >
									<ListItemText primary={`${subscription.firstName} ${subscription.lastName}`} classes={{ root: classes.root }} />
								</ListItemLink>
								<Button>Unsubscribe</Button>
							</ListItem>
						)}
					</List>) 
					: (<Typography className={classes.text} variant='subtitle1'>No subscribed writers</Typography>)
				}
			</TabPanel>
			<TabPanel value={value} index={2}>
				{reader.readerComments.length !== 0 
					? 
					(<List component="nav">
						{reader.readerComments.map(comment => 
							<ListItem key={comment.id}>
								<ListItemText primary={`${comment.comment}`} secondary={`Posted: ${comment.date}`} />
								<ListItemLink component={ Link } to={`/article/${comment.article.id}`} >
									<ListItemText primary={`${comment.article.title}`} classes={{ root: classes.root }} />
								</ListItemLink>
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