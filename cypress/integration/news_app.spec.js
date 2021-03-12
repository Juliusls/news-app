describe('News app', function() {
	beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
    })

	it('front page can be opened', function() {
		cy.visit('http://localhost:3001')
		cy.contains('News App')
	})
})