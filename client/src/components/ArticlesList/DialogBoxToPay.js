import React from 'react'

import { DialogActions, DialogTitle, Dialog, Button, makeStyles, DialogContent, DialogContentText } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
	text:{
		color: theme.palette.text.secondary
	},
}))

const DialogBoxToPay = ({ openPayDialog, setOpenPayDialog, price, onConfirm }) => {
	const classes = useStyles()

	return (
		<Dialog
			open={openPayDialog}
			onClose={() => setOpenPayDialog(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" className={classes.text}>Paid article</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Confirm payment for this article for {price} €
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button color="primary" autoFocus onClick={() => onConfirm() } > 
						Confirm
				</Button>
				<Button onClick={() => setOpenPayDialog(false)} color="primary" autoFocus>
						cancel
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DialogBoxToPay