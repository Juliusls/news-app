import React from 'react'
import { makeStyles, withStyles, Typography, CardContent, Card, CardActions, Tooltip, Button, Fade } from '@material-ui/core'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
// import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined'

// TODO remove non needed
const useStyles = makeStyles(theme => ({
	subscriptionOptionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		paddingLeft: 50,
	},
	subscriptionCard: {
		margin: 5,
		minWidth: 200,
		borderRadius: 10,
		borderWidth: 1,
		border: 'solid',
		borderColor: theme.palette.primary.main,
		flexGrow: 1
	},
	subText: {
		textAlign: 'center'
	},
	cardButton: {
		display: 'flex',
		justifyContent: 'center'
	}
}))

const BigTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: theme.palette.primary.main,
		fontSize: 15,
	},
}))(Tooltip)

const SubscriptionPlans = ({ filteredWriter, matchingSub, handleSubscirbe }) => {
	const classes = useStyles()
	return (
		<div className={classes.subscriptionOptionsContainer}>
			<Card className={classes.subscriptionCard} variant="outlined">
				<CardContent>
					<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Article
					</Typography>
					<Typography variant="h5" color="textSecondary" className={classes.subText}>
						{`${filteredWriter.oneArticlePrice} €`}
					</Typography>
				</CardContent>
			</Card>
			<Card className={classes.subscriptionCard} variant="outlined">
				<CardContent>
					<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Month
					</Typography>
					<Typography variant="h5" color="textSecondary" className={classes.subText}>
						{`${filteredWriter.montlySubscriptionPrice} €`}
					</Typography>
				</CardContent>
				<CardActions className={classes.cardButton}>
					{matchingSub === null
						? (
							<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Login to subscribe">
								<Button variant="contained" endIcon={<AddOutlinedIcon />}>
									Subscribe
								</Button>
							</BigTooltip>
						)
						: (
							<Button size="small" color="primary" variant="contained" endIcon={<AddOutlinedIcon />} onClick={() => handleSubscirbe('montlySubscriptionPrice')}>
								Subscribe
							</Button>

						)	
					}
				</CardActions>
			</Card>
			<Card className={classes.subscriptionCard} variant="outlined">
				<CardContent>
					<Typography color="textSecondary" gutterBottom className={classes.subText}>
								1 Year
					</Typography>
					<Typography variant="h5" color="textSecondary" className={classes.subText}>
						{`${filteredWriter.yearlySubscriptionPrice} €`}
					</Typography>
				</CardContent>
				<CardActions className={classes.cardButton}>
					{matchingSub === null
						? (
							<BigTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Login to subscribe">
								<Button variant="contained" endIcon={<AddOutlinedIcon />}>
									Subscribe
								</Button>
							</BigTooltip>
						)
						: (
							<Button size="small" color="primary" variant="contained" endIcon={<AddOutlinedIcon />} onClick={() => handleSubscirbe('yearlySubscriptionPrice')}>
								Subscribe
							</Button>

						)	
					}
				</CardActions>
			</Card>
		</div>
	)
}

export default SubscriptionPlans
