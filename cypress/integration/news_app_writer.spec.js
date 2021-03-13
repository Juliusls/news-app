describe('News app', () => {
	it('resets db and creates a writer', () => {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		cy.createWriterMike()
	})
	
	describe('Writer Login',() => {
		it('fail with wrong credentials', () => {
			cy.get('#leftSideMenuButton').click()
			cy.contains('Writer log in').click()
			cy.get('#userName').type('Miker')
			cy.get('#password').type('miker')
			cy.get('#writerLoginButton').click()
			cy.contains('Incorrect username or password')
		})

		it('success with correct credentials', () => {
			cy.get('#leftSideMenuButton').click()
			cy.contains('Writer log in').click()
			cy.get('#userName').clear().type('Miker')
			cy.get('#password').clear().type('mikeross')
			cy.get('#writerLoginButton').click()
			cy.contains('Logged in successfully')
		})

		it('writer can log out', () => {
			cy.get('.writerLogoutButton').click()
			cy.contains('Logged out successfully')
		})
	})

	describe('When writer logged in', () => {
		beforeEach(() => {
			cy.MikeRossLogin()
		})

		it('article can be created', () => {
			cy.get('#newArticleIcon').click()
			cy.get('#title').type('Exercitation et eu culpa esse nulla')
			cy.get('#addParagraphButton').click()
			cy.get('#paragraphInput-0').type('Consequat minim eiusmod cillum labore adipisicing do. Occaecat laborum amet occaecat occaecat ex occaecat cillum sunt aliqua reprehenderit.')
			cy.get('[type="checkbox"]').check('Business')
			cy.get('[type="checkbox"]').check('Cars')
			const filepath = 'imagesForTesting/mikeArticle1.jpeg'
			cy.get('#imageUpload').attachFile(filepath)
			cy.contains('Publish').click()
			cy.contains('Article created')
			cy.contains('Exercitation et eu culpa esse nulla')
		})

		it('writer can change prices', () => {
			cy.get('#myPricesCardButton').click()
			cy.get('#editPricesButton').click()
			cy.get('#priceInput-oneArticlePrice').type(2)
			cy.get('#priceInput-montlySubscriptionPrice').type(2)
			cy.get('#priceInput-yearlySubscriptionPrice').type(2)

			cy.get('#confirmChangedPricesButton').click()
			cy.contains('Prices updated')
			cy.contains(12)
			cy.contains(102)
			cy.contains(1002)
		})
	})

})