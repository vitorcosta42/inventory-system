import React, { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import type { Product } from "../features/products/productsApi";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} from "../features/products/productsApi";

const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const handleSave = async (product: Product | Omit<Product, "id">) => {
    try {
      if ("id" in product && editingProduct) {
        await updateProduct(product as Product).unwrap();
      } else {
        await addProduct(product as Omit<Product, "id">).unwrap();
      }
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto 1:", error);
    }
  };

  const handleEdit = (product: Product) => setEditingProduct(product);
  const handleCancel = () => setEditingProduct(null);

  if (isLoading) return <p>Carregando produtos...</p>;
  if (isError) return <p>Erro ao carregar produtos!</p>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Catálogo de Produtos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white rounded-2xl shadow-sm border">
            <div className="p-6">
              <ProductForm
                product={editingProduct}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border">
            <div className="overflow-x-auto">
              <ProductList products={products} onEdit={handleEdit} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
