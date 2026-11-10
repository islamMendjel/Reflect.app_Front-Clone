import { AssetGate } from "@/components/reflect/asset-preloader";
import { Navbar } from "@/components/reflect/navbar";
import { Hero } from "@/components/reflect/hero";
import { RadarSection } from "@/components/reflect/radar-section";
import { PrivacySection } from "@/components/reflect/privacy-section";
import { AboutSection } from "@/components/reflect/about-section";
import { Footer } from "@/components/reflect/footer";

export default function Home() {
  return (
    <AssetGate>
      <div className="rf-page">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <RadarSection />
          <PrivacySection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </AssetGate>
  );
}
