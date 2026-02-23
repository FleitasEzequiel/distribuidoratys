'use cache'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import fetchCatalog from "@/lib/ProductServices";

const CatalogSection = async () => {
    const Products = await fetchCatalog()
    return (
        <section id="catalogo" className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Catálogo de Productos</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Mostrando {Products?.length || 0} productos seleccionados</p>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Products == null ? <h1>No hay productos</h1> : Products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>
            </Suspense>

            <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-1">
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="h-10 w-10 rounded-full bg-primary text-white font-bold text-sm">1</button>
                    <button className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">2</button>
                    <button className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">3</button>
                    <span className="px-2 text-slate-400">...</span>
                    <button className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-600 font-medium text-sm transition-colors">8</button>
                    <button className="p-2 text-slate-600 hover:text-slate-900">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </nav>
            </div>
        </section>
    )
};

export default CatalogSection;
