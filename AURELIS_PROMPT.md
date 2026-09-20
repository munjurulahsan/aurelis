## Environment

This template is structured for a Next.js (App Router) project with TypeScript, Tailwind CSS, Framer Motion, and Three.js / React Three Fiber:
- File paths use `/app/...`, `/components/...`, and `/constants/...`
- Client components use `"use client"`
- Imports use `@/...` path alias
- Tailwind CSS v3 with custom luxury theme tokens (ink, cream, bronze, amber, wine)
- Google Fonts: `Instrument_Serif` and `Manrope` loaded via `next/font/google`
- 3D particle canvas via `@react-three/fiber` and `three`
- High-performance scroll, hover, and reveal animations via `framer-motion`
- All media assets (images and videos) are cloud-hosted on GitHub CDN via `constants/assets.ts` (zero local assets required)

Keep every component's code 100% identical to what is provided below. Do not refactor or alter design tokens.

---

### Step 1: Install Dependencies

```bash
npm install next@14.2.15 react@^18.3.1 react-dom@^18.3.1 framer-motion@^11.11.9 three@^0.169.0 @react-three/fiber@^8.17.10 @react-three/drei@^9.114.3
npm install -D typescript@^5.6.3 @types/node@^20.16.11 @types/react@^18.3.11 @types/react-dom@^18.3.1 @types/three@^0.169.0 tailwindcss@^3.4.13 postcss@^8.4.47 autoprefixer@^10.4.20 eslint@^8.57.1 eslint-config-next@14.2.15
```

---

### File 1 of 22: next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
```

### File 2 of 22: postcss.config.mjs

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### File 3 of 22: tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080807",
        "ink-soft": "#0b0a09",
        charcoal: "#151311",
        cream: "#f1eee7",
        "cream-dim": "#e6e0d4",
        bronze: "#9b8064",
        "bronze-dim": "#8a7255",
        wine: "#35191a",
        amber: "#ffb76c",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1680px",
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.24em",
      },
    },
  },
  plugins: [],
};

export default config;
```

### File 4 of 22: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### File 5 of 22: constants/assets.ts

```typescript
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
```

### File 6 of 22: app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  background-color: #080807;
  color: #f1eee7;
}

::selection {
  background: #9b8064;
  color: #080807;
}

.link-underline {
  position: relative;
}

.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  height: 1px;
  width: 100%;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.link-underline:hover::after {
  transform: scaleX(1);
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  50% {
    transform: translateY(8px);
    opacity: 1;
  }
}

.animate-scroll-bounce {
  animation: scroll-bounce 2.2s ease-in-out infinite;
}
```

### File 7 of 22: app/layout.tsx

```typescript
import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurélis — Fragrance beyond the ordinary",
  description:
    "Fragrances crafted to linger beyond the moment — expressive, intimate, unforgettable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

### File 8 of 22: app/page.tsx

```typescript
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

export default function Home() {
  return (
    <>
      <Header />
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
    </>
  );
}
```

### File 9 of 22: components/motion/Reveal.tsx

```typescript
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = fadeUp;
```

### File 10 of 22: components/Header.tsx

```typescript
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["Collections", "Perfumes", "Story", "Journal"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-cream/10 bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid w-full max-w-container grid-cols-3 items-center px-6 py-6 md:px-14">
        <a
          href="#"
          className="w-fit font-serif text-2xl uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-70"
        >
          Aurélis
        </a>

        <div className="hidden justify-self-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="link-underline py-1.5 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-cream/80 transition-colors hover:text-cream"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-6">
          <button className="hidden py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream sm:inline-block">
            Search
          </button>
          <button className="hidden py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream sm:inline-block">
            Account
          </button>
          <button className="rounded-full border border-cream/20 px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream/50 hover:bg-cream/5">
            Bag (0)
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
```

### File 11 of 22: components/HeroScene.tsx

```typescript
"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Bokeh() {
  const points = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      size[i] = Math.random() * 2 + 0.5;
    }
    return [pos, size];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.015;
    points.current.position.y = Math.sin(t * 0.08) * 0.2;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9b8064"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <Bokeh />
      </Canvas>
    </div>
  );
}
```

