describe('Name Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html");

        cy.get('.name-field').type('Name')
        
        cy.get('.name-field').should('have.value', 'Name')
    })
})

