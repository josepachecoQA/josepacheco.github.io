// Cypress support file para configurações globais e custom commands

// Desabilitar exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Custom command para fazer login (se necessário no futuro)
Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command para verificar seção visível
Cypress.Commands.add('checkSectionVisible', (sectionId) => {
  cy.get(`#${sectionId}`).should('be.visible');
  cy.get(`#${sectionId} .section-title`).should('be.visible');
});
