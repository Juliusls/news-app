import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	list: {
		width: 250,
	},
	icon: {
		fontSize: theme.icons.fontSize,
		fill: theme.icons.fill
	},
	drawerpadding: {
		padding: 0,
	},
	listItemText: {
		primary: theme.palette.text.primary
	},
	paper: {
		background: theme.palette.primary.lighter
	},
	paperAnchorDockedLeft: {
		borderRight: 0
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		background: theme.palette.primary.main,
		justifyContent: 'flex-start',
		padding: theme.spacing(0, 1),
		marginTop: '0',
		...theme.mixins.toolbar,
	},
	divider: {
		background: theme.palette.primary.light
	}
}))

const LeftSideMenu = ({ drawerIsOpen, setDrawerIsOpen }) => {
	const classes = useStyles()

	const list = () => (
		<div
			className={classes.list}
			role="button"
			onClick={() => setDrawerIsOpen(false)}
			onKeyDown={() => setDrawerIsOpen(false)}
		>
			<List className={classes.drawerpadding}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setDrawerIsOpen(false)}>
						<CloseIcon className={classes.icon} />
					</IconButton>
				</div>
				{['Latest', 'My Favorites', 'Business', 'Cars', 'Entertainment', 'Family', 'Health', 'Politics', 'Religion', 'Science', 'Sports', 'Technology', 'Travel', 'World'].map((text) => (
					<Link style={{ textDecoration: 'none', color: 'inherit' }} key={text} to={`/${text}`}>
						<ListItem  button href={`/${text}`}>
							<ListItemText primary={text} className={classes.listItemText}/>
						</ListItem>
					</Link>
				))}
				<Divider light classes={{ light: classes.divider }}/>
			</List>
		</div>
	)

	return (
		<Drawer
			classes={{ paper: classes.paper, paperAnchorDockedLeft: classes.paperAnchorDockedLeft }}
			anchor="left"
			variant="persistent"
			open={drawerIsOpen}
			onClose={() => setDrawerIsOpen(false)}
		>
			{list('left')}
		</Drawer>
	)
}

export default LeftSideMenu

// TODO forbid page scrolling on side menu open