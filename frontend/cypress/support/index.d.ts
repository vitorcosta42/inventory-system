/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      fillProductForm(
        name: string,
        price: string,
        materials?: { name: string; quantity: number; id: string }[],
      ): Chainable<void>;
      fillMaterialForm(name: string, quantity: string): Chainable<void>;
      mockApi(): Chainable<void>;
    }
  }
}

export {};
