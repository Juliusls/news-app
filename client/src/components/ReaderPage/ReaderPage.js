import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { makeStyles, Typography, Button } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import AddFundsDialog from './AddFundsDialog'
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
	const images = useSelector(state => state.readerImages)
	const filteredReader = readers.filter(reader => reader.id === id)[0]
	const date = filteredReader.joined !== undefined ? filteredReader.joined : 'No data'

	const filteredImage = images && images.length !== 0 && images.filter(img => img.reader === id)[0].img.data.data
	var base64 = btoa(new Uint8Array(filteredImage).reduce((data, byte) => data + String.fromCharCode(byte), ''))

	if (!readers) {
		return <p>Loading...</p>
	}

	return (
		<div>
			<div className={classes.profileContaner}>
				{images.length === 0
					? <Skeleton width={200} variant="rect" animation="wave"/>
					: <img
						width="200"
						src={`data:image/jpeg;base64,${base64}`}
					/>
				}
				<div className={classes.infoContainer}>
					<Typography variant='h4'>
						{filteredReader.userName}
					</Typography>
					<div className={classes.balance}>
						<Typography variant='h6' >
							My funds: {filteredReader.funds} €
						</Typography>
						<Button color='primary' size="small" variant='outlined' id='addFundsButton' className={classes.addFundsButton} onClick={() => setOpenDialog(true)}>
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


