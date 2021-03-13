import 'cypress-file-upload'

// WRITER SECTION
Cypress.Commands.add('createWriterMike', () => {
	cy.visit('http://localhost:3001/writerssection/signup')
	cy.contains('Writer registration form')
	cy.get('#firstName').type('Mike')
	cy.get('#lastName').type('Ross')
	cy.get('#userName').type('Miker')
	cy.get('#writerDescription').type('Incididunt sit ad duis et magna magna occaecat sit ad duis et magna.')
	cy.get('[type="checkbox"]').check('Business')
	cy.get('[type="checkbox"]').check('Cars')
	cy.get('#oneArticlePrice').clear().type(1)
	cy.get('#montlySubscriptionPrice').clear().type(10)
	cy.get('#yearlySubscriptionPrice').clear().type(100)
	cy.get('#password').type('mikeross')
	cy.get('#passwordConfirmation').type('mikeross')
	const filepath = 'imagesForTesting/mike.jpeg'
	cy.get('#imageUpload').attachFile(filepath)
	cy.get('#submitWriterRegister').click()
	cy.wait(500)
	cy.contains('Registered successfully')
})

Cypress.Commands.add('MikeRossLogin', () => {
	cy.visit('http://localhost:3001/writerssection/login')
	cy.contains('Writer log in')
	cy.get('#userName').type('Miker')
	cy.get('#password').type('mikeross')
	cy.get('#writerLoginButton').click()
	cy.wait(500)
	cy.contains('Logged in successfully')
})

Cypress.Commands.add('writerLogout', () => {
	cy.get('.writerLogoutButton').click()
	cy.wait(500)
	cy.contains('Logged out successfully')	
})

Cypress.Commands.add('createMikeArticlePaid', () => {
	cy.get('#newArticleIcon').click()
	cy.get('#title').type('Exercitation et eu culpa esse nulla')
	cy.get('#addParagraphButton').click()
	cy.get('#paragraphInput-0').type('Consequat minim eiusmod cillum labore adipisicing do. Occaecat laborum amet occaecat occaecat ex occaecat cillum sunt aliqua reprehenderit.')
	cy.get('[type="checkbox"]').check('Business')
	cy.get('[type="checkbox"]').check('Cars')
	cy.contains('Yes').click()
	const filepath = 'imagesForTesting/mikeArticle1.jpeg'
	cy.get('#imageUpload').attachFile(filepath)
	cy.contains('Publish').click()
	cy.contains('Article created')
	cy.contains('Exercitation et eu culpa esse nulla')
})

Cypress.Commands.add('createMikeArticleFree', () => {
	cy.get('#newArticleIcon').click()
	cy.get('#title').type('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
	cy.get('#addParagraphButton').click()
	cy.get('#paragraphInput-0').type('Consequat minim eiusmod cillum labore adipisicing do. Occaecat laborum amet occaecat occaecat ex occaecat cillum sunt aliqua reprehenderit.')
	cy.get('[type="checkbox"]').check('Business')
	cy.get('[type="checkbox"]').check('Cars')
	const filepath = 'imagesForTesting/mikeArticle2.jpeg'
	cy.get('#imageUpload').attachFile(filepath)
	cy.contains('Publish').click()
	cy.contains('Article created')
	cy.contains('Pariatur laboris nulla incididunt sit mollit ad consequat velit officia veniam')
})


// READER SECTION
Cypress.Commands.add('createReaderRoss', () => {
	cy.visit('http://localhost:3001/reader/signup')
	cy.contains('Sign Up')
	cy.get('#firstName').type('Ross')
	cy.get('#lastName').type('Geller')
	cy.get('#userName').type('RossG')
	cy.get('#password').type('rossgeller')
	cy.get('#passwordConfirmation').type('rossgeller')
	const filepath = 'imagesForTesting/rossgeller.jpeg'
	cy.get('#imageUpload').attachFile(filepath)
	cy.get('#submitReaderRegister').click()
	cy.contains('Registration successful')
})

Cypress.Commands.add('RossGellerLogin', () => {
	cy.visit('http://localhost:3001/reader/login')
	cy.contains('Log in')
	cy.get('#userName').type('RossG')
	cy.get('#password').type('rossgeller')
	cy.get('#readerLoginButton').click()
	cy.wait(1500)
	cy.contains('Login successful')
})