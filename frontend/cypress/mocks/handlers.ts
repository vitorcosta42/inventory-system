import { setupWorker, rest } from "msw";

const materialsMock = [
  { id: "1", name: "Madeira", stock: 100 },
  { id: "2", name: "Parafuso", stock: 200 },
];

export const handlers = [
  rest.get("/api/materials", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(materialsMock));
  }),
  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];

export const worker = setupWorker(...handlers);
