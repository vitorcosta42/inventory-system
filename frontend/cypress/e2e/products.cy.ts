/// <reference types="cypress" />

describe("Products E2E", () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit("/products");
    cy.wait("@getMaterials");
    cy.wait("@getProducts");
  });
  it("Deve criar um novo produto", () => {
    cy.fillProductForm("Mesa", "100", [
      { name: "Madeira", id: "1", quantity: 2 },
    ]);

    cy.contains("Produto cadastrado com sucesso!").should("exist");
    cy.wait("@getProducts");
    cy.contains("Mesa").should("exist");
  });

  it("Não deve salvar produto sem materiais", () => {
    cy.get('[data-cy="input-product-name"]').type("Produto Vazio");
    cy.get('[data-cy="input-product-price"]').type("100");
    cy.get('[data-cy="btn-save-product"]').should("be.disabled");
  });

  it("Deve editar produto existente", () => {
    cy.fillProductForm("Mesa", "200", [
      { name: "Madeira", id: "1", quantity: 2 },
    ]);
    cy.get('[data-cy="btn-edit-product"]').click();

    cy.get('[data-cy="input-product-price"]').clear().type("100");
    cy.get('[data-cy="btn-save-product"]').click();

    cy.contains("Produto atualizado com sucesso!").should("exist");
  });
});
