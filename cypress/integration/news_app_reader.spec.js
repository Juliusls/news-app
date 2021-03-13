describe('News app', () => {
	it('reset DB, create 2 writers, 2 artcles and 1 reader', () => {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.createWriterMike()
		cy.MikeRossLogin()
		cy.createMikeArticlePaid()
		cy.createMikeArticleFree()
		cy.writerLogout()
	})
	
	it('create 1 reader', () => {
		cy.createReaderRoss()
	})
	
	describe('Reader Login', () => {
		it('fail with wrong credentials', () => {
			cy.contains('Log in').click()
			cy.get('#userName').type('Ross')
			cy.get('#password').type('ross')
			cy.get('#readerLoginButton').click()
			cy.contains('Incorrect username or password')
		})

		it('success with correct credentials', () => {
			cy.contains('Log in').click()
			cy.get('#userName').clear().type('RossG')
			cy.get('#password').clear().type('rossgeller')
			cy.get('#readerLoginButton').click()
			cy.contains('Login successful')
		})

		it('reader can log out', () => {
			cy.get('.readerLogoutButton').click()
			cy.contains('Logged out successfully')
		})
	})

	describe('When writer logged in', () => {
		beforeEach(() => {
			cy.RossGellerLogin()
		})

		it('reader can search for article', () => {
			cy.get('#searchFieldButton').click()
			cy.get('#searchInput').type('Pariatur laboris{enter}')
			cy.contains('Results: Pariatur laboris')
			cy.contains('Results found: 1')
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
			cy.contains('By Mike Ross')
		})

		it('reader data is presented in readers page', () => {
			cy.get('.readerProfileAvatarButton').click() 
			cy.contains('RossG')
			cy.contains('My funds: 0 €')
		})

		it('reader can filter free articles', () => {
			cy.contains('Free').click()
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
			cy.contains('Exercitation et eu culpa esse nulla').should('not.exist')
		})

		it('reader can filter paid articles', () => {
			cy.contains('Paid').click()
			cy.contains('Exercitation et eu culpa esse nulla')
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam').should('not.exist')
		})

		it('reader can read free article', () => {
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam').click()
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
			cy.contains('Business')
			cy.contains('Cars')
			cy.contains('Consequat minim eiusmod cillum labore adipisicing do. Occaecat laborum amet occaecat occaecat ex occaecat cillum sunt aliqua reprehenderit.')
			cy.contains('By Mike Ross')
		})

		it('reader can not read paid article without funds', () => {
			cy.contains('Exercitation et eu culpa esse nulla').click()
			cy.contains('Not enough funds')
			cy.contains('Article price: 1 €')
			cy.contains('Your balance: 0 €')
		})

		it('reader can not subscribe to writer if there is not enough funds', () => {
			cy.get('#leftSideMenuButton').click()
			cy.contains('All Writers').click()
			cy.contains('Mike Ross').click()
			cy.get('#montlySubscriptionButton').click()
			cy.contains('Subscribed').should('not.exist')
			cy.contains('Type: montly').should('not.exist')
		})

		it('reader can add funds', () => { 
			cy.get('.readerProfileAvatarButton').click()
			cy.get('#addFundsButton').click()
			cy.get('#addFundsInput').clear().type(11)
			cy.get('#addFundsDialogAddButton').click()
			cy.contains('11 € added to your funds')
			cy.contains('My funds: 11 €')
		})

		it('reader can read single paid article if there is enough funds', () => {
			cy.contains('Exercitation et eu culpa esse nulla').click()
			cy.contains('Exercitation et eu culpa esse nulla')
			cy.contains('By Mike Ross')
		})

		it('reader can subscribe to writer if there is enough funds', () => {
			cy.get('#leftSideMenuButton').click()
			cy.contains('All Writers').click()
			cy.contains('Mike Ross').click()
			cy.get('#montlySubscriptionButton').click()
			cy.wait(1000)
			cy.contains('Subsribed montly to Mike Ross')
			cy.contains('Subscribed')
			cy.contains('Type: montly')
		})

		it('reader can read paid article if he is subscirbed to its author', () => {
			cy.contains('Exercitation et eu culpa esse nulla').click()
			cy.contains('Exercitation et eu culpa esse nulla')
			cy.contains('By Mike Ross')
		})

		it('reader can add writer to favorites', () => {
			cy.get('#leftSideMenuButton').click()
			cy.contains('All Writers').click()
			cy.contains('Mike Ross').click()
			cy.contains('Incididunt sit ad duis et magna magna occaecat sit ad duis et magna.')
			cy.contains('Add to favorites').click()
			cy.contains('Mike Ross added to favorites')
			cy.contains('Added to favorites')
		})

		it('reader can comment on an article', () => {
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam').click()
			cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
			// 	cy.contains('By Mike Ross')
			cy.contains('Comments').click()
			cy.get('#commentInput').type('First comment of this article')
			cy.get('#addCommentButton').click()
			cy.contains('First comment of this article added')
			cy.contains('First comment of this article')
			cy.contains('RossG')
		})
	})
})