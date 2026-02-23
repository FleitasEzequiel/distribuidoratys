'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

export function Header() {
    const { totalItems } = useCart();

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="px-4 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
                        <Image
                            src="/logo.jpg"
                            width={100}
                            height={100}
                            alt="Logo"
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Distribuidora T&S</h2>
                </div>
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input
                            className="block w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm text-slate-900 dark:text-white"
                            placeholder="Buscar productos..."
                            type="text"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/">Inicio</Link>
                        <Link className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors" href="/#catalogo">Catálogo</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/cart" aria-label="Ver carrito" className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors relative">
                            <span className="material-symbols-outlined">list</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        <button className="md:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
