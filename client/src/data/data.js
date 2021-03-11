export const newsCategories = ['Business', 'Cars', 'Entertainment', 'Family', 'Health', 'Politics', 'Religion', 'Science', 'Sport', 'Technology', 'Travel', 'World']
const loggedInReaderCategories = ['My Favorites', 'My Subscriptions']
export const sideMenuWriterSection = [
	{
		text: 'Writer log in',
		linkText: 'login'
	},
	{ 
		text: 'Become a writer',
		linkText: 'signup'
	}
]
export const allCategories = loggedInReaderCategories.concat(newsCategories)

