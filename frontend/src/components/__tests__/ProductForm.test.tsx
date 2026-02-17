import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import ProductForm from "../ProductForm";

const mockAddProduct = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
const mockUpdateProduct = vi.fn(() => ({ unwrap: () => Promise.resolve() }));

vi.mock("../../features/products/productsApi", () => ({
  useGetProductsQuery: () => ({ data: [] }),
  useAddProductMutation: () => [mockAddProduct],
  useUpdateProductMutation: () => [mockUpdateProduct],
}));

vi.mock("../../features/materials/materialsApi", () => ({
  useGetMaterialsQuery: () => ({
    data: [
      { id: "1", name: "Madeira", stock: 50 },
      { id: "2", name: "Aço", stock: 30 },
    ],
    isLoading: false,
    refetch: vi.fn(),
  }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

import { toast } from "react-toastify";
const toastSuccess = vi.spyOn(toast, "success");

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a new product with materials", async () => {
    const onCancel = vi.fn();

    render(<ProductForm product={null} onCancel={onCancel} onSave={vi.fn()} />);

    fireEvent.change(screen.getByTestId("input-product-name"), {
      target: { value: "Produto Teste" },
    });
    fireEvent.change(screen.getByTestId("input-product-price"), {
      target: { value: "100" },
    });

    fireEvent.change(screen.getByTestId("select-material"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByTestId("input-material-quantity"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByTestId("btn-add-material"));

    fireEvent.click(screen.getByTestId("btn-save-product"));

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        name: "Produto Teste",
        price: 100,
        materials: [
          {
            quantity: 10,
            material: { id: "1", name: "Madeira", stock: 50 },
          },
        ],
      });
    });

    expect(toastSuccess).toHaveBeenCalledWith(
      "Produto cadastrado com sucesso!",
    );
  });
});
