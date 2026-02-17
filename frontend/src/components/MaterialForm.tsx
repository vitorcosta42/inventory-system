import React, { useState } from "react";
import {
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useGetMaterialsQuery,
} from "../features/materials/materialsApi";
import { toast } from "react-toastify";

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
  const { data: materials } = useGetMaterialsQuery();

  const [name, setName] = useState(material?.name ?? "");
  const [stock, setStock] = useState<number>(material?.stock ?? 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stock < 0) {
      toast.error("O estoque não pode ser negativo.");
      return;
    }

    const normalizedName = name.trim().toLowerCase();

    const duplicate = materials?.find(
      (m: Material) =>
        m.name.toLowerCase() === normalizedName && m.id !== material?.id,
    );

    if (duplicate) {
      toast.error("Já existe um material com esse nome.");
      return;
    }

    try {
      if (material) {
        await updateMaterial({
          id: material.id,
          name: normalizedName,
          stock,
        }).unwrap();

        toast.success("Material atualizado com sucesso!");
        onCancel();
      } else {
        await addMaterial({
          name: normalizedName,
          stock,
        }).unwrap();

        toast.success("Material cadastrado com sucesso!");

        setName("");
        setStock(0);
      }
    } catch (error) {
      toast.error("Erro ao salvar material.");
      console.error("Erro ao salvar material:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {material ? "Editar Material" : "Novo Material"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Material
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Madeira"
              required
              data-cy="input-material-name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estoque Inicial
            </label>
            <input
              type="number"
              min={0}
              value={stock === 0 ? "" : stock}
              onChange={(e) => {
                const value = e.target.value;
                setStock(value === "" ? 0 : Number(value));
              }}
              placeholder="Ex: 100"
              required
              data-cy="input-material-stock"
              className="w-full px-4 py-2 border border-gray-300 rounded-md 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button
            type="submit"
            data-cy="btn-save-material"
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
