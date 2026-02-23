'use client';

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Evitar desajustes de hidratación
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`size-10 rounded-lg bg-slate-100/50 ${className}`} />;
    }

    return (
        <button
            onClick={toggleTheme}
            className={`flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 ${className}`}
            aria-label="Cambiar modo"
            type="button"
        >
            <span className="material-symbols-outlined text-[20px]">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}
