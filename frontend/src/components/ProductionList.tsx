import React from "react";
import { useGetProductsQuery } from "../features/products/productsApi";
import { useGetMaterialsQuery } from "../features/materials/materialsApi";
import type {
  Product,
  ProductMaterial,
} from "../features/products/productsApi";
import type { Material } from "../features/materials/types";
import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "./icons";
interface ProductionResult {
  max: number;
  limitingMaterial: Material | null;
}

const ProductionList: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProduct = (product: Product) => {
    navigate("/products", { state: { product } });
  };

  const { data: products = [] } = useGetProductsQuery();
  const uniqueProducts = Object.values(
    products.reduce((acc: Record<string, Product>, product: Product) => {
      if (!acc[product.name]) {
        acc[product.name] = product;
      }
      return acc;
    }, {}),
  );

  const { data: materials = [] } = useGetMaterialsQuery();

  const calculateProduction = (product: Product): ProductionResult => {
    if (!product.materials || product.materials.length === 0) {
      return { max: 0, limitingMaterial: null };
    }

    const calculations = product.materials.map((pm: ProductMaterial) => {
      const mat = materials.find((m: Material) => m.id === pm.material.id);

      if (!mat || pm.quantity <= 0) {
        return { possible: 0, material: null };
      }

      return {
        possible: Math.floor(mat.stock / pm.quantity),
        material: mat,
      };
    });

    const min = Math.min(...calculations.map((c) => c.possible));
    const limiting = calculations.find((c) => c.possible === min);

    return {
      max: min,
      limitingMaterial: limiting?.material ?? null,
    };
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-bold mb-6">Produção Possível</h2>

      {uniqueProducts.map((product: Product) => {
        const { max, limitingMaterial } = calculateProduction(product);

        return (
          <div
            key={product.id}
            className="mb-6 border rounded-md p-4 bg-slate-50"
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
              {product.name}
              <button
                onClick={() => handleCreateProduct(product)}
                className="text-blue-500 hover:text-blue-700 font-bold"
                title="Criar produto"
              >
                <ArrowRightIcon size={24} />
              </button>
            </h3>

            <p className="mb-3">
              <span className="font-semibold">Produção máxima:</span>{" "}
              <span className="text-blue-600 font-bold text-lg">{max}</span>
            </p>

            {limitingMaterial && (
              <p className="text-sm text-red-500 mb-3">
                ⚠ Material limitante: {limitingMaterial.name}
              </p>
            )}

            <table className="min-w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left py-1">Material</th>
                  <th className="text-left py-1">Necessário/unidade</th>
                  <th className="text-left py-1">Em estoque</th>
                  <th className="text-left py-1">Produção possível</th>
                </tr>
              </thead>
              <tbody>
                {product.materials.map((pm: ProductMaterial) => {
                  const mat = materials.find(
                    (m: Material) => m.id === pm.material.id,
                  );

                  const possible =
                    mat && pm.quantity > 0
                      ? Math.floor(mat.stock / pm.quantity)
                      : 0;

                  return (
                    <tr key={pm.material.id} className="border-t">
                      <td className="py-1">
                        {mat?.name ?? "Material não encontrado"}
                      </td>
                      <td className="py-1">{pm.quantity}</td>
                      <td className="py-1">{mat?.stock ?? 0}</td>
                      <td
                        className={`py-1 font-semibold ${
                          possible === max ? "text-red-500" : "text-gray-700"
                        }`}
                      >
                        {possible}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default ProductionList;
