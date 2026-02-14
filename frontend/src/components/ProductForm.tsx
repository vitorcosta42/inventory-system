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
  const [price, setPrice] = useState(product?.price ?? 0);
  const [productMaterials, setProductMaterials] = useState<ProductMaterial[]>(
    () => product?.materials ?? [],
  );

  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);

  const [editingMaterialId, setEditingMaterialId] = useState<number | null>(
    null,
  );

  const [quantity, setQuantity] = useState(1);
  const selectedMatObj = materials.find((m) => m.id === selectedMaterial);

  const maxQuantity = selectedMatObj ? selectedMatObj.stock : undefined;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setProductMaterials(product.materials);
    } else {
      setName("");
      setPrice(0);
      setProductMaterials([]);
    }
  }, [product]);

  const handleAddMaterial = () => {
    if (selectedMaterial === null || quantity <= 0) return;

    const existingIndex = productMaterials.findIndex(
      (m) => m.material.id === selectedMaterial,
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
          material: { id: selectedMaterial },
        },
      ]);
    }

    // reset edição
    setEditingMaterialId(null);
    setSelectedMaterial(null);
    setQuantity(1);
  };

  const handleEditMaterial = (pm: ProductMaterial) => {
    setSelectedMaterial(pm.material.id);
    setQuantity(pm.quantity);
    setEditingMaterialId(pm.material.id);
  };

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Remove a material from the product materials list
   * @param materialId The id of the material to remove
   */
  /*******  e2c16eea-6bbc-43bf-b2a3-6a1f4ee15fed  *******/
  const handleRemoveMaterial = (materialId: number) => {
    setProductMaterials(
      productMaterials.filter((m) => m.material.id !== materialId),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameExists = allProducts.some(
      (p) =>
        p.name.toLowerCase() === name.toLowerCase() && p.id !== product?.id,
    );

    if (nameExists) {
      alert("Já existe um produto com este nome!");
      return;
    }

    const newProduct: Omit<Product, "id"> & Partial<Product> = {
      name,
      price,
      materials: productMaterials,
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, ...newProduct }).unwrap();
      } else {
        await addProduct(newProduct).unwrap();
      }

      await refetchMaterials();

      setName("");
      setPrice(0);
      setProductMaterials([]);
      setSelectedMaterial("");
      setQuantity(1);

      onCancel();
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
      <h2 className="text-xl font-bold mb-4">
        {product ? "Editar Produto" : "Novo Produto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
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

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="number"
            value={price}
            min={0}
            step={0.01}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Preço do produto "
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
                setSelectedMaterial(
                  e.target.value ? Number(e.target.value) : null,
                )
              }
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
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (maxQuantity !== undefined && val > maxQuantity)
                  val = maxQuantity;
                setQuantity(val);
              }}
              disabled={!selectedMaterial}
              className="w-24 px-3 py-2 border rounded-md"
            />

            <button
              type="button"
              onClick={handleAddMaterial}
              className="bg-blue-600 text-white px-4 rounded-md"
              disabled={!selectedMaterial}
            >
              Adicionar
            </button>
          </div>

          {productMaterials.map((pm) => {
            const mat = materials.find((m) => m.id === pm.material.id);

            return (
              <li
                key={pm.material?.id}
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
            className="bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
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
