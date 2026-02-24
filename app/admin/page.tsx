import React from "react";
import getProducts from "@/lib/ProductServices";
import { AdminInventory } from "@/components/Admin/AdminInventory";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

export default async function AdminPage() {
    const products = await getProducts();

    return (
        <div className="bg-background dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200 min-h-screen">
            <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background dark:bg-slate-900">
                {/* Header */}
                <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-[#101922]/80">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
                        <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3994ef] text-white">
                                <Image
                                    src="/logo.jpg"
                                    width={100}
                                    height={100}
                                    alt="Logo"
                                />
                            </div>
                            <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Distribuidora T&S</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-12">
                    <AdminInventory initialProducts={products || []} />
                </main>

                {/* Subtle Footer */}
                <footer className="mt-auto py-8 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-600">© 2026 Distribuidora TyS</p>
                </footer>
            </div>
        </div>
    );
}
