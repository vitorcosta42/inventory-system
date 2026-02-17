import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MaterialForm from "../MaterialForm";
import * as Toast from "react-toastify";

vi.mock("react-toastify", () => {
  return {
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

import { toast } from "react-toastify";
const toastSuccess = vi.spyOn(toast, "success");
const toastError = vi.spyOn(toast, "error");

// Mock das queries/mutations do Redux
const mockAddMaterial = vi.fn(() => ({ unwrap: () => Promise.resolve() }));
const mockUpdateMaterial = vi.fn(() => ({ unwrap: () => Promise.resolve() }));

vi.mock("../../features/materials/materialsApi", () => ({
  useAddMaterialMutation: () => [mockAddMaterial],
  useUpdateMaterialMutation: () => [mockUpdateMaterial],
  useGetMaterialsQuery: () => ({
    data: [
      { id: "1", name: "Madeira", stock: 50 },
      { id: "2", name: "Aço", stock: 30 },
    ],
    isLoading: false,
    refetch: vi.fn(),
  }),
}));

describe("MaterialForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a new material", async () => {
    render(<MaterialForm material={null} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByTestId("input-material-name"), {
      target: { value: "Borracha" },
    });

    fireEvent.change(screen.getByTestId("input-material-stock"), {
      target: { value: "20" },
    });

    fireEvent.click(screen.getByTestId("btn-save-material"));

    await waitFor(() => {
      expect(mockAddMaterial).toHaveBeenCalledWith({
        name: "borracha",
        stock: 20,
      });

      expect(Toast.toast.success).toHaveBeenCalledWith(
        "Material cadastrado com sucesso!",
      );
    });
  });

  it("should prevent duplicate materials", async () => {
    render(<MaterialForm material={null} onCancel={vi.fn()} />);

    fireEvent.change(screen.getByTestId("input-material-name"), {
      target: { value: "Madeira" },
    });

    fireEvent.change(screen.getByTestId("input-material-stock"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByTestId("btn-save-material"));

    expect(toastError).toHaveBeenCalledWith(
      "Já existe um material com esse nome.",
    );
  });

  it("should update an existing material", async () => {
    const material = { id: "1", name: "Madeira", stock: 50 };

    render(<MaterialForm material={material} onCancel={vi.fn()} />);
    fireEvent.change(screen.getByTestId("input-material-name"), {
      target: { value: "madeira Premium" },
    });

    fireEvent.change(screen.getByTestId("input-material-stock"), {
      target: { value: "60" },
    });
    fireEvent.click(screen.getByTestId("btn-save-material"));
    await waitFor(() => {
      expect(mockUpdateMaterial).toHaveBeenCalledWith({
        name: "madeira premium",
        stock: 60,
        id: "1",
      });
    });

    expect(toastSuccess).toHaveBeenCalledWith(
      "Material atualizado com sucesso!",
    );
  });
});
