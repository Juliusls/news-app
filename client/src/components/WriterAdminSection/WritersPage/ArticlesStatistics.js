import React from 'react'

import { makeStyles, withStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

const useStyles = makeStyles({
	main: {
		marginTop: 20
	},
	table: {
		minWidth: 650,
	},
})

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

const ArticlesStatistics = ({ articles }) => {
	const classes = useStyles()

	return (
		<TableContainer component={Paper} className={classes.main}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<StyledTableCell>Articles</StyledTableCell>
						<StyledTableCell align="center">Type</StyledTableCell>
						<StyledTableCell align="center">Genres</StyledTableCell>
						<StyledTableCell align="center">Views</StyledTableCell>
						<StyledTableCell align="center">Comments</StyledTableCell>
						<StyledTableCell align="center">Published</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{articles.map(article => (
						<TableRow hover key={article.id}>
							<StyledTableCell component="th" scope="row">{article.title}</StyledTableCell>
							<StyledTableCell align="center">{article.paid === 'yes' ? 'Paid' : 'Free'}</StyledTableCell>
							<StyledTableCell align="center">{article.genres.map(genre => `${genre} `)}</StyledTableCell>
							<StyledTableCell align="center">{article.views}</StyledTableCell>
							<StyledTableCell align="center">{article.comments.length === 0 ? 0 : article.comments.length}</StyledTableCell>
							<StyledTableCell align="center">{article.published}</StyledTableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ArticlesStatistics
