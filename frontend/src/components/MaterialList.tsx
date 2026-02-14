import React from "react";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
} from "../features/materials/materialsApi";

interface Material {
  id: string;
  name: string;
  stock: number;
}

interface MaterialListProps {
  onEdit: (material: Material) => void;
}

const MaterialList: React.FC<MaterialListProps> = ({ onEdit }) => {
  const { data: materials = [], isLoading, isError } = useGetMaterialsQuery();
  const [deleteMaterial] = useDeleteMaterialMutation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-b-xl">
        <p className="text-slate-500 font-medium">Carregando materiais...</p>
      </div>
    );
  }

  if (isError || materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-b-xl">
        <p className="text-slate-500 font-medium">
          {isError
            ? "Erro ao carregar materiais."
            : "Nenhuma matéria-prima encontrada."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-b-xl">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
              ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
              Material
            </th>
            <th className="px-6 py-4 text-left text-xs font-bold uppercase text-slate-500">
              Estoque
            </th>
            <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-500">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-slate-50 transition-all">
              <td className="px-6 py-4">#{String(material.id).slice(-4)}</td>

              <td className="px-6 py-4 font-semibold">{material.name}</td>

              <td className="px-6 py-4">{material.stock} unidades</td>

              <td className="px-6 py-4 text-right flex justify-end gap-2">
                {/* BOTÃO EDITAR */}
                <button
                  onClick={() => onEdit(material)}
                  className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  ✏️
                </button>

                {/* BOTÃO EXCLUIR */}
                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Deseja realmente excluir ${material.name}?`,
                      )
                    ) {
                      try {
                        await deleteMaterial(material.id).unwrap();
                      } catch (err) {
                        console.error("Erro ao excluir:", err);
                      }
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialList;
