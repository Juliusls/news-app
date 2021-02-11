import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import LeftSideMenu from './LeftSideMenu'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
	appbar: {
		background: theme.primary
	},
	root: {
		flexGrow: 1,
	},
	menuItem: {
		color: theme.palette.text.secondary,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textAlign: 'center',
	},
	button: {
		marginRight: 10
	},
	icons: {
		fill: theme.icons.fill,
		fontSize: theme.icons.fontSize
	}
}))

const Navbar = ({ setFilerValue }) =>  {
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
			<LeftSideMenu drawerIsOpen={drawerIsOpen} setDrawerIsOpen={setDrawerIsOpen} setFilerValue={setFilerValue} />
			<AppBar position="static" className={classes.appbar}>
				<Toolbar>
					<IconButton edge="start" onClick={handleDrawerIsOpen} className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon className={classes.icons}/>
					</IconButton>
					<Link className={classes.title} style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
						<Typography variant="h6" className={classes.title}>
                        News App
						</Typography>
					</Link>
					{auth ? (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
							>
								<AccountCircle className={classes.icons}/>
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
					) : (
						<div>
							<Button color="inherit" className={classes.button}>
                                Login
							</Button>
							<Button variant="contained" color="#FCFCFC">
                                Sign Up
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
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