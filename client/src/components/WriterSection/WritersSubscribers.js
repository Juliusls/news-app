import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
	main: {
		marginTop: 20
	},
	table: {
		minWidth: 650,
	},
	text: {
		color: theme.palette.text.secondary,
		textTransform: 'uppercase'
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

const WritersSubscribers = ({ subscribers }) => {
	const classes = useStyles()

	const subscribersRows = () => { 
		return subscribers.map(subscription => (
			<TableRow hover key={subscription.id}>
				<StyledTableCell component="th" scope="row">{subscription.subscriber[0].userName}</StyledTableCell>
				<StyledTableCell align="center">{subscription.type.charAt(0).toUpperCase() + subscription.type.slice(1)}</StyledTableCell>
				<StyledTableCell align="center">{subscription.startDate.slice(0, -6)} - {subscription.endDate.slice(0, -6)}</StyledTableCell>
			</TableRow>
		))
	}

	return (
		<TableContainer component={Paper} className={classes.main}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Subscribers username</StyledTableCell>
						<StyledTableCell align="center">Type</StyledTableCell>
						<StyledTableCell align="center">Duration</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{subscribers.length === 0 
						? (
							<TableRow hover>
								<StyledTableCell component="th" scope="row">No subscribers</StyledTableCell>
								<StyledTableCell align="center"></StyledTableCell>
								<StyledTableCell align="center"></StyledTableCell>
							</TableRow>
						)
						: (subscribersRows())
					} 
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default WritersSubscribers
