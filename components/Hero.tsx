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
        <div className="mb-5 flex items-center gap-4">
          <span className="h-px w-11 bg-bronze" />
          <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
            Maison Aurélis · Est. 2026
          </span>
        </div>

        <h1 className="font-serif text-[64px] leading-[0.98] tracking-[-0.02em] text-cream sm:text-[86px] md:text-[110px] lg:text-[124px]">
          <span className="block">Scent</span>
          <span className="block pl-4 italic text-cream-dim sm:pl-10 md:pl-14">
            that becomes
          </span>
          <span className="block">memory.</span>
        </h1>

        <p className="mt-7 max-w-[382px] font-sans text-base font-light leading-[1.8] text-cream/70">
          Fragrances crafted to linger beyond the moment — expressive,
          intimate, unforgettable.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3.5">
          <a
            href="#collection"
            className="group inline-flex items-center bg-cream px-8 py-[18px] font-sans text-[11px] font-light uppercase tracking-[0.24em] text-ink transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_10px_30px_-10px_rgba(241,238,231,0.4)]"
          >
            Explore collection
          </a>
          <a
            href="#finder"
            className="inline-flex items-center border border-cream/30 px-8 py-[18px] font-sans text-[11px] font-light uppercase tracking-[0.24em] text-cream transition-all duration-300 hover:scale-[1.03] hover:border-cream/60"
          >
            Discover your scent
          </a>
        </div>
      </motion.div>

      <div className="absolute right-6 top-[328px] z-10 hidden flex-col items-end gap-[22px] md:right-14 md:flex">
        <p className="font-serif text-[28px] uppercase tracking-[0.12em] text-cream">
          No. 01
        </p>
        <span className="h-14 w-px bg-gradient-to-b from-bronze/70 to-transparent" />
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-white">
          Eau de parfum
        </p>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.24em] text-white">
          50 ml
        </p>
      </div>

      <div className="absolute bottom-14 left-6 z-10 flex items-center gap-3.5 md:left-14">
        <span className="h-[54px] w-px bg-bronze/30" />
        <span className="animate-scroll-bounce font-sans text-[9px] font-light uppercase tracking-[0.24em] text-cream/50">
          Scroll
        </span>
      </div>
    </section>
  );
}
