/**
 * Centralized Asset Registry for Aurélis
 * 
 * Cloud Hosted on GitHub:
 * Repository: https://github.com/munjurulahsan/asset/tree/main/Aurelis
 * Raw CDN: https://raw.githubusercontent.com/munjurulahsan/asset/main/Aurelis/
 */

const BASE_URL = "https://raw.githubusercontent.com/munjurulahsan/asset/main/Aurelis";

export const ASSETS = {
  // --------------------------------------------------------------------------
  // IMAGES (10 files)
  // --------------------------------------------------------------------------
  images: {
    // Section: The House (components/TheHouse.tsx)
    theHouse: `${BASE_URL}/images/the-house.jpg`,

    // Section: Signature Collection (components/SignatureCollection.tsx)
    productNoir: `${BASE_URL}/images/product-noir.jpg`,
    productElan: `${BASE_URL}/images/product-elan.jpg`,
    productVelvet: `${BASE_URL}/images/product-velvet.jpg`,

    // Section: The Composition (components/Composition.tsx)
    ingredientSaffron: `${BASE_URL}/images/ingredient-saffron.jpg`,
    ingredientIris: `${BASE_URL}/images/ingredient-iris.jpg`,
    ingredientOud: `${BASE_URL}/images/ingredient-oud.jpg`,

    // Section: Featured Noir (components/FeaturedNoir.tsx)
    featuredNoir: `${BASE_URL}/images/featured-noir.jpg`,

    // Section: Philosophy (components/Philosophy.tsx)
    philosophyGrasse: `${BASE_URL}/images/philosophy-grasse.jpg`,

    // Section: Closing CTA (components/ClosingCTA.tsx)
    closingCta: `${BASE_URL}/images/closing-cta.jpg`,
  },

  // --------------------------------------------------------------------------
  // VIDEOS (2 files)
  // --------------------------------------------------------------------------
  videos: {
    // Section: Hero Background Video (components/Hero.tsx)
    hero: `${BASE_URL}/videos/hero.mp4`,

    // Section: Scent Journey Background Video (components/ScentJourney.tsx)
    scentJourney: `${BASE_URL}/videos/scent-journey.mp4`,
  },
} as const;

export type AssetsConfig = typeof ASSETS;
