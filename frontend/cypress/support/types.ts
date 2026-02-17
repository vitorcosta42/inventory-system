/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    fillProductForm(name: string, price: string): Chainable<void>;
  }
}
