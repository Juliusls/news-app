import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Button, Menu, MenuItem, FormGroup, FormControlLabel, Switch, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core/'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import SearchField from './SearchField'
import LeftSideMenu from './LeftSideMenu'

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
	titleLink: {
		flex: 1,
		display: 'flex',
		justifyContent: 'center',
		textDecoration: 'none',
		color: 'inherit',
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
	}
}))

const Navbar = () =>  {
	const classes = useStyles()
	const [auth, setAuth] = useState(true)
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)

	const handleChange = (event) => {
		setAuth(event.target.checked)
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleDrawerIsOpen = () => {
		setDrawerIsOpen(true)
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

					<Link className={classes.titleLink} to='/'>
						<Typography variant="h6" className={classes.titleText}>
						News App
						</Typography>
					</Link>

					{auth ? (
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
									<MenuItem onClick={handleClose} classes={{ root: classes.menuItem }}>My account</MenuItem>
								</Menu>
							</div>
						</div>
					) : (
						<div className={classes.rightElement}>
							<div className={classes.rightElementChild}>
								<SearchField />
								<Button color="inherit" className={classes.button}>
									Login
								</Button>
								<Button variant="contained" className={classes.signUpButton}>
									Sign Up
								</Button>
							</div>
						</div>
					)}
				</Toolbar>
			</AppBar>
			<Toolbar />
			<FormGroup>
				<FormControlLabel
					control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
					label={auth ? 'Logout' : 'Login'}
				/>
			</FormGroup>
		</div>
	)
}

export default Navbar