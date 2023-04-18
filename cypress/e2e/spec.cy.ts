//import cy from 'cypress';

describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/');
  });

  it('finds the content "type"', () => {
    cy.visit('/');

    cy.get('label').should('contain', 'Search'); // Replace 'h1' and 'Page Heading' with the actual element and text you want to verify
    //cy.get('button').should('have.text', 'Click me') // Replace 'button' and 'Click me' with the actual element and text you want to verify
  });

  it('clicks the link "type"', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();
  });

  it('clicking "type" navigates to a new url', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions');
  });

  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions');

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com');

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com');
  });
});
