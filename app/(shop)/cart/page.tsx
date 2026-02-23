'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { CheckoutModal } from "@/components/CartPage/CheckoutModal";


export default function CartPage() {
    const { cart, updateQuantity, removeItem, totalItems, totalPrice, clearCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');

    return (
        <div className="bg-[#f6f8f8] font-manrope text-slate-900 antialiased min-h-screen flex flex-col relative">

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                deliveryMethod={deliveryMethod}
                setDeliveryMethod={setDeliveryMethod}
                cart={cart}
                clearCart={clearCart}
                totalPrice={totalPrice}
            />

            <main className={`grow transition-all duration-300 ${(isModalOpen) ? 'blur-[2px] pointer-events-none select-none' : ''}`}>
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Mi Pedido</h2>
                        <p className="text-slate-500">Revisa tus artículos antes de solicitar la cotización.</p>
                    </div>

                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="size-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-6">
                                <span className="material-symbols-outlined text-4xl">shopping_cart_off</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Tu lista está vacía</h3>
                            <p className="text-slate-500 mb-8 max-w-sm">Parece que aún no has agregado ningún producto a tu pedido.</p>
                            <Link href="/#catalogo" className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90">
                                Explorar Catálogo
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Left Column: Product List */}
                            <div className="flex-1 space-y-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="group relative flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:border-primary/20 transition-all duration-300">
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-50"
                                        >
                                            <span className="material-symbols-outlined text-xl">close</span>
                                        </button>

                                        {/* Image */}
                                        <div className="relative shrink-0 overflow-hidden rounded-xl size-24 bg-slate-50">
                                            <Image fill alt={item.title} className="object-cover object-center group-hover:scale-105 transition-transform duration-500" src={`https://xjbifzftvlakgoyrnxrz.supabase.co/storage/v1/object/public/Distribuidora%20TyS/${item.id}.png`} />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-slate-900 truncate mb-0.5">{item.title}</h3>
                                            <p className="text-sm text-slate-500 line-clamp-1 mb-2">{item.description}</p>
                                            <p className="text-base font-black text-primary">
                                                ${item.price.toLocaleString('es-AR')}
                                            </p>
                                        </div>

                                        {/* Quantity & Subtotal */}
                                        <div className="flex flex-col items-end gap-3 shrink-0 pr-10">
                                            <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="size-8 flex items-center justify-center rounded-lg text-slate-600 hover:bg-white hover:text-primary transition-all shadow-none hover:shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-sm font-bold">remove</span>
                                                </button>
                                                <span className="w-10 text-center text-slate-900 font-bold text-sm">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="size-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-none hover:shadow-sm"
                                                >
                                                    <span className="material-symbols-outlined text-sm font-bold">add</span>
                                                </button>
                                            </div>
                                            <p className="text-xs font-medium text-slate-400">
                                                Subtotal: <span className="text-slate-900 font-bold">${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column: Order Summary (Sticky) */}
                            <div className="lg:w-[380px] shrink-0">
                                <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                        <h3 className="text-xl font-bold text-slate-900">Resumen</h3>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                                            {totalItems} artículos
                                        </span>
                                    </div>

                                    <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex justify-between items-center text-sm">
                                                <div className="flex flex-col min-w-0 pr-4">
                                                    <span className="text-slate-700 font-medium truncate">{item.title}</span>
                                                    <span className="text-slate-400 text-xs">x{item.quantity} un.</span>
                                                </div>
                                                <span className="font-bold text-slate-900 shrink-0">
                                                    ${(item.price * item.quantity).toLocaleString('es-AR')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium">Subtotal</span>
                                            <span className="text-slate-900 font-bold">${totalPrice.toLocaleString('es-AR')}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-500 font-medium">Envío</span>
                                            <span className="text-primary font-bold text-xs uppercase tracking-wider">A coordinar</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-slate-100">
                                            <span className="text-lg font-black text-slate-900">Total</span>
                                            <span className="text-2xl font-black text-primary">
                                                ${totalPrice.toLocaleString('es-AR')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                Los precios y stock final serán confirmados por nuestro equipo. No se requiere pago inmediato.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full flex items-center justify-center gap-3 rounded-xl bg-primary py-4 px-6 text-sm font-black text-slate-100 shadow-lg shadow-primary/20 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                        >
                                            <span className="material-symbols-outlined text-lg">chat</span>
                                            FINALIZAR PEDIDO
                                        </button>
                                        <Link href="/#catalogo" className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 py-3.5 px-6 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 uppercase tracking-widest">
                                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                                            Seguir Comprando
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
