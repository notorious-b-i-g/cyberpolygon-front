describe('Home page', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Киберполигон');
  });
});
