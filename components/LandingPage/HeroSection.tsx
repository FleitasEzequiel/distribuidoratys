import Image from "next/image";

const HeroSection = () => (
    <section className="relative overflow-hidden min-h-[500px] flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
            <Image
                fill
                alt="Minimalist arrangement of products"
                className="w-full h-full object-top"
                src="/carrousel1.png"
            />
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/70 transition-colors duration-300"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border border-slate-900/10 dark:border-white/10 bg-white/50 dark:bg-slate-800/50 px-3 py-1 text-sm font-medium text-slate-800 dark:text-slate-200 mb-6 backdrop-blur-sm transition-colors">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Nueva Colección Seleccionada
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 font-serif">
                Calidad y Estilo para tu Hogar
            </h1>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto font-medium">
                Descubre nuestra colección completa
            </p>
            <a className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" href="#catalogo">
                Ver Catálogo
            </a>
        </div>
    </section>
)

export default HeroSection