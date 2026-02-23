
import HeroSection from "@/components/LandingPage/HeroSection";
import CompetenceSection from "@/components/LandingPage/CompetenceSection";
import CatalogSection from "@/components/LandingPage/CatalogSection";
import Aside from "@/components/LandingPage/Aside"

export default function Home() {
  return (
    <div className="bg-background-light text-slate-900 font-display antialiased min-h-screen flex flex-col">
      <HeroSection />
      <CompetenceSection />
      <Aside>
        <CatalogSection />
      </Aside>

    </div>
  );
}
