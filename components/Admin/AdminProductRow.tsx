import Image from "next/image";
import React from "react";

interface AdminProductRowProps {
    product: {
        id: string;
        nombre: string;
        imagen: string;
        categoria: {
            id: number,
            nombre: string
        };
    };
    onEdit?: (product: any) => void;
    onDelete?: (id: string) => void;
}

export const AdminProductRow: React.FC<AdminProductRowProps> = ({ product, onEdit, onDelete }) => {
    return (
        <tr className="group transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
            <td className="whitespace-nowrap px-6 py-5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Image
                        alt={product.nombre}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        src={product.imagen || `https://xjbifzftvlakgoyrnxrz.supabase.co/storage/v1/object/public/Distribuidora%20TyS/${product.id}.jpg`}
                    />
                </div>
            </td>
            <td className="whitespace-nowrap px-6 py-5 font-semibold text-slate-900 dark:text-white">
                {product.nombre}
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-slate-500 dark:text-slate-400">
                {product.categoria.nombre}
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-right">
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => onEdit?.(product)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#3994ef] dark:hover:bg-slate-800"
                    >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                    </button>
                    <button
                        onClick={() => onDelete?.(product.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};
