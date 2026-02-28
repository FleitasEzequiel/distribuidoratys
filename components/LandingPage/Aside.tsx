'use client'
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Aside = ({ children, categories }: { children: React.ReactNode; categories: { id: number; nombre: string }[] }) => {
    const searchParams = useSearchParams()
    const urlCat = Number(searchParams.get('cat'))
    return (
        <Suspense>
            <main className="grow flex flex-col md:flex-row max-w-[1440px] mx-auto w-full px-4 md:px-10 py-16 gap-8" id="catalogo">
                <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block sticky top-24 h-fit">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Categorías</h3>
                        <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {categories.map((cat) => {
                                const query = searchParams.get('q');
                                const href = cat.id === 0
                                    ? `/?${query ? `q=${query}&` : ''}#catalogo`
                                    : `/?cat=${cat.id}${query ? `&q=${query}` : ''}#catalogo`;

                                return (
                                    <li key={cat.id} >
                                        <Link
                                            href={href}
                                            className={`flex items-center ${cat.id == urlCat ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'} justify-between group p-2 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800`}
                                        >
                                            <span>{cat.nombre}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>
                {children}
            </main>
        </Suspense>
    )
}

export default Aside