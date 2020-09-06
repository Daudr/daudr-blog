/// <reference types="Cypress" />

describe("Email Signup", () => {
  beforeEach(() => {
    cy.visit("/ngfor-done-right")
    cy.wait(500)
	})
	
	it("Should display an invalid text if email is invalid", () => {
		cy.get('#email').type("fakeemail").should('have.value', 'fakeemail')
		cy.get('[data-cy="error-text"]').contains("Invalid email")
	})

	it("Should display an error text if errors occur", () => {
		cy.get('#email').type("mail@mail.com").should('have.value', 'mail@mail.com') // Email already subscribed
		cy.get('[data-cy="email-button"]').click()
		cy.wait(500)
		cy.get('[data-cy="error-text"]').contains("Some error occurred whilst signing you up, please retry")
	})

	it("Should not display any text if nothing is wrong", () => {
		cy.get('#email').type("mail@mail.com").should('have.value', 'mail@mail.com')
		cy.get('[data-cy="error-text"]').should('have.value', '')
	})
})
