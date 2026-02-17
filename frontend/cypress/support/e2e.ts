import "./commands";
import type { Product } from "../../src/features/products/productsApi";

Cypress.Commands.add("mockApi", () => {
  const products: Product[] = [];

  const materials: { id: string; name: string; stock: number }[] = [
    { id: "1", name: "Madeira", stock: 100 },
    { id: "2", name: "Parafuso", stock: 200 },
  ];

  cy.intercept("GET", "/api/materials", (req) => {
    req.reply({
      statusCode: 200,
      body: materials,
    });
  }).as("getMaterials");

  cy.intercept("POST", "/api/materials", (req) => {
    const newMaterial = {
      id: String(materials.length + 1),
      ...req.body,
    };

    materials.push(newMaterial);

    req.reply({
      statusCode: 201,
      body: newMaterial,
    });
  }).as("createMaterial");

  cy.intercept("PUT", "/api/materials/*", (req) => {
    const id = req.url.split("/").pop();
    const index = materials.findIndex((m) => m.id === id);

    if (index === -1) {
      return req.reply({ statusCode: 404 });
    }

    materials[index] = {
      ...materials[index],
      ...req.body,
    };

    req.reply({
      statusCode: 200,
      body: materials[index],
    });
  }).as("updateMaterial");

  cy.intercept("GET", "/api/products", (req) => {
    req.reply({
      statusCode: 200,
      body: products,
    });
  }).as("getProducts");

  cy.intercept("POST", "/api/products", (req) => {
    const newProduct = {
      id: String(products.length + 1),
      ...req.body,
    };

    products.push(newProduct);

    req.reply({
      statusCode: 201,
      body: newProduct,
    });
  }).as("createProduct");

  cy.intercept("PUT", "/api/products/*", (req) => {
    const id = req.url.split("/").pop();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return req.reply({ statusCode: 404 });
    }

    products[index] = {
      ...products[index],
      ...req.body,
    };

    req.reply({
      statusCode: 200,
      body: products[index],
    });
  }).as("updateProduct");
});
