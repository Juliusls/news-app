import React from 'react'
import { useSelector } from 'react-redux'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import { TextField, Accordion, makeStyles, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	text: {
		color: theme.palette.text.secondary
	},
	categoryButton: {
		marginBottom: 10,
		marginRight: 10
	},
	accordion: {
		display: 'flex',
		flexDirection: 'column'
	},
	accordionLabel: {
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	rootBorder: {
		borderStyle: 'solid',
		borderWidth: 1,
		borderColor: theme.palette.primary.main,
		margin: 5
	}
}))

const Comments = () => {
	const classes = useStyles()
	const articles = useSelector(state => state.articles)
	let { id } = useParams()
	const filteredArticle = articles.filter(article => article.id === id)[0]
	console.log(filteredArticle)

	return (
		<div>
			<Accordion classes={{ root: classes.rootBorder }}>
				<AccordionSummary
					color="primary"
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1c-content"
					id="panel1c-header"
				>
					<Typography variant='h6' className={classes.accordionLabel} >
                        Comments
					</Typography>
				</AccordionSummary>
				<AccordionDetails className={classes.accordion}>
					<AccordionActions>
						<TextField fullWidth variant="outlined"/>
						<Button size="small" color="primary" >
                            Comment
						</Button>
					</AccordionActions>
					{filteredArticle.comments.length !== 0
						? (
							filteredArticle.comments.map(comment => 
								<Card key={comment.id} classes={{ root: classes.rootBorder }}>
									<CardContent>
										<Typography className={classes.text} style={{ fontWeight: 'bold' }}>
											{comment.commentator.userName}
										</Typography>
										<Typography className={classes.text}>
											{comment.comment}
										</Typography>
										<Typography className={classes.text} variant='caption'>
										Posted on {comment.date}
										</Typography>
									</CardContent>
								</Card>)
						)
						: (
							<Typography className={classes.text} variant='subheading1'>No comments</Typography>
						)
					}
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default Comments

{/* <Typography key={value} variant="caption" className={classes.text}>
							{value}
</Typography> */}