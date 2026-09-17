"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./motion/Reveal";

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

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <section className="bg-ink-soft px-6 py-24 text-cream md:px-14">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-16 py-8 lg:grid-cols-2 lg:gap-24">
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
                src="/images/featured-noir.jpg"
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

        <Reveal delay={0.1}>
          <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
            06 / Featured — Noir 01
          </p>
          <h2 className="mt-5 font-serif text-[42px] leading-[0.98] tracking-[-0.02em] sm:text-[56px] md:text-[68px]">
            The scent
            <br />
            <span className="italic">of midnight.</span>
          </h2>
          <p className="mt-9 max-w-[402px] font-sans text-[17px] font-light leading-[1.8] text-cream/68">
            A deep composition of smoked woods, warm amber and soft musk.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-5 border-y border-cream/10 py-6">
            {NOTES.map((note) => (
              <div key={note.label}>
                <p className="font-sans text-[9px] font-light uppercase tracking-[0.22em] text-bronze">
                  {note.label}
                </p>
                <p className="mt-2.5 font-serif text-[26px] text-cream">
                  {note.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3.5">
            <a
              href="#"
              className="inline-flex items-center bg-cream px-8 py-[18px] font-sans text-[11px] uppercase tracking-[0.24em] text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              Discover Noir
            </a>
            <a
              href="#"
              className="inline-flex items-center border border-cream/30 px-7 py-[18px] font-sans text-[11px] uppercase tracking-[0.24em] text-cream transition-all duration-300 hover:scale-[1.03] hover:border-cream/60"
            >
              Add to bag · $245
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
