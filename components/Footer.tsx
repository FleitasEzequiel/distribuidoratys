export function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 mt-auto transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-sm">eco</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">T&S Distribuidora © 2024</span>
                </div>
                <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <a className="hover:text-primary transition-colors" href="#">Privacidad</a>
                    <a className="hover:text-primary transition-colors" href="#">Términos</a>
                    <a className="hover:text-primary transition-colors" href="#">Soporte</a>
                </div>
            </div>
        </footer>
    );
}
