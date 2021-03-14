import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { useDispatch } from 'react-redux'

import { DialogActions, DialogTitle, Dialog, Button, makeStyles } from '@material-ui/core/'

import { addReaderFunds } from '../../reducers/readersReducer'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'
import { removeReader } from '../../reducers/loginReaderReducer'


const useStyles = makeStyles(theme => ({
	text:{
		color: theme.palette.text.secondary
	},
}))

const AddFundsDialog = ({ openDialog, setOpenDialog, reader }) => {
	const [fundsValue, setFundsValue] = useState(0)
	const classes = useStyles()
	const dispatch = useDispatch()
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['readerAuthCookie'])
	const history = useHistory()


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
			console.log('error response', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeReader())
				removeCookie('readerAuthCookie', { path: '/' })
				history.push('/reader/login')
			} else {
				dispatch(notifyError('An error occurred. Please try again'))
			}
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
					id='addFundsInput'
					onChange={onChangeFunds}
					value={fundsValue}
					isNumericString
				/>
				<Button color="primary" id='addFundsDialogAddButton' autoFocus onClick={handleSubmit}>
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