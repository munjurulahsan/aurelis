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
        <div className="flex flex-col items-start justify-between gap-8 border-b border-charcoal/10 pb-12 md:flex-row md:items-end">
          <Reveal>
            <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze-dim">
              04 / Signature scents
            </p>
            <h2 className="mt-4 font-serif text-[42px] leading-[0.96] tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
              The Signature
              <br />
              Collection
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  onClick={() => setActive(filter)}
                  className={`rounded-full border px-5 py-[11px] font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive
                      ? "border-charcoal bg-charcoal text-cream"
                      : "border-charcoal/20 text-charcoal/70 hover:border-charcoal/50"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <motion.article key={product.name} variants={revealItem} className="group">
              <a href="#" className="block">
                <div className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[592px]">
                  <Image
                    src={product.image}
                    alt={`${product.name} eau de parfum by Aurélis`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/45" />
                  <p className="absolute left-[18px] top-[18px] font-serif text-[22px] text-cream/90">
                    {product.index}
                  </p>
                  <p className="absolute right-[18px] top-[22px] font-sans text-[9px] uppercase tracking-[0.22em] text-cream/65">
                    {product.family}
                  </p>
                </div>

                <div className="mt-5 flex items-baseline justify-between px-1">
                  <h3 className="font-serif text-[32px] text-charcoal">
                    {product.name}
                  </h3>
                  <span className="font-sans text-xs tracking-[0.1em] text-charcoal/60">
                    ${product.price}
                  </span>
                </div>
                <p className="mt-3 px-1 font-sans text-[10px] uppercase tracking-[0.18em] text-charcoal/50">
                  {product.notes}
                </p>
              </a>

              <div className="mt-5 flex items-center justify-between px-1">
                <a
                  href="#"
                  className="link-underline border-b border-charcoal/30 pb-2 font-sans text-[10px] uppercase tracking-[0.22em] text-charcoal"
                >
                  View fragrance
                </a>
                <button className="rounded-full border border-charcoal/22 px-[18px] py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-cream">
                  Add · ${product.price}
                </button>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
