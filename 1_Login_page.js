/// <reference types="Cypress" />
describe('OFManager Login Test', function()  {
  it('Visit OpenFrame Manager', function() {
    cy.visit('http://192.168.14.110:1122/ofmanager/#!/login')
  })

  it('.type() - type into a DOM element', () => {
    cy.screenshot('1_login_test')

    cy.get('#input-id')
      .type('ROOT').should('have.value', 'ROOT')

    cy.get('#input-password')
      .type('SYS1').should('have.value', 'SYS1')
  })

  it('.click() - click on a DOM element', () => {
    cy.get('#button-submit').click(1000)
  })
})
