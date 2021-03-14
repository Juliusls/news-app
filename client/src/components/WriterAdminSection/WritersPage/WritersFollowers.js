import React from 'react'
import { makeStyles, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

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
