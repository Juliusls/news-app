import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Button, Menu, MenuItem, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core/'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import SearchField from './SearchField'
import LeftSideMenu from './LeftSideMenu'
import { removeReader } from '../reducers/readerReducer'
import { useCookies } from 'react-cookie'

const useStyles = makeStyles(theme => ({
	appbar: {
		background: theme.primary,
		marginBottom: 100
	},
	root: {
		flexGrow: 1,
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
	}
}))

const Navbar = () =>  {
	const dispatch = useDispatch()
	const reader = useSelector(state => state.reader)
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['authCookie'])

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDrawerIsOpen = () => {
		setDrawerIsOpen(true)
	}

	const handleLogout = () => {
		dispatch(removeReader())
		removeCookie('authCookie')
	}

	return (
		<div className={classes.root}>
			<LeftSideMenu drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} />
			<AppBar position="fixed" className={classes.appbar}>
				<Toolbar>
					<div className={classes.leftElement}>
						<IconButton className={classes.leftElementChild} color="inherit" aria-label="menu" onClick={handleDrawerIsOpen}>
							<MenuIcon className={classes.menuIcon} />
						</IconButton>
					</div>
					<Typography component={ Link } to='/' variant="h6" className={classes.titleText}>
                        News App
					</Typography>
					{reader ? (
						<div className={classes.rightElement} >
							<div className={classes.rightElementChild}>
								<SearchField />
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleMenu}
								>
									<AccountCircle className={classes.accountIcon}/>
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose} classes={{ root: classes.menuItem }}>Profile</MenuItem>
									<MenuItem component={ Button } onClick={handleLogout} classes={{ root: classes.menuItem }}>Log Out</MenuItem>
								</Menu>
							</div>
						</div>
					) : (
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
					)}
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Toolbar />
		</div>
	)
}

export default Navbar