import React, { useState } from "react";
import {
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useGetMaterialsQuery,
} from "../features/materials/materialsApi";

interface Material {
  id: string;
  name: string;
  stock: number;
}

interface MaterialFormProps {
  material: Material | null;
  onCancel: () => void;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ material, onCancel }) => {
  const [addMaterial] = useAddMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();
  const { data: materials } = useGetMaterialsQuery(); // pega todos os materiais existentes

  const [name, setName] = useState(material?.name ?? "");
  const [stock, setStock] = useState<number>(material?.stock ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stock < 0) return;

    // verifica duplicidade (ignorando o próprio material se estiver editando)
    const duplicate = materials?.find(
      (m: Material) =>
        m.name.toLowerCase() === name.trim().toLowerCase() &&
        m.id !== material?.id,
    );
    if (duplicate) {
      alert("Esse material já está cadastrado!");
      return;
    }

    try {
      if (material) {
        await updateMaterial({
          id: material.id,
          name,
          stock,
        }).unwrap();
        onCancel(); // volta para modo "novo"
      } else {
        await addMaterial({
          name,
          stock,
        }).unwrap();

        // limpa campos após adicionar
        setName("");
        setStock(0);
      }
    } catch (error) {
      console.error("Erro ao salvar material:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {material ? "Editar Material" : "Novo Material"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Material
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-full md:w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estoque
          </label>
          <input
            type="number"
            min="0"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            className={`px-6 py-2 rounded-md font-semibold text-white ${
              material ? "bg-amber-500" : "bg-blue-600"
            }`}
          >
            {material ? "Salvar" : "Adicionar"}
          </button>

          {material && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-md bg-gray-200"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MaterialForm;
