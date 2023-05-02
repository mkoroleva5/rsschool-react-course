describe('Pages tests', () => {
  it('checks if cats link works', () => {
    cy.visit('/');
    cy.get('.header__link').contains('Cats').click();
    cy.url().should('include', '/cats');
    cy.get('h1').contains('Create your own cat');
  });

  it('checks if about link works', () => {
    cy.visit('/');
    cy.get('.header__link').contains('About').click();
    cy.url().should('include', '/about');
    cy.get('h1').contains('About Us');
  });

  it('checks if 404 page works', () => {
    cy.visit('/123');
    cy.get('h1').contains('404');
  });

  it('checks if home link works', () => {
    cy.visit('/');
    cy.get('.header__link').contains('About').click();
    cy.get('.header__link').contains('Home').click();
    cy.get('.search__label').contains('Search');
  });

  it('checks if search results are correct', () => {
    cy.visit('/');
    cy.get('.search__input').type('cat');
    cy.get('.search__button').click();
    cy.get('.card__wrapper').first().should('exist');
    cy.get('.card__wrapper').first().click();
    cy.get('.modal__title').contains('cat');
  });

  it('opens and closes modal window with card content', () => {
    cy.visit('/');
    cy.get('.search__input').type('cat');
    cy.get('.search__button').click();
    cy.get('.card__wrapper').first().should('exist');
    cy.get('.card__wrapper').first().click();

    cy.get('.modal__wrapper').should('exist');
    cy.get('.modal__close-button').click();
    cy.get('.modal__wrapper').should('not.exist');

    cy.get('.card__wrapper').first().click();
    cy.get('.modal__wrapper').should('exist');
    cy.get('body').click(0, 0);
    cy.get('.modal__wrapper').should('not.exist');
  });

  it('deletes a card from home page', () => {
    cy.visit('/');
    cy.get('.search__input').type('cat');
    cy.get('.search__button').click();
    cy.get('[data-testid="card-10"]').should('exist');
    cy.get('[data-testid="delete-button-10"]').click();
  });

  it('creates a card when form is submitted', () => {
    cy.visit('/cats');

    cy.get('input[name="name"]').type('Cat');
    cy.get('select').select('Persian');
    cy.get('input[name="date"]').type('2023-04-15');
    cy.get('label[for="male"]').click();
    cy.get('input[type="range"]').invoke('val', 75).trigger('change');
    cy.get('.form__checkbox_label').first().click();
    cy.fixture('cat.jpg').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'cat.jpg',
        mimeType: 'image/png',
      });
    });

    cy.get('input[type="range"]').should('have.value', 75);

    cy.get('[type="submit"]').click();
    cy.get('input[type="range"]').should('have.value', 50);

    cy.get('.popup__content').contains('The cat has been created!');
    cy.get('.popup__wrapper').click();
    cy.get('.popup__content').should('not.exist');

    cy.get('.card__title').contains('Cat');
    cy.get('[data-testid="delete-button-1"]').click();
  });

  it('shows error tooltip when the form is invalid', () => {
    cy.visit('/cats');

    cy.get('[type="submit"]').click();
    cy.get('.error').eq(0).contains('Enter a name');
    cy.get('.error').eq(1).contains('Select a breed');
    cy.get('.error').eq(2).contains('Enter a date of birth');
    cy.get('.error').eq(3).contains('Select a gender');
    cy.get('.error').eq(4).contains('Select at least one meal');
    cy.get('.error').eq(5).contains('Upload an image');

    cy.get('input[name="name"]').type('cat');
    cy.get('[type="submit"]').click();
    cy.get('.error')
      .eq(0)
      .contains(
        'The name must start with a capital letter and be between 3 and 12 characters long'
      );

    cy.get('input[name="date"]').type('2030-04-15');
    cy.get('[type="submit"]').click();
    cy.get('.error').eq(2).contains('Max value must be');
  });

  it('Just a test to remove page load on coverage saving', () => {
    expect(true).to.equal(true);
  });
});
