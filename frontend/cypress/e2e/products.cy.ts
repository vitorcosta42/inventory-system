/// <reference types="cypress" />

describe("Products E2E", () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit("/products");
    cy.wait("@getMaterials");
    cy.wait("@getProducts");
  });
  it("should create a new product", () => {
    cy.fillProductForm("Mesa", "100", [
      { name: "Madeira", id: "1", quantity: 2 },
    ]);

    cy.contains("Produto cadastrado com sucesso!").should("exist");
    cy.wait("@getProducts");
    cy.contains("Mesa").should("exist");
  });

  it("should not save product without materials", () => {
    cy.get('[data-cy="input-product-name"]').type("Produto Vazio");
    cy.get('[data-cy="input-product-price"]').type("100");
    cy.get('[data-cy="btn-save-product"]').should("be.disabled");
  });

  it("should edit an existing product", () => {
    cy.fillProductForm("Mesa", "200", [
      { name: "Madeira", id: "1", quantity: 2 },
    ]);
    cy.get('[data-cy="btn-edit-product"]').click();

    cy.get('[data-cy="input-product-price"]').clear().type("100");
    cy.get('[data-cy="btn-save-product"]').click();

    cy.contains("Produto atualizado com sucesso!").should("exist");
  });
});
