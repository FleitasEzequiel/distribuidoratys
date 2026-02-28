"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface MobileCategorySelectProps {
    categories: { id: number; nombre: string; icon?: string }[];
    catId: number;
    query: string;
}

export default function MobileCategorySelect({ categories, catId, query }: MobileCategorySelectProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleSelect = (selectedId: number) => {
        setIsOpen(false);
        // Construct the URL
        if (selectedId === 0) {
            router.push(`/?${query ? `q=${query}&` : ''}#catalogo`);
        } else {
            router.push(`/?cat=${selectedId}${query ? `&q=${query}` : ''}#catalogo`);
        }
    };

    const selectedCategory = categories.find(cat => cat.id === catId);

    return (
        <div className="md:hidden mb-8 w-full relative">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 px-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
                <span>{selectedCategory ? selectedCategory.nombre : "Seleccionar Categoría"}</span>
                <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">
                    expand_more
                </span>
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                    {/* Modal Content */}
                    <div
                        className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Categorías</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition outline-none"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleSelect(cat.id)}
                                    className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition-colors flex items-center justify-between ${cat.id === catId
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                        }`}
                                >
                                    <span>{cat.nombre}</span>
                                    {cat.id === catId && (
                                        <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
