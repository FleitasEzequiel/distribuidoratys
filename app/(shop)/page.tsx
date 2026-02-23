
import HeroSection from "@/components/LandingPage/HeroSection";
import CompetenceSection from "@/components/LandingPage/CompetenceSection";
import CatalogSection from "@/components/LandingPage/CatalogSection";
import Aside from "@/components/LandingPage/Aside"

export default function Home() {
  return (
    <div className="bg-background text-foreground dark:bg-slate-900 font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
      <HeroSection />
      <CompetenceSection />
      <Aside>
        <CatalogSection />
      </Aside>

    </div>
  );
}
