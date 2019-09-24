describe('Participant', () => {
  beforeEach(() => {
    cy.visit('');
    cy.contains('Player').click();
    cy.get("[placeholder='Your name']").type('MyTest');
    cy.contains('Doe mee').click();
  });

  it('can join', () => {
    cy.contains('Pas').should('exist');
    cy.get("[data-testid='buzzer']").should('exist');
  });

  it('can press buzzer', () => {
    cy.get("[data-testid='buzzer']").click();
    cy.get("[data-testid='buzzer']").should(
      'have.css',
      'filter',
      'grayscale(0)'
    );
  });
});
