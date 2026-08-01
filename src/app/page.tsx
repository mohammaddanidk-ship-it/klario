import { Navigation } from "@/components/sections/navigation";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { TwoCoreFeatures } from "@/components/sections/two-core-features";
import { DocumentUnderstanding } from "@/components/sections/document-understanding";
import { Comparison } from "@/components/sections/comparison";
import { PhishingDetector } from "@/components/sections/phishing-detector";
import { SampleResult } from "@/components/sections/sample-result";
import { MultiLanguage } from "@/components/sections/multi-language";
import { UploadZone } from "@/components/sections/upload-zone";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Security } from "@/components/sections/security";
import { Stats } from "@/components/sections/stats";
import { TrustLegal } from "@/components/sections/trust-legal";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { FontLoader } from "@/components/brand/font-loader";

export default function Home() {
  return (
    <>
      <FontLoader />
      <Navigation />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <TwoCoreFeatures />
        <DocumentUnderstanding />
        <Comparison />
        <PhishingDetector />
        <SampleResult />
        <MultiLanguage />
        <UploadZone />
        <HowItWorks />
        <Security />
        <Stats />
        <TrustLegal />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
