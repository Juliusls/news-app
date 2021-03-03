import React from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { useSelector } from 'react-redux'
import Fade from '@material-ui/core/Fade'

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackBar = () => {
	const notification = useSelector(state => state.notification)
	
	return (
		<Snackbar 
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={notification.open} 
			autoHideDuration={5000} 
			TransitionComponent={Fade}
		>
			<Alert severity={notification.messageType}>
				{notification.message}
			</Alert>
		</Snackbar>
	)
}

export default SnackBar
