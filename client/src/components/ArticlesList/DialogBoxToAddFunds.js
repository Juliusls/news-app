import React from 'react'
import { useHistory } from 'react-router-dom'

import { DialogActions, DialogTitle, Dialog, Button, makeStyles, DialogContent, Typography } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	text:{
		color: theme.palette.text.secondary
	},
}))

const DialogBoxToAddFunds = ({ openAddFundsDialog, setOpenAddFundsDialog, loggedInReader, price }) => {
	const classes = useStyles()
	const history = useHistory()
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		history.push(`/reader/profile/${loggedInReader.id}`)
	}

	return (
		<Dialog
			open={openAddFundsDialog}
			onClose={() => setOpenAddFundsDialog(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" className={classes.text}>Not enough funds</DialogTitle>
			<DialogContent>
				<Typography gutterBottom className={classes.text}>					
					Article price: {price} €
				</Typography>
				<Typography gutterBottom className={classes.text}>					
					Your balance: {loggedInReader.funds} €
				</Typography>
				<Typography gutterBottom className={classes.text}>					
					Please go to your profile to add funds
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button color="primary" autoFocus onClick={handleSubmit}>
						Profile
				</Button>
				<Button onClick={() => setOpenAddFundsDialog(false)} color="primary" autoFocus>
						close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogBoxToAddFunds