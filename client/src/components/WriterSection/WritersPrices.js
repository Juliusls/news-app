import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import DoneIcon from '@material-ui/icons/Done'
import TextField from '@material-ui/core/TextField'
import { updatePricing } from '../../reducers/writersReducer'
import { notifyError, notifySuccess } from '../../reducers/notificationReducer'
import { useCookies } from 'react-cookie'
import { removeWriter } from '../../reducers/loginWriterReducer'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	main: {
		marginTop: 20
	},
	table: {
		minWidth: 650,
	},
	text: {
		color: theme.palette.text.primary,
		textTransform: 'uppercase'
	},
	cell: {
		flexGrow: 1
	},
	inputColor: {
		color: '#000'
	},
}))

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary
	},
	body: {
		backgroundColor: theme.palette.primary.lightGrey,
		color: theme.palette.text.secondary,
		fontSize: 14,
	},
}))(TableCell)

const CustomTableCell = ({ isEditMode, value, name, onChange }) => {
	const classes = useStyles()
	return (
		<StyledTableCell align="center">
			{isEditMode ? (
				<TextField
					type="number"
					size="small"
					variant="outlined"
					value={value}
					name={name}
					id={`priceInput-${name}`}
					onChange={e => onChange(e)}
					InputProps={{
						className: classes.inputColor
					}}
					style = {{ width: 100 }}
				/>
			) : (
				value
			)}
		</StyledTableCell>
	)
}

const WritersPrices = ({ writer }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [isEditMode, setssEditMode] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookie, removeCookie] = useCookies(['writerAuthCookie'])
	const history = useHistory()

	const [priceList, setSriceList] = useState({
		'oneArticlePrice': writer.oneArticlePrice || 0,
		'montlySubscriptionPrice': writer.montlySubscriptionPrice || 0,
		'yearlySubscriptionPrice': writer.yearlySubscriptionPrice || 0
	})

	const handleSubmit = async () => {
		try {
			await dispatch(updatePricing(priceList, writer))
			dispatch(notifySuccess('Prices updated'))
			setssEditMode(false)
		} catch (error) {
			console.log('error response', error.response)
			if (error.response.statusText === 'Unauthorized' && error.response.data.error === 'token expired') {
				dispatch(notifyError('You session has expired. Please login again'))
				dispatch(removeWriter())
				removeCookie('writerAuthCookie', { path: '/' })
				history.push('/writerssection/login')
			} else {
				dispatch(notifyError('An error occurred. Please try again'))
			}
		}
	}

	const handleCancel = () => {
		setSriceList({
			'oneArticlePrice': writer.oneArticlePrice,
			'montlySubscriptionPrice': writer.montlySubscriptionPrice,
			'yearlySubscriptionPrice': writer.yearlySubscriptionPrice
		})
		setssEditMode(false)
	}
	
	const onChange = (event) => {
		setSriceList({ ...priceList, [event.target.name]: Number(event.target.value) })
	}

	return (
		<TableContainer component={Paper} className={classes.main}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell width="25%">Subscriptions</StyledTableCell>
						<StyledTableCell width="20%" align="center">1 Article, €</StyledTableCell>
						<StyledTableCell width="20%" align="center">1 Month, €</StyledTableCell>
						<StyledTableCell width="20%" align="center">1 Year, €</StyledTableCell>
						<StyledTableCell width="15%"></StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow hover>
						<StyledTableCell width="25%" component="th" scope="row">Price</StyledTableCell>
						<CustomTableCell width="20%" {...{ isEditMode, value: priceList.oneArticlePrice, name: 'oneArticlePrice', onChange }} />
						<CustomTableCell width="20%" {...{ isEditMode, value: priceList.montlySubscriptionPrice, name: 'montlySubscriptionPrice', onChange }} />
						<CustomTableCell width="20%" {...{ isEditMode, value: priceList.yearlySubscriptionPrice, name: 'yearlySubscriptionPrice', onChange }} />
						<StyledTableCell width="15%" align="right">
							{isEditMode ? (
								<div className={classes.editMode}>
									<IconButton
										aria-label="done"
										onClick={() => handleSubmit()}
										id='confirmChangedPricesButton'
									>
										<DoneIcon />
									</IconButton>
									<IconButton
										aria-label="cancel"
										onClick={() => handleCancel()}
									>
										<CancelIcon />
									</IconButton>
								</div>
							) : (
								<IconButton
									id='editPricesButton'
									aria-label="delete"
									onClick={() => setssEditMode(true)}
								>
									<EditIcon />
								</IconButton>
							)}
						</StyledTableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default WritersPrices
