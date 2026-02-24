
import HeroSection from "@/components/LandingPage/HeroSection";
import CompetenceSection from "@/components/LandingPage/CompetenceSection";
import CatalogSection from "@/components/LandingPage/CatalogSection";
import Aside from "@/components/LandingPage/Aside"

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; cat?: string }> }) {
  const params = await searchParams;
  const categoryId = params.cat ? parseInt(params.cat) : 0;

  return (
    <div className="bg-background text-foreground dark:bg-slate-900 font-display antialiased min-h-screen flex flex-col transition-colors duration-300">
      <HeroSection />
      <CompetenceSection />
      <Aside activeCategoryId={categoryId}>
        <CatalogSection searchQuery={params.q} activeCategoryId={categoryId} />
      </Aside>
    </div>
  );
}
