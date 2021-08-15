
/// <reference types="cypress" />

const user = { username: 'will', password: 'password', name: 'Will Testing' }

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users' , user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
  })


  describe('Login',function() {

    it('fails with wrong credentials', function() {
      cy.get('[name="username"]').type('another user')
      cy.get('[name="password"]').type('another password')

      cy.get('#login-form').submit()
      cy.contains('invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
    })


    it('succeeds with correct credentials', function() {
      cy.get('[name="username"]').type(user.username)
      cy.get('[name="password"]').type(user.password)

      cy.get('#login-form').submit()
    })
  })

})