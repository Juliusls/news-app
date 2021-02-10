import React from 'react'
import Grid from '@material-ui/core/Grid'
import ArticleCard from './ArticleCard'

const ArticlesList = ({ articles }) => {
	return (
		<Grid 
			container
			justify="center"
		>
			{articles.map(article => 
				<ArticleCard key={article.id} article={article}/>
			)}
		</Grid>
	)
}

export default ArticlesList