### File 12 of 22: components/Hero.tsx

```typescript
"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ASSETS } from "@/constants/assets";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[769px] w-full overflow-hidden bg-ink"
    >
      <motion.video
        style={{ scale: videoScale }}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={ASSETS.videos.hero} type="video/mp4" />
      </motion.video>

      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/30" />

      <HeroScene />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex h-full max-w-container flex-col justify-center px-6 md:mx-auto md:px-14"
      >
        <div className="max-w-[720px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="font-sans text-[10px] font-light uppercase tracking-[0.3em] text-bronze"
          >
            01 / Introduction
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.35 }}
            className="mt-6 font-serif text-[56px] leading-[0.95] tracking-[-0.03em] text-cream sm:text-[76px] md:text-[96px] lg:text-[112px]"
          >
            Fragrance
            <br />
            <span className="italic text-white/90">beyond</span> the
            <br />
            ordinary.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="mt-8 max-w-[460px] font-sans text-sm font-light leading-[1.8] text-cream/70 sm:text-base"
          >
            Born from rare botanicals and slow extraction, each Aurélis creation
            is designed to linger — intimate, evocative, unforgettable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
            className="mt-10 flex flex-wrap items-center gap-5 sm:gap-7"
          >
            <a
              href="#collection"
              className="bg-cream px-8 py-4 font-sans text-[11px] uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore Collection
            </a>
            <a
              href="#finder"
              className="link-underline font-sans text-[11px] uppercase tracking-[0.22em] text-cream"
            >
              Find Your Scent →
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-6 z-10 flex items-center gap-3 md:left-14">
        <span className="h-px w-8 bg-cream/30" />
        <span className="animate-scroll-bounce font-sans text-[9px] font-light uppercase tracking-[0.25em] text-cream/50">
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
```

### File 13 of 22: components/Philosophy.tsx

