import React from "react";
import getProducts from "@/lib/ProductServices";
import { AdminInventory } from "@/components/Admin/AdminInventory";
import Image from "next/image";

export default async function AdminPage() {
    const products = await getProducts();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased transition-colors duration-200 min-h-screen">
            <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background-light dark:bg-[#101922]">
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
                            <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-slate-100 dark:ring-slate-800">
                                <img
                                    alt="User Profile"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhVgtlvPSRQ57G3LulZDAOvVjOr_zTctjyJjyyGPqCKx_-rxgecLmpHFYDA883ROal8M0B8hCZdh4nki0FvSkNbf8ld4zGbGHx-ywn7PEF6FoKJ8DTHKq3_S2RViHtr01Z7cb810XtZdCwvEYiubAPhoGjQPYfaGD5s9bnDuRaanneZ7wVgkrS48kAX6ZHdRhOb00I8NoUkMNepA_pLK2TzqvI4KawKOJMO2eEp4uwcrtox34X1yZZRwifwojNrBGXXeY8NIOKG2s"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10 lg:px-12">
                    <AdminInventory initialProducts={products || []} />
                </main>

                {/* Subtle Footer */}
                <footer className="mt-auto py-8 text-center">
                    <p className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-600">© 2024 Operaciones Cleanventory</p>
                </footer>
            </div>
        </div>
    );
}
