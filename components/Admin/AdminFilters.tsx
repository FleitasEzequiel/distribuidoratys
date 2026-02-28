'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface AdminFiltersProps {
    categories: { id: number; nombre: string }[];
}

export const AdminFilters = ({ categories }: AdminFiltersProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const initialSearch = searchParams.get('search') || '';
    const initialCategoria = searchParams.get('categoria') || '0';

    const [search, setSearch] = useState(initialSearch);
    const [categoria, setCategoria] = useState(initialCategoria);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (search) {
                params.set('search', search);
            } else {
                params.delete('search');
            }

            if (categoria && categoria !== '0') {
                params.set('categoria', categoria);
            } else {
                params.delete('categoria');
            }

            params.set('page', '1'); // Reset to page 1

            router.push(`?${params.toString()}`);
        }, 400);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [search, categoria, router]);

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">search</span>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                />
            </div>
            <div className="relative w-full sm:w-64 shrink-0">
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm outline-none transition-all focus:border-[#3994ef] focus:ring-1 focus:ring-[#3994ef] dark:border-slate-800 dark:bg-slate-900/50 dark:text-white"
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 pointer-events-none -translate-y-1/2 text-[20px] text-slate-400">expand_more</span>
            </div>
        </div>
    );
};
