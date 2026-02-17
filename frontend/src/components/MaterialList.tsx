import React from "react";
import {
  useGetMaterialsQuery,
  useDeleteMaterialMutation,
} from "../features/materials/materialsApi";
import { DeleteIcon, EditIcon } from "./icons";

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
    <div className="w-full">
      <div className="sm:flex max-md:hidden  bg-white rounded-b-xl overflow-x-auto">
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
              <tr
                key={material.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono text-slate-400">
                  #{String(material.id).slice(-4)}
                </td>

                <td className="px-6 py-4 font-semibold text-slate-800">
                  {material.name}
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {material.stock} unidades
                </td>

                <td className="px-6 py-4 text-right flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(material)}
                    className="p-2 text-slate-400 hover:cursor-pointer hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    data-cy="btn-edit-material"
                    title="Editar"
                  >
                    <EditIcon size={20} />
                  </button>

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
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors hover:cursor-pointer"
                    title="Excluir"
                  >
                    <DeleteIcon size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden space-y-4">
        {materials.map((material) => (
          <div
            key={material.id}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-slate-400">
                #{String(material.id).slice(-4)}
              </span>

              <span
                className={`text-sm font-semibold ${
                  material.stock > 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {material.stock} un.
              </span>
            </div>

            <h3 className="text-base font-semibold text-slate-900">
              {material.name}
            </h3>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(material)}
                className="flex-1 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-600 rounded-md transition-all hover:cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={async () => {
                  if (
                    window.confirm(`Deseja realmente excluir ${material.name}?`)
                  ) {
                    try {
                      await deleteMaterial(material.id).unwrap();
                    } catch (err) {
                      console.error("Erro ao excluir:", err);
                    }
                  }
                }}
                className="flex-1 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-all hover:cursor-pointer"
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

export default MaterialList;
