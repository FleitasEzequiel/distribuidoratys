import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import fetchCatalog, { getCategorias } from "@/lib/ProductServices";
import Aside from "./Aside";
import ProductList from "./ProductList";
import Link from "next/link";
import MobileCategorySelect from "./MobileCategorySelect";

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
    const query = params.q ? String(params.q) : "";

    const { data: Products, totalPages, count } = await fetchCatalog(catId, page, query);
    const { data: categories } = await getCategorias();
    return (
        <Suspense fallback={<div>Cargando productos...</div>}>
            <Aside categories={categories}>
                <section id="catalogo" className="flex-1">
                    {/* Select de Categorías (Solo Mobile) */}
                    <MobileCategorySelect
                        categories={categories}
                        catId={catId}
                        query={query}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">
                                Catálogo de Productos
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Mostrando {Products?.length || 0} de {count} productos</p>
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
                                        href={`/?cat=${catId}&page=${page - 1}${query ? `&q=${query}` : ''}#catalogo`}
                                        className="p-2 text-slate-600 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">chevron_left</span>
                                    </Link>
                                )}

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Link
                                        key={p}
                                        href={`/?cat=${catId}&page=${p}${query ? `&q=${query}` : ''}#catalogo`}
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
                                        href={`/?cat=${catId}&page=${page + 1}${query ? `&q=${query}` : ''}#catalogo`}
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
