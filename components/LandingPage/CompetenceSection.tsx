
const CompetenceSection = () => (<section className="py-12 bg-background dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300">
    <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <div className="size-12 rounded-full bg-secondary dark:bg-primary/20 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">verified</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Calidad Garantizada</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Productos seleccionados bajo los más altos estándares de calidad.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <div className="size-12 rounded-full bg-secondary dark:bg-primary/20 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">design_services</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Diseño Exclusivo</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Estética moderna que combina funcionalidad y elegancia en cada pieza.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm transition-colors">
                <div className="size-12 rounded-full bg-secondary dark:bg-primary/20 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Envíos a toda la provincia</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Llegamos a donde estés con la mayor seguridad y rapidez.</p>
            </div>
        </div>
    </div>
</section>)

export default CompetenceSection