import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { Typography, Button } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import AddFundsDialog from '../AddFundsDialog'
import ReaderTabs from './ReaderTabs'

const useStyles = makeStyles({
	profileContaner: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		paddingLeft: 10
	},
	text: {
		textAlign: 'center',
		paddingTop: 50
	},
	textGenres: {
		color: 'grey'
	},
	balance: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
		marginBottom: 20
	},
	addFundsButton: {
		marginLeft: 10
	}
})

const ReaderPage = () => {
	const classes = useStyles()
	const [openDialog, setOpenDialog] = useState(false)
	const { id } = useParams()
	const readers = useSelector(state => state.readers)
	const filteredReader = readers.filter(reader => reader.id === id)[0]
	console.log('filteredReader from Reader Page', filteredReader)
	const date = filteredReader.joined !== undefined ? filteredReader.joined : 'No data'

	if (!readers) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<div className={classes.profileContaner}>
				<img
					src='https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80'
					width="200"
					height="150"
				/>
				<div className={classes.infoContainer}>
					<Typography variant='h4'>
						{filteredReader.userName}
					</Typography>
					<div className={classes.balance}>
						<Typography variant='h6' >
							My funds: {filteredReader.funds} €
						</Typography>
						<Button color='primary' size="small" variant='outlined' className={classes.addFundsButton} onClick={() => setOpenDialog(true)}>
							Add funds
						</Button>
					</div>
					<Typography variant='caption' >
						Joined: {date}
					</Typography>				
				</div>
			</div>
			<ReaderTabs reader={filteredReader} />
			<AddFundsDialog openDialog={openDialog} setOpenDialog={setOpenDialog} reader={filteredReader} />
		</div>
	)
}

export default ReaderPage


