Cypress.Commands.add(
  "fillProductForm",
  (
    name: string,
    price: string,
    materials: { id: string; quantity: number }[] = [],
  ) => {
    cy.get('[data-cy="input-product-name"]').clear().type(name);
    cy.get('[data-cy="input-product-price"]').clear().type(price);

    materials.forEach((m, index) => {
      cy.get('[data-cy="select-material"]').select(m.id);

      cy.get('[data-cy="input-material-quantity"]')
        .eq(index)
        .clear()
        .type(String(m.quantity));

      cy.get('[data-cy="btn-add-material"]').click();
    });

    cy.get('[data-cy="btn-save-product"]').click();
  },
);
Cypress.Commands.add("fillMaterialForm", (name: string, price: string) => {
  cy.get('[data-cy="input-material-name"]').clear().type(name);
  cy.get('[data-cy="input-material-stock"]').clear().type(price);

  cy.get('[data-cy="btn-save-material"]').click();
});
