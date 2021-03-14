import React from 'react'
import { useSelector } from 'react-redux'

import { Snackbar, Fade } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackBar = () => {
	const notification = useSelector(state => state.notification)
	
	return (
		<Snackbar 
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			open={notification.open} 
			TransitionComponent={Fade}
		>
			<Alert severity={notification.messageType}>
				{notification.message}
			</Alert>
		</Snackbar>
	)
}

export default SnackBar
