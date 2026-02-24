import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import fetchCatalog from "@/lib/ProductServices";
import Aside from "./Aside";
import ProductList from "./ProductList";
import Link from "next/link";

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: { id: number; nombre: string } | { id: number; nombre: string }[];
}

interface CatalogSectionProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CatalogSection = async ({ searchParams }: CatalogSectionProps) => {
    const params = await searchParams;
    const catId = params.cat ? Number(params.cat) : 0;
    const page = params.page ? Number(params.page) : 1;

    const { data: Products, totalPages, count } = await fetchCatalog(catId, page);

    return (
        <Suspense fallback={<div>Cargando productos...</div>}>
            <Aside>
                <section id="catalogo" className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                                Catálogo de Productos
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Mostrando {Products?.length || 0} de {count} productos</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700">
                                <span className="material-symbols-outlined text-[20px]">tune</span>
                                Filtros
                            </button>
                            <div className="relative">
                                <select className="appearance-none bg-transparent pl-3 pr-8 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer focus:outline-none">
                                    <option className="dark:bg-slate-900">Relevancia</option>
                                    <option className="dark:bg-slate-900">Más nuevos</option>
                                    <option className="dark:bg-slate-900">Más populares</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500 text-[20px]">expand_more</span>
                            </div>
                        </div>
                    </div>

                    <Suspense fallback={<div>Cargando productos...</div>}>
                        <ProductList Products={Products} />
                    </Suspense>

                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <nav className="flex items-center gap-1">
                                {page > 1 && (
                                    <Link
                                        href={`/?cat=${catId}&page=${page - 1}#catalogo`}
                                        className="p-2 text-slate-600 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </Link>
                                )}

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Link
                                        key={p}
                                        href={`/?cat=${catId}&page=${p}#catalogo`}
                                        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${p === page
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        {p}
                                    </Link>
                                ))}

                                {page < totalPages && (
                                    <Link
                                        href={`/?cat=${catId}&page=${page + 1}#catalogo`}
                                        className="p-2 text-slate-600 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </Link>
                                )}
                            </nav>
                        </div>
                    )}
                </section>
            </Aside>
        </Suspense>

    )
};

export default CatalogSection;
