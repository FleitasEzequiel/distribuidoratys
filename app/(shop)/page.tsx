
import HeroSection from "@/components/LandingPage/HeroSection";
import CompetenceSection from "@/components/LandingPage/CompetenceSection";
import CatalogSection from "@/components/LandingPage/CatalogSection";
import { Suspense } from "react";

export default function Home(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  return (
    <div className="bg-background text-foreground dark:bg-slate-900 font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
      <Suspense fallback={<span>Cargando catalogo...</span>}>
        <CatalogSection searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
