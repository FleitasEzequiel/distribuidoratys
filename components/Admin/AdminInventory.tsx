'use client'

import React, { useState } from "react";
import { AdminProductRow } from "./AdminProductRow";
import { EditProductForm } from "./EditProductForm";
import { editarProducto, crearProducto, eliminarProducto } from "@/app/admin/actions";
import Link from "next/link";

interface AdminInventoryProps {
    initialProducts: any[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
    categories: { id: number; nombre: string }[];
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({
    initialProducts,
    totalPages,
    currentPage,
    totalCount,
    categories
}) => {
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleEdit = (product: any) => {
        setIsCreating(false);
        setEditingProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAddNew = () => {
        setEditingProduct({
            nombre: "",
            categoria: categories.length > 1 ? categories[1].id : 0,
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
        if (data.file && data.file.size > 600 * 1024) {
            setErrorMessage("La imagen es demasiado grande. El tamaño máximo permitido es 600KB.");
            return;
        }

        const formData = new FormData();
        formData.append('nombre', data.nombre);
        formData.append('categoria', data.categoria);
        formData.append('precio', data.precio.toString());
        formData.append('descripcion', data.descripcion);
        if (data.file) {
            formData.append('file', data.file);
        }

        try {
            let result: { success: boolean, message?: string };
            if (isCreating) {
                result = await crearProducto(formData);
            } else {
                result = await editarProducto(id, formData);
            }

            if (result.success) {
                setEditingProduct(null);
                setIsCreating(false);
            } else {
                setErrorMessage(result.message || "Error al procesar el producto. Comprueba que el archivo cargado sea correcto o intenta nuevamente.");
            }
        } catch (error: any) {
            console.error("Error al guardar:", error);
            setErrorMessage(error.message || "Error de conexión con el servidor. Es posible que el archivo sea demasiado pesado o no haya internet.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                const result = await eliminarProducto(id);
                if (!result.success) {
                    setErrorMessage("Error al eliminar el producto. Intenta nuevamente.");
                }
            } catch (error: any) {
                console.error("Error al eliminar:", error);
                setErrorMessage("Falló la conexión al intentar eliminar el producto.");
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
                    categories={categories}
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
                        Mostrando {initialProducts.length} de {totalCount} productos
                    </p>
                    <div className="flex items-center gap-2">
                        {currentPage > 1 && (
                            <Link
                                href={`/admin?page=${currentPage - 1}`}
                                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </Link>
                        )}

                        <div className="flex items-center gap-1 mx-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <Link
                                    key={p}
                                    href={`/admin?page=${p}`}
                                    className={`flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold transition-colors ${p === currentPage
                                        ? 'bg-[#3994ef] text-white'
                                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
                                        }`}
                                >
                                    {p}
                                </Link>
                            ))}
                        </div>

                        {currentPage < totalPages && (
                            <Link
                                href={`/admin?page=${currentPage + 1}`}
                                className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                            >
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Error */}
            {errorMessage && (
                <div aria-labelledby="error-modal-title" aria-modal="true" className="fixed inset-0 z-50 overflow-y-auto" role="dialog">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setErrorMessage(null)}></div>
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-slate-100 dark:border-slate-800">
                            <div className="bg-white dark:bg-slate-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4 border-b border-slate-100 dark:border-slate-800 transition-colors">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                                        <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <h3 className="text-xl font-bold leading-6 text-slate-900 dark:text-white" id="error-modal-title">Operación denegada</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{errorMessage}</p>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => setErrorMessage(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-500 transition-colors">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-4 sm:flex sm:flex-row-reverse sm:px-6 gap-3 border-t border-slate-100 dark:border-slate-800 transition-colors">
                                <button
                                    onClick={() => setErrorMessage(null)}
                                    className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-3 text-sm font-bold text-white shadow-sm hover:bg-red-500 sm:w-auto transition-all items-center gap-2"
                                    type="button"
                                >
                                    Entendido
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
