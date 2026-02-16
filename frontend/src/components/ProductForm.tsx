import React, { useState, useEffect } from "react";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductsQuery,
} from "../features/products/productsApi";
import type {
  Product,
  ProductMaterial,
} from "../features/products/productsApi";
import { useGetMaterialsQuery } from "../features/materials/materialsApi";

import { toast } from "react-toastify";

interface ProductFormProps {
  product: Product | null;
  onCancel: () => void;
  onSave: (product: Product | Omit<Product, "id">) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onCancel }) => {
  const { data: allProducts = [] } = useGetProductsQuery();
  const {
    data: materials = [],
    isLoading,
    refetch: refetchMaterials,
  } = useGetMaterialsQuery();

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState<string>(
    product ? String(product.price) : "",
  );

  const [productMaterials, setProductMaterials] = useState<ProductMaterial[]>(
    () => product?.materials ?? [],
  );

  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(
    null,
  );

  const [quantity, setQuantity] = useState(0);
  const selectedMatObj = materials.find(
    (m) => String(m.id) === selectedMaterial,
  );

  const maxQuantity = selectedMatObj ? selectedMatObj.stock : undefined;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setProductMaterials(product.materials);
    } else {
      setName("");
      setPrice("");
      setProductMaterials([]);
    }
  }, [product]);

  const handleAddMaterial = () => {
    if (!selectedMaterial || quantity <= 0 || !selectedMatObj) return;

    const existingIndex = productMaterials.findIndex(
      (m) => String(m.material.id) === String(selectedMaterial),
    );

    if (existingIndex !== -1) {
      const updatedMaterials = [...productMaterials];
      updatedMaterials[existingIndex] = {
        ...updatedMaterials[existingIndex],
        quantity,
      };
      setProductMaterials(updatedMaterials);
    } else {
      setProductMaterials([
        ...productMaterials,
        {
          quantity,
          material: selectedMatObj,
        },
      ]);
    }

    setEditingMaterialId(null);
    setSelectedMaterial(null);
    setQuantity(0);
  };

  const handleCancel = () => {
    setName("");
    setPrice("");
    setProductMaterials([]);
    setSelectedMaterial("");
    setQuantity(0);

    setEditingMaterialId(null);
    setQuantity(0);

    onCancel();
  };

  const handleEditMaterial = (pm: ProductMaterial) => {
    setSelectedMaterial(String(pm.material.id));
    setQuantity(pm.quantity);
    setEditingMaterialId(String(pm.material.id));
  };

  const handleRemoveMaterial = (materialId: string) => {
    setProductMaterials(
      productMaterials.filter(
        (m) => String(m.material?.id) !== String(materialId),
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseProductWithSameName = allProducts.find(
      (p) =>
        p.name.toLowerCase() === name.toLowerCase() && p.id !== product?.id,
    );

    if (baseProductWithSameName) {
      const baseMaterials = baseProductWithSameName.materials;

      const errors: string[] = [];

      const extraMaterials = productMaterials.filter(
        (pm) =>
          !baseMaterials.some(
            (bm) => String(bm.material.id) === String(pm.material.id),
          ),
      );

      if (extraMaterials.length > 0) {
        errors.push(
          `Materiais não permitidos: ${extraMaterials
            .map((m) => m.material.name)
            .join(", ")}`,
        );
      }

      const missingMaterials = baseMaterials.filter(
        (bm) =>
          !productMaterials.some(
            (pm) => String(pm.material.id) === String(bm.material.id),
          ),
      );

      if (missingMaterials.length > 0) {
        errors.push(
          `Materiais obrigatórios ausentes: ${missingMaterials
            .map((m) => m.material.name)
            .join(", ")}`,
        );
      }

      const wrongQuantities = productMaterials.filter((pm) => {
        const base = baseMaterials.find(
          (bm) => String(bm.material.id) === String(pm.material.id),
        );

        return base && base.quantity !== pm.quantity;
      });

      if (wrongQuantities.length > 0) {
        errors.push(
          `Quantidade incorreta para: ${wrongQuantities
            .map((m) => {
              const base = baseMaterials.find(
                (bm) => String(bm.material.id) === String(m.material.id),
              );
              return `${m.material.name} (correto: ${base?.quantity})`;
            })
            .join(", ")}`,
        );
      }

      if (errors.length > 0) {
        errors.forEach((error) => {
          toast.error(error, {
            position: "top-right",
            autoClose: 4000,
          });
        });
        return;
      }
    }

    const newProduct: Omit<Product, "id"> & Partial<Product> = {
      name,
      price: Number(price),
      materials: productMaterials,
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, ...newProduct }).unwrap();
        toast.success("Produto atualizado com sucesso!");
      } else {
        await addProduct(newProduct).unwrap();
        toast.success("Produto cadastrado com sucesso!");
      }

      await refetchMaterials();

      setName("");
      setPrice("");
      setProductMaterials([]);
      setSelectedMaterial("");
      setQuantity(1);

      onCancel();
    } catch (err) {
      toast.error("Erro ao salvar produto. Verifique os dados.");
      console.error("Erro ao salvar produto:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
      <h2 className="text-xl font-bold mb-4">
        {product ? "Editar Produto" : "Novo Produto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Nome do Produto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do produto"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço do produto"
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="border p-4 rounded-md">
          <h3 className="font-semibold mb-3">Matérias-Primas</h3>
          <div className="flex gap-3 mb-3">
            <select
              value={selectedMaterial ?? ""}
              onChange={(e) =>
                setSelectedMaterial(e.target.value ? e.target.value : null)
              }
              className="flex-1 px-3 py-2 border rounded-md"
            >
              <option value="">Selecione</option>
              {isLoading ? (
                <option disabled>Carregando...</option>
              ) : (
                materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.stock} disponíveis)
                  </option>
                ))
              )}
            </select>

            <input
              type="number"
              min={0}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (maxQuantity !== undefined && val > maxQuantity)
                  val = maxQuantity;
                setQuantity(val);
              }}
              disabled={!selectedMaterial}
              className="w-24 px-3 py-2 border rounded-md  disabled:cursor-not-allowed"
            />

            <button
              type="button"
              onClick={handleAddMaterial}
              className="bg-blue-600 text-white px-4 rounded-md"
              disabled={!selectedMaterial}
            >
              {editingMaterialId ? "Atualizar" : "Adicionar"}
            </button>
          </div>

          {productMaterials.map((pm, index) => {
            const mat = materials.find((m) => m.id === pm.material?.id);
            return (
              <li
                key={`${pm.material?.id}-${index}`}
                className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded"
              >
                <div>
                  <span className="font-semibold">Material:</span> {mat?.name} |{" "}
                  <span className="font-semibold">Quantidade:</span>{" "}
                  {pm.quantity}
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEditMaterial(pm)}
                    className="text-blue-600"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(pm.material.id)}
                    className="text-red-500"
                  >
                    Remover
                  </button>
                </div>
              </li>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={productMaterials.length === 0}
            className="bg-green-600 text-white px-6 py-2 rounded-md 
           disabled:bg-gray-400 
           disabled:cursor-not-allowed"
          >
            Salvar
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 px-6 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
