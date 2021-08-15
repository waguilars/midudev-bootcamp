/// <reference types="cypress" />

const user = { username: 'will', password: 'password', name: 'Will Testing' }

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('[name="username"]').type('another user')
      cy.get('[name="password"]').type('another password')

      cy.get('#login-form').submit()
      cy.contains('invalid').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('succeeds with correct credentials', function () {
      cy.get('[name="username"]').type(user.username)
      cy.get('[name="password"]').type(user.password)

      cy.get('#login-form').submit()
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', user)
        .then(resp => {
          localStorage.setItem('user', JSON.stringify(resp.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#note-form').as('noteForm')

      const blog = { title: 'Will Testing', author: 'An Author', url: 'http://...' }

      cy.get('[name="title"]').type(blog.title)
      cy.get('[name="author"]').type(blog.author)
      cy.get('[name="url"]').type(blog.url)

      cy.get('@noteForm').submit()

      cy.get('[data-test-id="blogs-list"]').contains(blog.author)
      cy.get('[data-test-id="blogs-list"]').contains(blog.title)

      cy.get('[data-test-id="notification"]').should('have.css', 'color','rgb(0, 128, 0)')
    })
  })
})
