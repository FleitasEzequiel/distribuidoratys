'use client';

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { DBLINK } from "@/lib/constants";


interface ProductCardProps {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    badge?: string;
    badgeType?: 'new' | 'best-seller';
}

export default function ProductCard({
    id,
    nombre,
    descripcion,
    precio,
    badge,
    badgeType,
}: ProductCardProps) {
    const { addToCart, cart, updateQuantity, removeItem } = useCart();
    const cartItem = cart.find(item => item.id === id);
    const isAdded = !!cartItem;


    console.log("leer acá", DBLINK)
    const badgeClasses =
        badgeType === 'best-seller'
            ? "bg-primary text-slate-900 shadow-sm"
            : "bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-sm";

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            title: nombre,
            description: descripcion,
            price: precio
        });
    };

    return (
        <div className="group flex flex-row sm:flex-col h-full bg-white dark:bg-slate-800 rounded-2xl transition-all duration-300 hover:shadow-xl sm:hover:-translate-y-1 overflow-hidden relative border border-slate-100 dark:border-slate-700">
            <div className="relative w-1/3 min-w-[120px] sm:min-w-0 sm:w-full shrink-0 aspect-4/5 sm:aspect-4/3 lg:aspect-video bg-white overflow-hidden flex items-center justify-center">
                <Image
                    fill
                    alt={nombre}
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:delay-150 group-hover:scale-110 mix-blend-multiply"
                    src={`${DBLINK}/storage/v1/object/public/Distribuidora%20TyS/${id}.jpg`}
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {badge && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${badgeClasses}`}>
                            {badge}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col grow p-3 sm:p-4 justify-between">
                <div>
                    <div className="flex flex-col mb-1 sm:mb-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-0.5">
                            {nombre}
                        </h3>
                        <p className="text-base sm:text-lg font-black text-primary">
                            {precio > 0 ? `$${precio.toLocaleString('es-AR')}` : "Sin precio disponible"}
                        </p>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 sm:line-clamp-2 mb-4">
                        {descripcion || "Sin descripción disponible."}
                    </p>
                </div>

                {isAdded ? (
                    <div className="mt-2 sm:mt-auto w-full flex items-center justify-between py-1 px-1 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-colors">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (cartItem.quantity > 1) {
                                    updateQuantity(id, -1);
                                } else {
                                    removeItem(id);
                                }
                            }}
                            className="flex items-center justify-center size-7 sm:size-8 rounded-lg bg-white dark:bg-slate-800 text-slate-500 hover:text-red-500 shadow-sm transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">
                                {cartItem.quantity > 1 ? 'remove' : 'delete'}
                            </span>
                        </button>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-tight">{cartItem.quantity}</span>
                            <span className="hidden sm:inline text-[10px] text-slate-400 font-medium uppercase tracking-wider leading-tight">En carrito</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(id, 1);
                            }}
                            className="flex items-center justify-center size-7 sm:size-8 rounded-lg bg-white dark:bg-slate-800 text-slate-500 hover:text-primary shadow-sm transition-colors"
                        >
                            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">add</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAdd}
                        className="mt-2 sm:mt-auto w-full flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 rounded-xl bg-primary/10 text-primary font-bold text-xs sm:text-sm transition-all duration-300 hover:bg-primary hover:text-white"
                    >
                        <span className="material-symbols-outlined text-[16px] sm:text-[20px]">add_circle</span>
                        <span>Agregar<span className="hidden sm:inline"> a la lista</span></span>
                    </button>
                )}
            </div>
        </div>
    );
}
