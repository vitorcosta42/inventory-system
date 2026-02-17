/// <reference types="cypress" />

/* eslint-disable @typescript-eslint/no-namespace */

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      fillProductForm(
        name: string,
        price: string,
        materials?: { id: string; quantity: number; name: string }[],
      ): Chainable<void>;
      fillMaterialForm(name: string, quantity: string): Chainable<void>;
      mockApi(): Chainable<void>;
    }
  }
}
