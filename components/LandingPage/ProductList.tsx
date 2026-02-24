'use client'

import ProductCard from "@/components/ProductCard"


const ProductList = ({ Products }: { Products: any[] }) => {
    return (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Products == null || Products.length === 0) ? (
            <div className="col-span-full py-12 text-center">
                <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400">No encontramos productos que coincidan</h2>
                <p className="text-slate-400">Intenta con otros términos o revisa el catálogo completo.</p>
            </div>
        ) : Products.map((product) => (
            <ProductCard
                key={product.id}
                {...product}
            />
        ))}
    </div>)
}

export default ProductList;