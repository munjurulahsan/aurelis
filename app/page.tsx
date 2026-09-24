import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import SignatureCollection from "@/components/SignatureCollection";
import ScentJourney from "@/components/ScentJourney";
import FeaturedNoir from "@/components/FeaturedNoir";
import Composition from "@/components/Composition";
import TheHouse from "@/components/TheHouse";
import ScentFinder from "@/components/ScentFinder";
import Testimonial from "@/components/Testimonial";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";
import PageTransition from "@/components/motion/PageTransition";

export default function Home() {
  return (
    <>
      <Header />
      <PageTransition>
        <main>
          <Hero />
          <Philosophy />
          <SignatureCollection />
          <ScentJourney />
          <FeaturedNoir />
          <Composition />
          <TheHouse />
          <ScentFinder />
          <Testimonial />
          <ClosingCTA />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
}
