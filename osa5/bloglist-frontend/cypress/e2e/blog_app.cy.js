describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'what',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened',  function() {
    
    cy.contains('Blogs application')
    cy.contains('Login to application')
  })

  it('front page contains random text', function() {
  })

  it('login form is shown', function() {
    cy.contains('login').click()
  })

describe('Login', function() {
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#login-button').click()

    cy.contains('what has logged in.')
  })
  it('fails with wrong credentials', function() {
    cy.get('#username').type('testi')
    cy.get('#password').type('testi')
    cy.get('#login-button').click()
    cy.contains('wrong username or password')
    cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

})

describe('When logged in', function() {
  beforeEach(function() {
    cy.contains('login')
    cy.get('#username').type('root')
    cy.get('#password').type('root')
    cy.get('#login-button').click()
  })
  
   it('A blog can be created', function() {
    cy.contains('New blog').click()
    cy.get('#title').type('blog title created with cypress')
    cy.get('#author').type('blog author created with cypress')
    cy.get('#url').type('blog url created with cypress')
    cy.contains('Create').click()

    cy.contains('blog title created with cypress')
    cy.contains('blog author created with cypress')
    })

    it('Blog can be shown and liked', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('blog title created with cypress')
      cy.get('#author').type('blog author created with cypress')
      cy.get('#url').type('blog url created with cypress')
      cy.contains('Create').click()
      cy.contains('Show').click()
      cy.contains('Hide')
      cy.get('#like').click()
      cy.contains('Likes: 1')
    })

    it('Testing remove', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.contains('Create').click()
      cy.contains('Show').click()
      cy.contains('Remove').click()
      cy.contains('title1 removed')
    })

    it('Adding two blogs and testing right order', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('title1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.contains('Create').click()
  
      cy.contains('New blog').click()
      cy.get('#title').type('title2')
      cy.get('#author').type('author2')
      cy.get('#url').type('url2')
      cy.contains('Create').click()
      cy.wait(500)

      cy.get('.blog').eq(0).should('contain', 'title1')

      cy.get('.blog').eq(1).should('contain', 'title2').contains('Show').click()
      cy.get('#like').click()
      cy.wait(500)
      cy.get('#like').click()

      cy.get('.blog').eq(0).should('contain', 'title2')

    })
  })
})