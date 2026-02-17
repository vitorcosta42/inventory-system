import { rest } from "msw";

export const handlers = [
  rest.get("/api/materials", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: "1", name: "Madeira", stock: 100 },
        { id: "2", name: "Parafuso", stock: 200 },
      ]),
    );
  }),

  rest.get("/api/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),
];
