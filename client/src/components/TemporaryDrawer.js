import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles( theme => ({
	list: {
		width: 250,
	},
	closeIcon: {
		color: 'white'
	},
	drawerpadding: {
		paddingTop: 0,
	},
	text: {
		color: '#FCFCFC'
	},
	paper: {
		background: '#222525'
	},
	border: {
		borderRight: 0
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		background: '#181616',
		justifyContent: 'flex-start',
		padding: theme.spacing(0, 1),
		marginTop: '0',
		...theme.mixins.toolbar,
	}
}))

const TemporaryDrawer = ({ drawerIsOpen, setDrawerIsOpen }) => {
	const classes = useStyles()

	const list = () => (
		<div
			className={classes.list}
			role="button"
			onClick={() => setDrawerIsOpen(false)}
			onKeyDown={() => setDrawerIsOpen(false)}
		>
			<List classes={{ padding: classes.drawerpadding }}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setDrawerIsOpen(false)}>
						<CloseIcon style={{ fill: '#FFFFFF', fontSize: 30 }} />
					</IconButton>
				</div>
				{['Latest', 'My Favorites', 'Business', 'Cars', 'Entertainment', 'Family', 'Health', 'Politics', 'Religion', 'Science', 'Sports', 'Technology', 'Travel', 'World'].map((text) => (
					<ListItem button key={text} >
						<ListItemText primary={text} classes={{ primary: classes.text }}/>
					</ListItem>
				))}
			</List>
		</div>
	)

	return (
		<Drawer
			classes={{ paper: classes.paper, paperAnchorDockedLeft: classes.border }}
			anchor="left"
			variant="persistent"
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(false)}
		>
			{list('left')}
		</Drawer>
	)
}

export default TemporaryDrawer
