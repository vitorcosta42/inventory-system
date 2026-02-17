/// <reference types="cypress" />

describe("Materials E2E", () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit("/materials");
    cy.wait("@getMaterials");
  });
  it("Deve criar um novo material", () => {
    cy.fillMaterialForm("Borracha", "100");

    cy.contains("Material cadastrado com sucesso!").should("exist");
    cy.contains("borracha").should("exist");
  });

  it("Deve editar material existente", () => {
    cy.fillMaterialForm("Borracha", "100");
    cy.get('[data-cy="btn-edit-material"]').first().click();
    cy.get('[data-cy="input-material-stock"]').clear().type("200");
    cy.get('[data-cy="btn-save-material"]').click();

    cy.contains("Material atualizado com sucesso!").should("exist");
  });
});
