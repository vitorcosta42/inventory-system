/// <reference types="cypress" />

describe("ProductForm E2E", () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit("/products");
    cy.wait("@getMaterials");
    cy.wait("@getProducts");
  });
  it("Deve criar um novo produto", () => {
    cy.fillProductForm("Produto Teste", "100", [
      { name: "Material", quantity: 2 },
      { name: "Parafuso", quantity: 1 },
    ]);

    cy.contains("Produto cadastrado com sucesso!").should("exist");

    cy.contains("Produto Teste").should("exist");
  });

  it("Não deve salvar produto sem materiais", () => {
    cy.get('[data-cy="input-product-name"]').type("Produto Vazio");
    cy.get('[data-cy="input-product-price"]').type("100");
    cy.get('[data-cy="btn-save-product"]').should("be.disabled");
  });

  it("Deve editar material existente antes de salvar", () => {
    cy.fillProductForm("Produto Edit", "200", [
      { name: "Madeira", quantity: 2 },
    ]);

    cy.contains("Editar").click();
    cy.get('input[type="number"]').clear().type("5");
    cy.contains("Atualizar").click();

    cy.get('[data-cy="btn-save-product"]').click();

    cy.contains("Produto cadastrado com sucesso!").should("exist");
  });
});
