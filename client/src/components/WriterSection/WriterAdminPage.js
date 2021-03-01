import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Typography, List } from '@material-ui/core'
import WritersDashboard from './WritersDashboard'
import ArticlesStatistics from './ArticlesStatistics'
import WritersFollowers from './WritersFollowers'
import WritersSubscribers from './WritersSubscribers'
import WritersPrices from './WritersPrices'
import { useParams } from 'react-router-dom'

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
	genresList: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
})

const WriterAdminPage = () => {
	const classes = useStyles()
	const { id } = useParams()
	// const writerId = useSelector(state => state.writer)
	
	const loggedInWritter = useSelector(state => state.writers.filter(writer => writer.id === id))[0]

	const [componentToOpen, setComponentToOpen] = useState('articles')

	const tabToOpen = () => {
		switch (componentToOpen) {
		case 'articles':
			return <ArticlesStatistics articles={loggedInWritter.myarticles} />
		case 'followers':
			return <WritersFollowers followers={loggedInWritter.followers} />
		case 'subscribers':
			return <WritersSubscribers subscribers={loggedInWritter.subscribers} />
		case 'prices':
			return <WritersPrices writer={loggedInWritter} />		
		default:
			break
		}
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
						{loggedInWritter.firstName} {loggedInWritter.lastName}
					</Typography>
					<Typography variant='body1'>
						{loggedInWritter.writerDescription}
					</Typography>
					<List className={classes.genresList}>
						{loggedInWritter.writerGenres.map(genre => 
							<Typography key={genre} variant='body2'>
								{genre}
							</Typography>
						)}	
					</List>
					<Typography variant='caption'>
						{loggedInWritter.joined}
					</Typography>				
				</div>
			</div>
			<WritersDashboard writer={loggedInWritter} setComponentToOpen={setComponentToOpen} />
			{tabToOpen()}			
		</div>
	)
}

export default WriterAdminPage
