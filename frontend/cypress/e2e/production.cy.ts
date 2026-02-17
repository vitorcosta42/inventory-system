/// <reference types="cypress" />

describe("Production E2E", () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit("/products");
    cy.wait("@getMaterials");
    cy.wait("@getProducts");
    cy.fillProductForm("Mesa", "100", [
      { name: "Madeira", id: "1", quantity: 2 },
    ]);

    cy.contains("Produto cadastrado com sucesso!").should("exist");
    cy.wait("@getProducts");
    cy.contains("Mesa").should("exist");

    cy.visit("/production");
    cy.wait("@getMaterials");
    cy.wait("@getProducts");
  });

  it("Deve visualizar os produtos possíveis de produção", () => {
    cy.contains("Mesa").should("exist");
  });
});
