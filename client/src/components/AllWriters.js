import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, ListItem, List, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.primary.middleGrey,
	},
	listItem: {
		marginBottom: 10,
		textDecoration: 'none',
		'&:hover': {
			backgroundColor: theme.palette.primary.hover
		}
	},
	text: {
		color: theme.palette.text.primary,
		textDecoration: 'none'
	},
	textWithPadding: {
		textAlign: 'center',
		paddingBottom: 20
	}
}))

const AllWriters = () => {
	const classes = useStyles()
	const writers = useSelector(state => state.writers)
	const writersImages = useSelector(state => state.writerImages)

	const imageComp = (id) => {
		const filteredWriterImage = writersImages.filter(img => img.writer === id)[0].img.data.data
		let encodedWriterImage = filteredWriterImage && btoa(new Uint8Array(filteredWriterImage).reduce((data, byte) => data + String.fromCharCode(byte), ''))
		
		return <Avatar alt="Writers Profile Picture" src={`data:image/jpeg;base64,${encodedWriterImage}`} />
	}

	// TODO add dividers

	return (
		<div>
			<Typography variant='h3' className={classes.textWithPadding}>All writers</Typography>
			<List className={classes.root}>
				{writers.map(writer => (
					<ListItem key={writer.id} button component={ Link } to={`/author/${writer.id}`} classes={{ hover: classes.hover }} className={classes.listItem}>
						<ListItemAvatar>
							{imageComp(writer.id)}
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography variant="subtitle1" display="block" className={classes.text}>
									{writer.firstName} {writer.lastName}
								</Typography>
							}
							secondary={
								writer.writerGenres.map(genre => 
									<Typography key={genre} variant="caption" display="block" className={classes.text}>
										{genre}
									</Typography>
								)
							}
						/>
						<Typography variant="caption" display="block" className={classes.text}>
							{writer.writerDescription}
						</Typography>
						<ListItemSecondaryAction>
							
						</ListItemSecondaryAction>
					</ListItem>	
				))}
			</List>
		</div>
	)
}

export default AllWriters