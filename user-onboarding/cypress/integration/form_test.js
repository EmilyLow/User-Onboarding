describe('Name Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html");

        cy.get('.name-field').type('Name')
        
        cy.get('.name-field').should('have.value', 'Name')
    })
})


describe('Email Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html");
     
        cy.get('.email-field').type('emlow@me.com')
        
    })
})

describe('Password Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html");
     
        cy.get('.password-field').type('1234567')
        
    })

   
})

describe('Check Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html")
     
        cy.get('.checkbox').check()
        
    })
})
describe('Submitting empty', function() {
    it('Visits a new site', function () {


        cy.get('form').submit(false) 
        
    })
})

describe('Submit Test', function() {
    it('Visits a new site', function () {

        cy.visit("index.html")
     
        cy.get('.name-field').type('Name')
        cy.get('.email-field').type('emlow@me.com')
        cy.get('.password-field').type('1234567')
        cy.get('.checkbox').check()

        cy.get('form').submit() 
        
    })
})


