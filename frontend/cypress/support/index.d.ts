/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Preenche o formulário de produto
     */
    fillProductForm(
      name: string,
      price: string,
      materials?: { name: string; quantity: number }[],
    ): Chainable<void>;

    /**
     * Mocka a API de produtos e materiais
     */
    mockApi(): Chainable<void>;
  }
}