```typescript
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "18", label: "Months of maceration" },
  { value: "24%", label: "Perfume concentration" },
  { value: "04", label: "Compositions, no more" },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

function AnimatedStat({
  raw,
  label,
  inView,
}: {
  raw: string;
  label: string;
  inView: boolean;
}) {
  const match = raw.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const isPadded = match && match[1].startsWith("0") && match[1].length > 1;

  const [display, setDisplay] = useState(raw);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce || !match) {
      setDisplay(raw);
      return;
    }
    const controls = animate(0, targetNum, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        const rounded = Math.round(v);
        const str = isPadded ? String(rounded).padStart(2, "0") : String(rounded);
        setDisplay(`${str}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, targetNum, suffix, isPadded, raw, reduce, match]);

  return (
    <div>
      <p className="font-serif text-[42px] leading-none text-cream tabular-nums sm:text-[50px]">
        {display}
      </p>
      <p className="mt-3 font-sans text-[10px] font-light uppercase tracking-[0.24em] text-cream/55">
        {label}
      </p>
    </div>
  );
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 90, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 90, damping: 20 });

  const mouseTiltX = useTransform(smoothMouseX, [-1, 1], [-14, 14]);
  const mouseTiltY = useTransform(smoothMouseY, [-1, 1], [10, -10]);

  const combinedY = useTransform(
    [imgParallaxY, mouseTiltY],
    ([pY, mY]) => (pY as number) + (mY as number)
  );
  const imgX = mouseTiltX;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.04, 1.08]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = imageFrameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, nx)));
    mouseY.set(Math.max(-1, Math.min(1, ny)));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const quoteLine1 = ["Scent", "is", "not", "an", "accessory."];
  const quoteLine2 = ["It", "is", "an", "atmosphere", "you", "leave", "behind."];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink px-6 py-28 text-cream md:px-14 md:py-[200px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-48 top-1/4 h-[560px] w-[560px] rounded-full opacity-30 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(155,128,100,0.35) 0%, rgba(53,25,26,0.18) 55%, transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col">
            <Reveal>
              <div className="flex items-center gap-3.5">
                <span className="h-px w-9 bg-bronze" />
                <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
                  02 / The Philosophy
                </p>
              </div>
            </Reveal>

            <div className="mt-8 overflow-hidden">
              <motion.blockquote
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="font-serif text-[42px] leading-[1.08] tracking-[-0.02em] sm:text-[54px] md:text-[64px]"
              >
                <span className="block">
                  {quoteLine1.map((w, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="mr-[0.28em] inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
                <span className="mt-1 block italic text-white/80">
                  {quoteLine2.map((w, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="mr-[0.28em] inline-block"
                    >
                      {w}
                    </motion.span>
                  ))}
                </span>
              </motion.blockquote>
            </div>

            <Reveal delay={0.15}>
              <p className="mt-9 max-w-[480px] font-sans text-sm font-light leading-[1.85] text-cream/65 sm:text-base">
                We reject seasonal churn. Every Aurélis fragrance is macerated
                in Grasse across eighteen months, allowing raw botanical absolutes
                to marry with fine molecular fixatives. Nothing rushed. Nothing
                superfluous.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-5 max-w-[480px] font-sans text-sm font-light leading-[1.85] text-cream/65 sm:text-base">
                The result is an intimate sillage — a quiet resonance that
                belongs entirely to the skin that carries it.
              </p>
            </Reveal>

            <div
              ref={statsRef}
              className="mt-16 grid grid-cols-3 gap-6 border-t border-cream/10 pt-10 sm:gap-10"
            >
              {STATS.map((s, idx) => (
                <AnimatedStat
                  key={idx}
                  raw={s.value}
                  label={s.label}
                  inView={statsInView}
                />
              ))}
            </div>
          </div>

          <Reveal delay={0.12} className="relative">
            <div
              ref={imageFrameRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-[560px] w-full overflow-hidden sm:h-[700px] md:h-[832px]"
            >
              <motion.div
                style={reduce ? undefined : { x: imgX, y: combinedY, scale }}
                className="absolute inset-0"
              >
                <Image
                  src={ASSETS.images.philosophyGrasse}
                  alt="The Aurélis bottle in low light"
                  fill
                  sizes="(min-width: 1024px) 666px, 100vw"
                  className="object-cover"
                  priority
                />

                {!reduce && (
                  <>
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(28% 22% at 68% 32%, rgba(255,214,168,0.1), transparent 72%)",
                      }}
                      animate={{
                        opacity: [0.35, 0.85, 0.35],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.3) 100%)",
                      }}
                    />
                  </>
                )}
              </motion.div>

              <div className="absolute inset-0 border border-cream/[0.08]" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between font-sans text-[9px] font-light uppercase tracking-[0.24em] text-cream/70 backdrop-blur-[2px]">
                <span>Grasse, France</span>
                <span>Batch No. 04</span>
              </div>
            </div>

            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-full w-full border border-bronze/20"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### File 14 of 22: components/SignatureCollection.tsx

```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const FILTERS = ["All", "Woody", "Floral", "Amber", "Fresh"];

const PRODUCTS = [
  {
    index: "01",
    name: "Noir",
    family: "Woody",
    notes: "Smoked Woods / Amber / Musk",
    price: 245,
    image: ASSETS.images.productNoir,
  },
  {
    index: "02",
    name: "Élan",
    family: "Fresh",
    notes: "Bergamot / Iris / Cedar",
    price: 210,
    image: ASSETS.images.productElan,
  },
  {
    index: "03",
    name: "Velvet",
    family: "Floral",
    notes: "Rose / Vanilla / Tonka",
    price: 265,
    image: ASSETS.images.productVelvet,
  },
];

export default function SignatureCollection() {
  const [active, setActive] = useState("All");
  const visible = PRODUCTS.filter(
    (p) => active === "All" || p.family === active
  );

  return (
    <section id="collection" className="bg-cream px-6 pb-24 pt-6 text-charcoal md:px-14 md:pb-[170px]">
      <div className="mx-auto max-w-container">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-charcoal/10 pb-10 md:flex-row md:items-end">
          <Reveal>
            <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze-dim">
              03 / The Collection
            </p>
            <h2 className="mt-3 font-serif text-[42px] leading-none tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
              Signature Compositions
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`rounded-full px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive
                        ? "bg-charcoal text-cream"
                        : "border border-charcoal/15 text-charcoal/70 hover:border-charcoal/40"
                    }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          {visible.map((p) => (
            <motion.article
              key={p.index}
              variants={revealItem}
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream-dim">
                <Image
                  src={p.image}
                  alt={`${p.name} Eau de Parfum`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 font-sans text-[10px] font-light uppercase tracking-[0.24em] text-charcoal/50">
                  {p.index}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-cream/90 px-3 py-1 font-sans text-[9px] font-light uppercase tracking-[0.2em] text-charcoal backdrop-blur-sm">
                  {p.family}
                </span>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="font-serif text-[28px] leading-none tracking-[-0.01em]">
                  {p.name}
                </h3>
                <span className="font-sans text-xs font-light tracking-[0.1em] text-charcoal/80">
                  ${p.price}
                </span>
              </div>

              <p className="mt-2 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-bronze-dim">
                {p.notes}
              </p>

              <button className="mt-5 w-full border border-charcoal/20 py-3.5 font-sans text-[10px] uppercase tracking-[0.24em] text-charcoal transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-cream">
                Discover Fragrance
              </button>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
```

### File 15 of 22: components/ScentJourney.tsx

```typescript
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const STAGES = [
  {
    label: "01",
    title: "First Light",
    notes: "Bergamot / Citrus",
    copy: "The opening: cold air, citrus peel, a room not yet entered. It lasts minutes and sets everything after it.",
  },
  {
    label: "02",
    title: "The Encounter",
    notes: "Rose / Iris / Amber",
    copy: "The heart emerges: warmer, closer, unmistakably present. This is the scent someone will remember you by.",
  },
  {
    label: "03",
    title: "The Memory",
    notes: "Oud / Musk / Vanilla",
    copy: "What lingers hours later — on skin, on fabric, in a room long after you've gone. The part that becomes memory.",
  },
];

export default function ScentJourney() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];

  return (
    <section className="relative h-auto min-h-[695px] w-full overflow-hidden bg-ink px-6 py-24 md:px-14">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={ASSETS.videos.scentJourney} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/10 to-ink/90" />
      <div className="absolute inset-0 bg-ink/35" />

      <div className="relative z-10 mx-auto flex h-full max-w-container flex-col justify-between gap-16">
        <Reveal>
          <div className="flex items-center gap-3.5">
            <span className="h-px w-9 bg-bronze" />
            <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
              04 / Scent journey
            </span>
          </div>
          <h2 className="mt-4 font-serif text-[42px] leading-none tracking-[-0.02em] text-cream sm:text-[56px] md:text-[68px]">
            The Arc of Scent
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-sans text-[11px] font-light uppercase tracking-[0.28em] text-amber">
                  Phase {stage.label}
                </span>
                <h3 className="mt-3 font-serif text-[44px] leading-none text-cream sm:text-[58px]">
                  {stage.title}
                </h3>
                <p className="mt-3 font-sans text-xs font-light uppercase tracking-[0.22em] text-cream/70">
                  {stage.notes}
                </p>
                <p className="mt-6 max-w-[500px] font-sans text-sm font-light leading-[1.85] text-cream/70 sm:text-base">
                  {stage.copy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            <div className="flex gap-2">
              {STAGES.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => setActive(idx)}
                  className="group relative flex-1 py-3 text-left"
                >
                  <div className="h-[2px] w-full bg-cream/20 transition-colors duration-300 group-hover:bg-cream/40">
                    {active === idx && (
                      <motion.div
                        layoutId="activeStageBar"
                        className="h-full bg-cream"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between font-sans text-[10px] font-light uppercase tracking-[0.2em]">
                    <span
                      className={
                        active === idx ? "text-cream" : "text-cream/50"
                      }
                    >
                      {s.label}
                    </span>
                    <span
                      className={
                        active === idx ? "text-cream" : "text-cream/40"
                      }
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between font-sans text-[10px] font-light uppercase tracking-[0.22em] text-cream/50">
              <span>0h — Top</span>
              <span>2h — Heart</span>
              <span>8h+ — Base</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### File 16 of 22: components/FeaturedNoir.tsx

```typescript
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const NOTES = [
  { label: "Top", value: "Saffron" },
  { label: "Heart", value: "Iris" },
  { label: "Base", value: "Oud" },
];

export default function FeaturedNoir() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section className="bg-ink px-6 py-24 text-cream md:px-14 md:py-[180px]">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ perspective: 1200 }}
            className="relative h-[420px] w-full sm:h-[540px] lg:h-[666px]"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative h-full w-full overflow-hidden"
            >
              <Image
                src={ASSETS.images.featuredNoir}
                alt="Noir 01 eau de parfum, lit from behind through smoke"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/55" />
              <p className="absolute bottom-5 left-5 font-sans text-[9px] font-light uppercase tracking-[0.24em] text-cream/70">
                Eau de parfum · 50 ml
              </p>
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-col">
          <Reveal>
            <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
              05 / Featured Fragrance
            </p>
            <h2 className="mt-4 font-serif text-[52px] leading-none tracking-[-0.02em] sm:text-[68px] md:text-[84px]">
              Noir 01
            </h2>
            <p className="mt-3 font-serif text-2xl italic text-bronze">
              The darkness that lingers.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[500px] font-sans text-sm font-light leading-[1.85] text-cream/70 sm:text-base">
              A study in shadow. Rare saffron opens into cool, powdery iris before
              settling into an ancient resinous oud. Not a scent for daylight —
              crafted for the hours after everything else has quieted down.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-b border-t border-cream/10 py-6">
              {NOTES.map((n) => (
                <div key={n.label}>
                  <p className="font-sans text-[9px] font-light uppercase tracking-[0.24em] text-bronze">
                    {n.label}
                  </p>
                  <p className="mt-1.5 font-serif text-xl sm:text-2xl">
                    {n.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <span className="font-serif text-3xl">$245</span>
              <button className="bg-cream px-8 py-4 font-sans text-[11px] uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.03]">
                Acquire Noir 01
              </button>
              <a
                href="#"
                className="link-underline font-sans text-[11px] uppercase tracking-[0.22em] text-cream"
              >
                Sample 2ml — $18
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### File 17 of 22: components/Composition.tsx

```typescript
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, revealItem } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const INGREDIENTS = [
  {
    number: "01",
    name: "Saffron",
    subtitle: "Warm / Spiced",
    copy: "Threads picked at dawn. Three grams of it colours an entire maceration.",
    image: ASSETS.images.ingredientSaffron,
    offset: "",
  },
  {
    number: "02",
    name: "Iris",
    subtitle: "Powdery / Elegant",
    copy: "Rhizomes rested six years before distillation. Cool, mineral, quietly expensive.",
    image: ASSETS.images.ingredientIris,
    offset: "lg:mt-16",
  },
  {
    number: "03",
    name: "Oud",
    subtitle: "Deep / Smoky",
    copy: "Resinous heartwood, aged in clay. The base note the house is built on.",
    image: ASSETS.images.ingredientOud,
    offset: "lg:mt-32",
  },
];

export default function Composition() {
  return (
    <section className="bg-ink px-6 py-24 text-cream md:px-14 md:py-[170px]">
      <div className="mx-auto max-w-container">
        <div className="relative flex flex-col items-start justify-between gap-6 pb-16 sm:flex-row sm:items-end">
          <Reveal>
            <h2 className="font-serif text-[42px] leading-none tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
              The Composition
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
              06 / Raw Materials
            </p>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {INGREDIENTS.map((ing) => (
            <motion.div
              key={ing.number}
              variants={revealItem}
              className={`flex flex-col ${ing.offset}`}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-soft">
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <span className="absolute left-4 top-4 font-sans text-[10px] font-light uppercase tracking-[0.24em] text-cream/70">
                  {ing.number}
                </span>
              </div>

              <div className="mt-7 flex items-baseline justify-between">
                <h3 className="font-serif text-3xl">{ing.name}</h3>
                <span className="font-sans text-[10px] font-light uppercase tracking-[0.22em] text-bronze">
                  {ing.subtitle}
                </span>
              </div>

              <p className="mt-3 font-sans text-xs font-light leading-[1.8] text-cream/60">
                {ing.copy}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
```

### File 18 of 22: components/TheHouse.tsx

```typescript
"use client";

import Image from "next/image";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

export default function TheHouse() {
  return (
    <section className="bg-cream px-6 py-24 text-charcoal md:px-14 md:py-[180px]">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative h-[420px] w-full overflow-hidden bg-ink-soft sm:h-[560px] lg:h-[799px]">
            <Image
              src={ASSETS.images.theHouse}
              alt="Petals and stone beside the Aurélis bottle"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze-dim">
            08 / The house
          </p>

          <h2 className="mt-4 font-serif text-[42px] leading-none tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
            Rooted in Grasse.
            <br />
            <span className="italic">Crafted in solitude.</span>
          </h2>

          <p className="mt-8 max-w-[480px] font-sans text-sm font-light leading-[1.85] text-charcoal/70 sm:text-base">
            Our atelier sits between the limestone slopes of the Alpes-Maritimes
            and the lavender fields of Provence. Here, we compose slowly,
            shielded from trend and haste.
          </p>

          <p className="mt-5 max-w-[480px] font-sans text-sm font-light leading-[1.85] text-charcoal/70 sm:text-base">
            Every maceration takes eighteen months. Every bottle is filled by
            hand. We make only four compositions a year — no more, no fewer.
          </p>

          <a
            href="#"
            className="link-underline mt-10 inline-block font-sans text-[11px] uppercase tracking-[0.22em] text-charcoal"
          >
            Read Our Story →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
```

### File 19 of 22: components/ScentFinder.tsx

```typescript
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./motion/Reveal";

const FEELINGS = ["Mysterious", "Elegant", "Sensual", "Fresh"];
const WORLDS = ["Woody", "Floral", "Amber", "Fresh"];

const RECOMMENDATIONS: Record<string, { name: string; copy: string }> = {
  "Mysterious-Woody": { name: "Noir", copy: "Smoked woods, amber and musk — a scent that enters the room before you do." },
  "Mysterious-Floral": { name: "Velvet", copy: "Dark rose and tonka, wrapped in shadow and warmth." },
  "Mysterious-Amber": { name: "Noir", copy: "Deep amber and oud, built for evenings that linger." },
  "Mysterious-Fresh": { name: "Élan", copy: "A cool, guarded opening that reveals its depth slowly." },
  "Elegant-Woody": { name: "Noir", copy: "Refined smoke and cedar — restrained, deliberate, unforgettable." },
  "Elegant-Floral": { name: "Velvet", copy: "Rose and vanilla composed with quiet, powdery elegance." },
  "Elegant-Amber": { name: "Velvet", copy: "Warm amber softened by iris — polished and composed." },
  "Elegant-Fresh": { name: "Élan", copy: "Bergamot and iris, effortless and understated." },
  "Sensual-Woody": { name: "Noir", copy: "Skin-warm woods and musk, low and intimate." },
  "Sensual-Floral": { name: "Velvet", copy: "Rose, vanilla and tonka — soft, close, unmistakably sensual." },
  "Sensual-Amber": { name: "Velvet", copy: "Amber and vanilla wrapped around skin like warmth itself." },
  "Sensual-Fresh": { name: "Élan", copy: "A fresh top note that settles into something quietly intimate." },
  "Fresh-Woody": { name: "Élan", copy: "Bergamot and cedar — clean, grounded, effortlessly cool." },
  "Fresh-Floral": { name: "Élan", copy: "Iris and citrus, bright and unmistakably fresh." },
  "Fresh-Amber": { name: "Élan", copy: "A fresh composition with just enough amber to feel complete." },
  "Fresh-Fresh": { name: "Élan", copy: "Bergamot, iris and cedar — the house's brightest signature." },
};

export default function ScentFinder() {
  const [feeling, setFeeling] = useState<string | null>(null);
  const [world, setWorld] = useState<string | null>(null);

  const result = useMemo(() => {
    if (!feeling || !world) return null;
    return RECOMMENDATIONS[`${feeling}-${world}`] ?? null;
  }, [feeling, world]);

  return (
    <section id="finder" className="bg-charcoal px-6 py-24 text-cream md:px-14 md:py-[170px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
            09 / Scent finder
          </p>
          <h2 className="mt-5 max-w-[565px] font-serif text-[42px] leading-[0.98] tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
            Find your
            <br />
            <span className="italic">signature scent.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-3 lg:gap-16">
          <Reveal delay={0.05}>
            <fieldset>
              <legend className="px-0.5 font-sans text-[10px] font-light uppercase tracking-[0.26em] text-cream/55">
                What do you want to feel?
              </legend>
              <div className="mt-6 flex flex-col gap-2.5">
                {FEELINGS.map((f) => {
                  const isActive = feeling === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setFeeling(f)}
                      className={`rounded-full border px-5 py-[11px] text-left font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive
                          ? "border-cream bg-cream text-charcoal"
                          : "border-cream/20 text-cream/75 hover:border-cream/45"
                      }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.1}>
            <fieldset>
              <legend className="px-0.5 font-sans text-[10px] font-light uppercase tracking-[0.26em] text-cream/55">
                Choose your world
              </legend>
              <div className="mt-6 flex flex-col gap-2.5">
                {WORLDS.map((w) => {
                  const isActive = world === w;
                  return (
                    <button
                      key={w}
                      onClick={() => setWorld(w)}
                      className={`rounded-full border px-5 py-[11px] text-left font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive
                          ? "border-cream bg-cream text-charcoal"
                          : "border-cream/20 text-cream/75 hover:border-cream/45"
                      }`}
                    >
                      {w}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.15} className="border-cream/10 pt-10 lg:border-l lg:pl-10 lg:pt-0">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-amber">
                    Your match
                  </p>
                  <p className="mt-4 font-serif text-[54px] leading-none text-cream">
                    {result.name}
                  </p>
                  <p className="mt-3.5 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-cream/60">
                    {feeling} · {world}
                  </p>
                  <p className="mt-4 max-w-[345px] font-sans text-sm font-light leading-[1.8] text-cream/62">
                    {result.copy}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.32 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-amber">
                    Awaiting your answers
                  </p>
                  <p className="mt-4 font-serif text-[54px] leading-none text-cream">
                    —
                  </p>
                  <p className="mt-3.5 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-cream/60">
                    Choose a feeling and a world
                  </p>
                  <p className="mt-4 max-w-[345px] font-sans text-sm font-light leading-[1.8] text-cream/62">
                    Two choices are enough. We&apos;ll narrow four
                    compositions down to the one that suits you.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 flex flex-col gap-3.5">
              <button
                disabled={!result}
                className="min-w-[180px] bg-cream px-7 py-[18px] font-sans text-[11px] uppercase tracking-[0.24em] text-ink transition-transform duration-300 enabled:hover:scale-[1.03] disabled:opacity-30"
              >
                Find my scent
              </button>
              <a
                href="#"
                className={`border border-cream/28 px-7 py-[18px] text-center font-sans text-[11px] uppercase tracking-[0.24em] text-cream transition-opacity ${
                  result ? "opacity-100" : "pointer-events-none opacity-30"
                }`}
              >
                View fragrance
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

### File 20 of 22: components/Testimonial.tsx

```typescript
"use client";

import { Reveal } from "./motion/Reveal";

export default function Testimonial() {
  return (
    <section className="bg-cream px-6 py-24 text-charcoal md:px-14 md:py-40">
      <Reveal className="mx-auto flex max-w-[1000px] flex-col items-center text-center">
        <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze-dim">
          10 / In their words
        </p>

        <blockquote className="mt-14 font-serif text-[32px] italic leading-[1.15] tracking-[-0.015em] sm:text-[44px] md:text-[54px]">
          &ldquo;It doesn&apos;t enter the room.
          <br />
          It changes the room.&rdquo;
        </blockquote>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-11">
          <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-bronze-dim">
            ★★★★★
          </span>
          <span className="h-[22px] w-px bg-charcoal/20" />
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-charcoal/60">
            4.9 / 5
          </span>
          <span className="h-[22px] w-px bg-charcoal/20" />
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-charcoal/60">
            2,400+ fragrance lovers
          </span>
        </div>
      </Reveal>
    </section>
  );
}
```

### File 21 of 22: components/ClosingCTA.tsx

```typescript
"use client";

import Image from "next/image";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

export default function ClosingCTA() {
  return (
    <section className="relative h-[560px] w-full overflow-hidden bg-ink sm:h-[720px] md:h-[953px]">
      <Image
        src={ASSETS.images.closingCta}
        alt="Cinematic closing scene of the Aurélis bottle"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex h-full max-w-container flex-col justify-center px-6 md:px-14">
        <Reveal>
          <h2 className="font-serif text-[64px] leading-[0.95] tracking-[-0.03em] text-cream sm:text-[92px] md:text-[120px] lg:text-[144px]">
            <span className="block">Leave</span>
            <span className="block italic text-white/80">something</span>
            <span className="block">behind.</span>
          </h2>
          <p className="mt-8 max-w-[420px] font-sans text-sm font-light leading-[1.8] text-cream/70 sm:text-base">
            Four compositions. Hand-bottled in Grasse. Shipped worldwide with
            complimentary 2ml discovery samples.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="#collection"
              className="bg-cream px-8 py-4 font-sans text-[11px] uppercase tracking-[0.22em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Shop the Collection
            </a>
            <a
              href="#finder"
              className="link-underline font-sans text-[11px] uppercase tracking-[0.22em] text-cream"
            >
              Find Your Scent →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

### File 22 of 22: components/Footer.tsx

```typescript
"use client";

import { useState } from "react";
import { Reveal } from "./motion/Reveal";

const EXPLORE = ["Collections", "Perfumes", "Story", "Journal"];
const HELP = ["Contact", "Shipping", "Returns", "FAQ"];
const SOCIAL = ["Instagram", "Pinterest", "TikTok"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <footer className="border-t border-cream/10 bg-ink px-6 pb-9 pt-24 text-cream md:px-14 md:pt-[110px]">
      <div className="mx-auto grid max-w-container grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="font-serif text-[26px] uppercase tracking-[0.2em] text-cream">
            Aurélis
          </p>
          <p className="mt-4 max-w-[250px] font-sans text-sm font-light leading-[1.8] text-cream/55">
            Fragrance beyond the ordinary.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-bronze">
            Explore
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {EXPLORE.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="link-underline text-[13px] font-light text-cream/85"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-bronze">
            Help
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {HELP.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="link-underline text-[13px] font-light text-cream/85"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-bronze">
            Social
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {SOCIAL.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="link-underline text-[13px] font-light text-cream/85"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="sm:col-span-2 lg:col-span-5">
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-bronze">
            Join our world
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex max-w-[533px] items-center gap-3 border-b border-cream/24 pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-transparent font-sans text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="link-underline shrink-0 font-sans text-[11px] uppercase tracking-[0.22em] text-cream"
            >
              {submitted ? "Subscribed ✓" : "Subscribe →"}
            </button>
          </form>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-container flex-col gap-3 border-t border-cream/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-cream/40">
          © 2026 Aurélis
        </span>
        <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-cream/40">
          All rights reserved
        </span>
      </div>
    </footer>
  );
}
```

---

### Step 2: Run Application

```bash
npm run dev
```

Verify that http://localhost:3000 loads the full Aurélis luxury perfume experience with the hero video background, 3D interactive particle canvas, 18-month maceration stats counter, interactive scent finder quiz, and seamless cloud CDN assets.
