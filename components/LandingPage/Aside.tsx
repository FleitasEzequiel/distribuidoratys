
const Aside = ({ children }: { children: React.ReactNode }) => (
    <main className="grow flex flex-col md:flex-row max-w-[1440px] mx-auto w-full px-4 md:px-10 py-16 gap-8" id="catalogo">
        <aside className="w-full md:w-64 shrink-0 space-y-8 hidden md:block sticky top-24 h-fit">
            <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Categorías</h3>
                <ul className="space-y-2">
                    <li>
                        <a className="flex items-center justify-between group p-2 rounded-lg bg-primary/10 text-primary font-medium" href="#">
                            <span>Todo</span>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors" href="#">
                            <span>Sillas y Mesas</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors" href="#">
                            <span>Limpieza</span>
                        </a>
                    </li>
                    <li>
                        <a className="flex items-center justify-between group p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors" href="#">
                            <span>Utensilios de Cocina</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-primary/5 p-6 border border-primary/10">
                <div className="relative z-10">
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Kit Gastronómico</h4>
                    <p className="text-sm text-slate-600 mb-4">Equipa tu cocina con los mejores implementos.</p>
                    <button className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 hover:text-primary hover:border-primary transition-colors">
                        Ver más
                    </button>
                </div>
                <div className="absolute -bottom-4 -right-4 text-primary/10">
                    <span className="material-symbols-outlined text-[120px]">restaurant</span>
                </div>
            </div>
        </aside>
        {children}
    </main>)

export default Aside