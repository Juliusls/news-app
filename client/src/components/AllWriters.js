import React from 'react'
import { useSelector } from 'react-redux'
// import { Typography, ListItem, ListItemText, List, makeStyles, Link } from '@material-ui/core'
import { Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem, List, makeStyles } from '@material-ui/core'


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

// const ListItemLink = (props) => {
// 	return <ListItem button component="a" {...props}/>
// }

const AllWriters = () => {
	const classes = useStyles()
	const writers = useSelector(state => state.writers)

	return (
		<List dense className={classes.root}>
			{writers.map(writer => (
				<ListItem key={writer.id} button>
					<ListItemAvatar>
						<Avatar/>
					</ListItemAvatar>
					<ListItemText primary={`${writer.firstName} ${writer.lastName}`} />
					<ListItemSecondaryAction>
						
					</ListItemSecondaryAction>
				</ListItem>	
			))}
		</List>
	)
}

export default AllWriters