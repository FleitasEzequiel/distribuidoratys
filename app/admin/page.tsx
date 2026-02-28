import React, { Suspense } from "react";
import getProducts, { getCategorias } from "@/lib/ProductServices";
import { AdminInventory } from "@/components/Admin/AdminInventory";
import { AdminFilters } from "@/components/Admin/AdminFilters";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const { data: categories } = await getCategorias();

    return (
        <div className="bg-background dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200 min-h-screen">
            <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background dark:bg-slate-900">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#101922]/80">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3994ef] text-white overflow-hidden shadow-sm transition-transform group-hover:scale-105">
                                <Image
                                    src="/logo.jpg"
                                    width={100}
                                    height={100}
                                    alt="Logo"
                                />
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors">Distribuidora T&S</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                {/* Main Content with Suspense */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-12">
                    <Suspense fallback={<div className="h-14 mb-6"></div>}>
                        <AdminFilters categories={categories} />
                    </Suspense>
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3994ef]"></div>
                        </div>
                    }>
                        <AdminContent searchParams={props.searchParams} categories={categories} />
                    </Suspense>
                </main>

                {/* Subtle Footer */}
                <footer className="mt-auto py-8 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-600">© 2026 Distribuidora TyS</p>
                </footer>
            </div>
        </div>
    );
}

async function AdminContent({ searchParams, categories }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>, categories: { id: number; nombre: string }[] }) {
    const params = await searchParams;
    const page = params.page ? Number(params.page) : 1;
    const category = params.categoria ? Number(params.categoria) : undefined;
    const search = params.search ? String(params.search) : undefined;

    const products = await getProducts(category, page, search);

    return (
        <AdminInventory
            initialProducts={products.data || []}
            totalPages={products.totalPages || 1}
            currentPage={page}
            totalCount={products.count || 0}
            categories={categories}
        />
    );
}
