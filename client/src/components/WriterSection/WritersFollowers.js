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

const WritersFollowers = ({ followers }) => {
	const classes = useStyles()

	const followersRows = () => { 
		return followers.map(follower => (
			<TableRow hover key={follower.id}>
				<StyledTableCell component="th" scope="row">{follower.userName}</StyledTableCell>
			</TableRow>
		))
	}

	return (
		<TableContainer component={Paper} className={classes.main}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Follower username</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{followers.length === 0 
						? (
							<TableRow hover>
								<StyledTableCell component="th" scope="row">No followers</StyledTableCell>
							</TableRow>
						)
						: (followersRows())
					}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default WritersFollowers
