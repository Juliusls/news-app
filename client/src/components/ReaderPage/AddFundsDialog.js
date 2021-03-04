import React, { useState } from 'react'
import { DialogActions, DialogTitle, Dialog, Button, makeStyles } from '@material-ui/core/'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'
import { addReaderFunds } from '../../reducers/readersReducer'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'


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
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const fundsToAdd = Number(fundsValue)
			await dispatch(addReaderFunds(fundsToAdd, reader))
			dispatch(notifySuccess(`${fundsToAdd} € added to your funds`))
			setFundsValue(0)
			setOpenDialog(false)
		} catch  (error) {
			console.log('error resonse from submit', error)
			dispatch(notifyError('An error occurred. Please try again'))
		}
		
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