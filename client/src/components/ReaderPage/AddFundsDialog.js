import React, { useState } from 'react'
import { DialogActions, DialogTitle, Dialog, Button, makeStyles } from '@material-ui/core/'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { addReaderFunds } from '../../reducers/readersReducer'
import { notifySuccess } from '../../reducers/notificationReducer'


const useStyles = makeStyles(theme => ({
	text:{
		color: theme.palette.text.secondary
	},
}))

const AddFundsDialog = ({ openDialog, setOpenDialog, reader }) => {
	const [fundsValue, setFundsValue] = useState(0)
	const classes = useStyles()
	const dispatch = useDispatch()

	const onChangeFunds = event => {
		setFundsValue(event.target.value)
	}
	
	const handleSubmit = event => {
		event.preventDefault()
		const fundsToAdd = Number(fundsValue)
		dispatch(addReaderFunds(fundsToAdd, reader))
		dispatch(notifySuccess(`${fundsToAdd} € added to your funds`))
		setFundsValue(0)
		setOpenDialog(false)
	}

	return (
		<Dialog
			open={openDialog}
			onClose={() => setOpenDialog(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" className={classes.text}>Add Funds</DialogTitle>
			<DialogActions>
				<NumberFormat
					onChange={onChangeFunds}
					thousandSeparator
					value={fundsValue}
					isNumericString
				/>
				<Button color="primary" autoFocus onClick={handleSubmit}>
						add
				</Button>
				<Button onClick={() => setOpenDialog(false)} color="primary" autoFocus>
						close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddFundsDialog