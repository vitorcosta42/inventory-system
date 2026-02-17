// cypress/support/e2e.ts
import "./commands";

Cypress.Commands.add("mockApi", () => {
  cy.intercept("GET", "/api/materials", {
    statusCode: 200,
    body: [
      { id: "1", name: "Madeira", stock: 100 },
      { id: "2", name: "Parafuso", stock: 200 },
    ],
  }).as("getMaterials");

  cy.intercept("GET", "/api/products", {
    statusCode: 200,
    body: [],
  }).as("getProducts");
});
