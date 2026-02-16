import React, { useState } from "react";
import { MaterialForm, MaterialList } from "../components";

interface Material {
  id: string;
  name: string;
  stock: number;
}
const MaterialsPage: React.FC = () => {
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  return (
    <div className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Gerenciamento de Inventário
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Controle seus materiais, estoque e edite informações em tempo real.
          </p>
        </div>
        <section className="mb-10">
          <MaterialForm
            key={editingMaterial?.id ?? "new"}
            material={editingMaterial}
            onCancel={() => setEditingMaterial(null)}
          />
        </section>
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">
              Materiais Cadastrados
            </h3>
          </div>
          <div className="p-0">
            <MaterialList onEdit={setEditingMaterial} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default MaterialsPage;
