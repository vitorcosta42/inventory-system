Cypress.Commands.add(
  "fillProductForm",
  (
    name: string,
    price: string,
    materials: { name: string; quantity: number }[] = [],
  ) => {
    cy.get('[data-cy="input-product-name"]').clear().type(name);
    cy.get('[data-cy="input-product-price"]').clear().type(price);

    materials.forEach((m) => {
      cy.get('[data-cy="select-material"]').select(m.name);
      cy.get('[data-cy="input-material-quantity[0]"]')
        .clear()
        .type(String(m.quantity));
      cy.get('[data-cy="btn-add-material"]').click();
    });

    cy.get('[data-cy="btn-save-product"]').click();
  },
);

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
