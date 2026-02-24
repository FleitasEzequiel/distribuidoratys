'use client'
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Aside = ({ children }: { children: React.ReactNode; }) => {
    const searchParams = useSearchParams()
    const urlCat = Number(searchParams.get('cat'))
    return (
        <Suspense>
            <main className="grow flex flex-col md:flex-row max-w-[1440px] mx-auto w-full px-4 md:px-10 py-16 gap-8" id="catalogo">
                <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block sticky top-24 h-fit">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Categorías</h3>
                        <ul className="space-y-2">
                            {[...CATEGORIES].sort((a, b) => a.id - b.id).map((cat) => (
                                <li key={cat.id} >
                                    <Link
                                        href={cat.id === 0 ? "/#catalogo" : `/?cat=${cat.id}#catalogo`}
                                        className={`flex items-center ${cat.id == urlCat ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'} justify-between group p-2 rounded-lg transition-colors hover:bg-slate-50 dark:hover:bg-slate-800`}
                                    >
                                        <span>{cat.nombre}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl bg-primary/5 p-6 border border-primary/10 dark:border-primary/20 transition-colors">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Kit Gastronómico</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Equipa tu cocina con los mejores implementos.</p>
                            <button className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white border-b border-slate-900 dark:border-white pb-0.5 hover:text-primary hover:border-primary transition-colors">
                                Ver más
                            </button>
                        </div>
                        <div className="absolute -bottom-4 -right-4 text-primary/10 dark:text-primary/20">
                            <span className="material-symbols-outlined text-[120px]">restaurant</span>
                        </div>
                    </div>
                </aside>
                {children}
            </main>
        </Suspense>
    )
}

export default Aside