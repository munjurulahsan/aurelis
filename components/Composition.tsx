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
              07 / Raw materials
            </p>
          </Reveal>
          <div className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bronze/55 to-transparent" />
        </div>

        <RevealGroup className="mt-24 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {INGREDIENTS.map((item) => (
            <motion.div
              key={item.number}
              variants={revealItem}
              className={`group ${item.offset}`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-block h-2.5 w-2.5 rotate-45 border border-bronze" />
                <span className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-cream/55">
                  {item.number} — {item.name}
                </span>
              </div>

              <div className="relative mt-6 aspect-square overflow-hidden border border-cream/10 bg-black">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/10 to-ink/70" />
              </div>

              <h3 className="mt-6 font-serif text-[32px] text-cream">
                {item.name}
              </h3>
              <p className="mt-2 font-sans text-[10px] font-light uppercase tracking-[0.22em] text-bronze">
                {item.subtitle}
              </p>
              <p className="mt-4 max-w-[283px] font-sans text-sm font-light leading-[1.8] text-cream/60">
                {item.copy}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
