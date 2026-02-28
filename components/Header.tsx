'use client';

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function HeaderContent() {
    const { totalItems } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Sync input with URL search params
    useEffect(() => {
        setSearchTerm(searchParams.get('q') || '');
        if (searchParams.get('q')) {
            setIsSearchOpen(false); // Close mobile search after searching
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm.trim()) {
            params.set('q', searchTerm.trim());
        } else {
            params.delete('q');
        }
        params.delete('page');
        setIsSearchOpen(false);
        router.push(`/?${params.toString()}#catalogo`);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="px-4 md:px-10 py-3 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-3">
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
                </Link>

                {/* Desktop Search */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="relative w-full group">
                        <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </button>
                        <input
                            className="block w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm text-slate-900 dark:text-white"
                            placeholder="Buscar productos..."
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </form>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Buscar"
                    >
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <ThemeToggle />
                    <Link href="/cart" aria-label="Ver carrito" className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors relative">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-60 bg-white dark:bg-slate-900 flex flex-col p-4 animate-in fade-in slide-in-from-top duration-200">
                    <div className="flex items-center gap-4 mb-6">
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </span>
                                <input
                                    autoFocus
                                    className="block w-full rounded-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-base placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-slate-900 dark:text-white"
                                    placeholder="¿Qué estás buscando?"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </form>
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">Sugerencias</p>
                        <div className="flex flex-wrap gap-2">
                            {['Platos', 'Copas', 'Cubiertos', 'Vajilla'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setSearchTerm(tag);
                                        const params = new URLSearchParams(searchParams.toString());
                                        params.set('q', tag);
                                        params.delete('page');
                                        setIsSearchOpen(false);
                                        router.push(`/?${params.toString()}#catalogo`);
                                    }}
                                    className="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-primary/5 hover:border-primary/30 hover:text-primary transition-all"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export function Header() {
    return (
        <Suspense fallback={<div className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800" />}>
            <HeaderContent />
        </Suspense>
    );
}
