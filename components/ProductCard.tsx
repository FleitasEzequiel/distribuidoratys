'use client';

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    id: number;
    imagen: string;
    nombre: string;
    descripcion: string;
    precio: number;
    badge?: string;
    badgeType?: 'new' | 'best-seller';
}

export default function ProductCard({
    id,
    imagen,
    nombre,
    descripcion,
    precio,
    badge,
    badgeType,
}: ProductCardProps) {
    const { addToCart, cart } = useCart();
    const isAdded = cart.some(item => item.id === id);

    const badgeClasses =
        badgeType === 'best-seller'
            ? "bg-primary text-slate-900"
            : "bg-white/90 text-slate-800 backdrop-blur-sm";

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            image: imagen,
            title: nombre,
            description: descripcion,
            price: precio
        });
    };

    return (
        <div className="group flex flex-col h-full bg-white rounded-2xl transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden relative border border-slate-100">
            <div className="relative aspect-video w-full bg-slate-50 shrink-0 overflow-hidden">
                <Image
                    fill
                    alt={nombre}
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={`https://xjbifzftvlakgoyrnxrz.supabase.co/storage/v1/object/public/Distribuidora%20TyS/${id}.png`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {badge && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
                            {badge}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col grow p-4">
                <div className="flex flex-col mb-2">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-0.5">
                        {nombre}
                    </h3>
                    <p className="text-lg font-black text-primary">
                        ${precio.toLocaleString('es-AR')}
                    </p>
                </div>
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                    {descripcion || "Sin descripción disponible."}
                </p>

                {isAdded ? (
                    <div className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 text-slate-500 font-bold text-sm border border-slate-200 cursor-default">
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        <span>Ya en la lista</span>
                    </div>
                ) : (
                    <button
                        onClick={handleAdd}
                        className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary/10 text-primary font-bold text-sm transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                        <span>Agregar a la lista</span>
                    </button>
                )}
            </div>
        </div>
    );
}
