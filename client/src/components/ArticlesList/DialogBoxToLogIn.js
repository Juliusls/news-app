import React from 'react'
import { useHistory } from 'react-router-dom'

import { DialogActions, DialogTitle, Dialog, Button, makeStyles, DialogContent, DialogContentText } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	text:{
		color: theme.palette.text.secondary
	},
}))

const DialogBoxToLogin = ({ openLoginDialog, setOpenLoginDialog }) => {
	const classes = useStyles()
	const history = useHistory()

	
	const handleSubmit = async (event) => {
		event.preventDefault()
		history.push('/reader/login')
	}

	return (
		<Dialog
			open={openLoginDialog}
			onClose={() => setOpenLoginDialog(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" className={classes.text}>Paid article</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Please login and pay to read
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary" autoFocus onClick={handleSubmit}>
						Log In
				</Button>
				<Button onClick={() => setOpenLoginDialog(false)} color="primary" autoFocus>
						close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogBoxToLogin