import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { withStyles, makeStyles, Button, IconButton, Typography, Toolbar, AppBar, Tooltip, Fade } from '@material-ui/core/'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircle from '@material-ui/icons/AccountCircle'
import EditIcon from '@material-ui/icons/Edit'
import MenuIcon from '@material-ui/icons/Menu'
import SearchField from '../SearchField'
import LeftSideMenu from './LeftSideMenu'
import { removeReader } from '../../reducers/loginReaderReducer'
import { useCookies } from 'react-cookie'
import { removeWriter } from '../../reducers/loginWriterReducer'
import { notifySuccess } from '../../reducers/notificationReducer'

const useStyles = makeStyles(theme => ({
	appbar: {
		background: theme.primary,
		// marginBottom: 100
	},
	root: {
		flexGrow: 1,
		marginBottom: 25
	},
	leftElement: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
	},
	leftElementChild: {
		marginRight: 'auto'
	},
	rightElement: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
	},
	rightElementChild: {
		marginLeft: 'auto'
	},
	menuIcon: {
		fill: theme.icons.fill,
		fontSize: theme.icons.fontSize,
	},
	titleText: {
		textDecoration: 'none',
		color: 'inherit',
	},
	button: {
		marginRight: 10
	},
	accountIcon: {
		fill: theme.icons.fill,
		fontSize: theme.icons.fontSize,
	},
	signUpButton: {
		color: theme.palette.secondary
	},
	menuItem: {
		color: theme.palette.text.secondary,
	},
	linkNoDecoration: {
		textDecoration: 'none',
	},
	toolbar: theme.mixins.toolbar,
}))

const BigTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.primary.main,
		fontSize: 15,
	},
}))(Tooltip)

const Navbar = () =>  {
	const dispatch = useDispatch()
	const history = useHistory()
	const reader = useSelector(state => state.reader)
	const writer = useSelector(state => state.writer)
	const classes = useStyles()
	const [leftSideMenuIsOpen, setLeftSideMenuIsOpenIsOpen] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie', 'writerAuthCookie'])

	const handleLeftSideMenuIsOpen = () => {
		setLeftSideMenuIsOpenIsOpen(true)
	}

	const handleReaderLogout = () => {
		dispatch(removeReader())
		dispatch(notifySuccess('Logged out successfully'))
		removeCookie('readerAuthCookie')
		history.push('/')
	}
	
	const handleWriterLogout = () => {
		dispatch(removeWriter())
		dispatch(notifySuccess('Logged out successfully'))
		removeCookie('writerAuthCookie')
		history.push('/')
	}

	return (
		<div className={classes.root}>
			<LeftSideMenu leftSideMenuIsOpen={leftSideMenuIsOpen} setLeftSideMenuIsOpenIsOpen={setLeftSideMenuIsOpenIsOpen} />
			<AppBar position="fixed" className={classes.appbar}>
				<Toolbar>
					<div className={classes.leftElement}>
						<IconButton className={classes.leftElementChild} color="inherit" aria-label="menu" onClick={handleLeftSideMenuIsOpen} style={{ display: writer ? 'none' : 'block' }}>
							<MenuIcon className={classes.menuIcon} />
						</IconButton>
					</div>
					{writer 
						? (
							<Typography variant="h6" className={classes.titleText}>
								News App
							</Typography>
						)
						: (
							<Typography component={ Link } to='/' variant="h6" className={classes.titleText}>
								News App
							</Typography>
						)
					
					}
					{(reader && !writer) ? (
						<div className={classes.rightElement} >
							<div className={classes.rightElementChild}>
								<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Search">
									<SearchField />
								</BigTooltip>
								<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Profile">
									<IconButton
										aria-controls="menu-appbar"
										aria-haspopup="true"
										component={ Link }
										to={`/reader/profile/${reader.id}`}
									>
										<AccountCircle className={classes.accountIcon}/>
									</IconButton>
								</BigTooltip>
								<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Log out">
									<IconButton
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleReaderLogout}
									>
										<ExitToAppIcon className={classes.accountIcon}/>
									</IconButton>
								</BigTooltip>
							</div>
						</div>
					) :
						(writer && !reader) ? (
							<div className={classes.rightElement}>
								<div className={classes.rightElementChild}>
									<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Write an article">
										<IconButton
											aria-controls="menu-appbar"
											aria-haspopup="true"
											component={ Link }
											to='/writerssection/newarticle'
										>
											<EditIcon className={classes.accountIcon}/>
										</IconButton>
									</BigTooltip>
									<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Profile">
										<IconButton
											aria-controls="menu-appbar"
											aria-haspopup="true"
											component={ Link }
											to={`/writerssection/profile/${writer.id}`}
										>
											<AccountCircle className={classes.accountIcon}/>
										</IconButton>
									</BigTooltip>
									<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Log out">
										<IconButton
											aria-controls="menu-appbar"
											aria-haspopup="true"
											onClick={handleWriterLogout}
										>
											<ExitToAppIcon className={classes.accountIcon}/>
										</IconButton>
									</BigTooltip>
								</div>
							</div>
						) :
							(
								<div className={classes.rightElement}>
									<div className={classes.rightElementChild}>
										<SearchField />
										<Button color="inherit" to='/reader/login' component={ Link } className={classes.button}>
											Log in
										</Button>
										<Button variant="contained" to='/reader/signup' component={ Link } className={classes.signUpButton}>
											Sign Up
										</Button>
									</div>
								</div>
							)
					}
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
		</div>
	)
}

export default Navbar