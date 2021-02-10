import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ArticlePage = () => {
	let { id } = useParams()
	const articles = useSelector(state => state.articles)

	const filteredArticle = articles.filter(article => article.id === id)


	console.log(filteredArticle)

	return (
		<div>
			<h1>{filteredArticle[0].title}</h1>
			<p>{filteredArticle[0].content}</p>
		</div>
	)
}

export default ArticlePage




// const filterBlogs = (blogs) => {
// 	return blogs
// 		.filter(blog => blog.user !== null)
// 		.filter(blog => blog.user.username === user.username)
// }