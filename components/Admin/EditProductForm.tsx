import React, { useState, useEffect, useRef } from "react";
import { CATEGORIES } from "@/lib/constants";

interface EditProductFormProps {
    product?: {
        id?: string;
        nombre: string;
        categoria: string;
        precio: number;
        descripcion: string;
        imagen: string;
    } | null;
    isNew?: boolean;
    onCancel: () => void;
    onSave: (id: string, data: any) => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({ product, isNew, onCancel, onSave }) => {
    const [formData, setFormData] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (product) {
            // Extraer el ID de categoría de forma segura
            let currentCatId = CATEGORIES[1].id;
            if (typeof product.categoria === 'object' && product.categoria !== null) {
                currentCatId = (product.categoria as any).id;
            } else if (product.categoria) {
                currentCatId = Number(product.categoria);
            }

            setFormData({
                nombre: product.nombre || "",
                categoria: currentCatId,
                precio: product.precio || 0,
                descripcion: product.descripcion || "",
                imagen: product.imagen || ""
            });
            setPreviewUrl(product.imagen || (product.id ? `https://xjbifzftvlakgoyrnxrz.supabase.co/storage/v1/object/public/Distribuidora%20TyS/${product.id}.png` : null));
        }
    }, [product]);

    if (!product || !formData) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        const keyMap: { [key: string]: string } = {
            'product-name': 'nombre',
            'category': 'categoria',
            'price': 'precio',
            'description': 'descripcion'
        };

        const key = keyMap[id] || id;
        let finalValue: any = value;

        if (id === 'price') {
            finalValue = value === "" ? 0 : parseFloat(value);
            if (isNaN(finalValue)) finalValue = 0;
        } else if (id === 'category') {
            finalValue = Number(value);
            if (isNaN(finalValue)) finalValue = CATEGORIES[1].id;
        }

        setFormData((prev: any) => ({
            ...prev,
            [key]: finalValue
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Pass the file along with the form data if it exists
        const submissionData = { ...formData };
        if (selectedFile) {
            submissionData.file = selectedFile;
        }

        onSave(product.id || "", submissionData);
    };

    return (
        <section className="mb-10 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
            <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {isNew ? "Crear Nuevo Producto" : "Editar Producto"}
                </h2>
            </div>
            <div className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:flex-row">
                    {/* Vista previa de imagen */}
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Imagen del Producto</label>
                        <div className="aspect-square w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center relative">
                            {previewUrl ? (
                                <img
                                    alt="Vista previa"
                                    className="h-full w-full object-cover"
                                    src={previewUrl}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-slate-400">
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                    <span className="text-[10px] mt-2">Sin imagen</span>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-3 w-full rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[18px]">upload</span>
                            {previewUrl ? "Cambiar Imagen" : "Subir Imagen"}
                        </button>
                    </div>
                    {/* Campos del Formulario */}
                    <div className="flex flex-1 flex-col gap-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="product-name">Nombre del Producto</label>
                                <input
                                    className="block w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-[#3994ef]"
                                    id="product-name"
                                    type="text"
                                    required
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="category">Categoría</label>
                                <select
                                    className="block w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-[#3994ef]"
                                    id="category"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                >
                                    {CATEGORIES.filter(c => c.id !== 0).map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="price">Precio ($)</label>
                                <input
                                    className="block w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-[#3994ef]"
                                    id="price"
                                    placeholder="0.00"
                                    step="0.01"
                                    type="number"
                                    required
                                    value={formData.precio}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400" htmlFor="description">Descripción</label>
                            <textarea
                                className="block w-full rounded-lg border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-[#3994ef]"
                                id="description"
                                rows={3}
                                value={formData.descripcion}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={onCancel}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                                type="button"
                            >
                                Cancelar
                            </button>
                            <button
                                className="rounded-lg bg-[#3994ef] px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#3994ef]/90 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3994ef]"
                                type="submit"
                            >
                                {isNew ? "Crear Producto" : "Guardar Cambios"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};
