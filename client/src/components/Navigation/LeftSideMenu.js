import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { allCategories } from '../../data/data'
import { newsCategories } from '../../data/data'
import { sideMenuWriterSection } from '../../data/data'
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

const LeftSideMenu = ({ leftSideMenuIsOpen, setLeftSideMenuIsOpenIsOpen }) => {
	const classes = useStyles()
	const reader = useSelector(state => state.reader)

	const categories = reader ? allCategories : newsCategories

	const list = () => (
		<div
			className={classes.list}
			role="button"
			onClick={() => setLeftSideMenuIsOpenIsOpen(false)}
			onKeyDown={() => setLeftSideMenuIsOpenIsOpen(false)}
		>
			<List className={classes.drawerpadding}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={() => setLeftSideMenuIsOpenIsOpen(false)}>
						<CloseIcon className={classes.icon} />
					</IconButton>
				</div>
				{categories.map((text) => (
					<Link style={{ textDecoration: 'none', color: 'inherit' }} key={text} to={`/genres/${text}`}>
						<ListItem  button>
							<ListItemText primary={text} className={classes.listItemText}/>
						</ListItem>
					</Link>
				))}
				<Divider light classes={{ light: classes.divider }}/>
				<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/allwriters'>
					<ListItem  button>
						<ListItemText primary='All Writers' className={classes.listItemText}/>
					</ListItem>
				</Link>
				<Divider light classes={{ light: classes.divider }}/>
				{sideMenuWriterSection.map(value => (
					<Link style={{ textDecoration: 'none', color: 'grey' }} key={value.linkText} to={`/writerssection/${value.linkText}`}>
						<ListItem  button>
							<ListItemText primary={value.text} className={classes.listItemText}/>
						</ListItem>
					</Link>
				))}
			</List>
		</div>
	)

	return (
		<Drawer
			classes={{ paper: classes.paper, paperAnchorDockedLeft: classes.paperAnchorDockedLeft }}
			anchor="left"
			variant="persistent"
			open={leftSideMenuIsOpen}
			onClose={() => setLeftSideMenuIsOpenIsOpen(false)}
		>
			{list('left')}
		</Drawer>
	)
}

export default LeftSideMenu