const initialState = {
	open: false,
	message: '',
	messageType: ''
}

const notificationReducer = (state = initialState, action) => {
	switch(action.type) {
	case 'NOTIFICATION':
		return action.data
	default:
		return state
	}
}

export const notifySuccess = (message) => {
	return dispatch => {
		dispatch ({
			type: 'NOTIFICATION',
			data: { 
				open: true,
				message,
				messageType: 'success'
			}
		})
		setTimeout(() => {
			dispatch({ 
				type: 'NOTIFICATION',
				data: { 
					open: false,
					message: '',
					messageType: 'success'
				}
			})
		}, 6000)
	}
}

export const notifyError = (message) => {
	return dispatch => {
		dispatch ({
			type: 'NOTIFICATION',
			data: { 
				open: true,
				message,
				messageType: 'error'
			}
		})
		setTimeout(() => {
			dispatch({ 
				type: 'NOTIFICATION',
				data: { 
					open: false,
					message: '',
					messageType: 'error'
				}
			})
		}, 6000)
	}
}

export default notificationReducer