import React from "react";
import type { Product } from "../features/products/productsApi";
import { useDeleteProductMutation } from "../features/products/productsApi";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit }) => {
  const [deleteProduct] = useDeleteProductMutation();

  const sortedProducts = [...products].sort((a, b) => b.price - a.price);

  if (sortedProducts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-slate-100 rounded-full p-4 mb-4">
          <span className="text-2xl">📦</span>
        </div>
        <p className="text-slate-500 font-medium text-lg">
          Nenhum produto cadastrado.
        </p>
        <p className="text-slate-400 text-sm">
          Adicione um novo produto acima para começar.
        </p>
      </div>
    );

  return (
    <div className="w-full">
      <div className="sm:flex gap-6 max-md:hidden overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Nome
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
                Preço
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {sortedProducts.map((product) => (
              <tr
                key={product.id}
                className="group hover:bg-slate-50/80 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono text-slate-400">
                  #{String(product.id).slice(-4)}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-emerald-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </td>

                <td className="px-6 py-4 text-right text-sm font-medium flex gap-2 justify-end">
                  <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md transition-all"
                    data-cy="btn-edit-product"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm("Deseja realmente excluir este produto?")
                      ) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-all"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden space-y-4">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">
                #{String(product.id).slice(-4)}
              </span>

              <span className="text-sm font-semibold text-emerald-600">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-900">
              {product.name}
            </h3>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-md transition-all"
              >
                Editar
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm("Deseja realmente excluir este produto?")
                  ) {
                    deleteProduct(product.id);
                  }
                }}
                className="flex-1 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
