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
	const writers = useSelector(state => state.writers)
	const writersImages = useSelector(state => state.writerImages)
	
	const loggedInWritter = writers.filter(writer => writer.id === id)[0]

	const [componentToOpen, setComponentToOpen] = useState('articles')

	const filteredWriterImage = writersImages.filter(img => img.writer === id)[0].img.data.data
	var encodedWriterImage = filteredWriterImage && btoa(new Uint8Array(filteredWriterImage).reduce((data, byte) => data + String.fromCharCode(byte), ''))

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
					width="200"
					src={`data:image/jpeg;base64,${encodedWriterImage}`}
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
								{`${genre}.`}
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
