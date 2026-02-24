'use client'

import React, { useState } from "react";
import { AdminProductRow } from "./AdminProductRow";
import { EditProductForm } from "./EditProductForm";
import { editarProducto, crearProducto, eliminarProducto } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/constants";

interface AdminInventoryProps {
    initialProducts: any[];
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({ initialProducts }: { initialProducts: any[] }) => {
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEdit = (product: any) => {
        setIsCreating(false);
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddNew = () => {
        setEditingProduct({
            nombre: "",
            categoria: CATEGORIES[1].id,
            precio: 0,
            descripcion: "",
            imagen: ""
        });
        setIsCreating(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setIsCreating(false);
    };

    const handleSave = async (id: string, data: any) => {
        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('categoria', data.categoria);
        formData.append('precio', data.precio.toString());
        formData.append('descripcion', data.descripcion);
        if (data.file) {
            formData.append('file', data.file);
        }

        let result;
        if (isCreating) {
            result = await crearProducto(formData);
        } else {
            result = await editarProducto(id, formData);
            console.log("acá", result)
        }

        if (result.success) {
            setEditingProduct(null);
            setIsCreating(false);
        } else {
            alert("Error al procesar el producto");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            const result = await eliminarProducto(id);
            if (!result.success) {
                alert("Error al eliminar el producto");
            }
        }
    };

    return (
        <>
            {/* Header con botón de agregar */}
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Inventario de Productos</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Gestiona los niveles de stock y categorías de tus suministros.</p>
                </div>
                <button
                    onClick={handleAddNew}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3994ef] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#3994ef]/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3994ef]"
                >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                    Agregar Nuevo Producto
                </button>
            </div>

            {editingProduct && (
                <EditProductForm
                    product={editingProduct}
                    isNew={isCreating}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            )}

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm leading-6">
                        <thead className="border-b border-slate-200 bg-slate-50/50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-4 font-medium">Imagen</th>
                                <th className="px-6 py-4 font-medium">Nombre del Producto</th>
                                <th className="px-6 py-4 font-medium">Categoría</th>
                                <th className="px-6 py-4 text-right font-medium">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {initialProducts.map((product) => (
                                <AdminProductRow
                                    key={product.id}
                                    product={product}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Simple Pagination / Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Mostrando {initialProducts.length} productos
                    </p>
                    <div className="flex gap-2">
                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
