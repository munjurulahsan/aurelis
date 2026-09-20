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
              05 / The scent journey
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="font-serif text-[42px] leading-[0.98] tracking-[-0.02em] text-cream sm:text-[56px] md:text-[68px]">
                Every scent
                <br />
                <span className="italic">tells a story.</span>
              </h2>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-[437px]"
              >
                <p className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
                  Stage {stage.label}
                </p>
                <p className="mt-4 font-serif text-[44px] leading-none text-cream">
                  {stage.title}
                </p>
                <p className="mt-4 font-sans text-[11px] font-light uppercase tracking-[0.24em] text-cream/60">
                  {stage.notes}
                </p>
                <p className="mt-5 font-sans text-base font-light leading-[1.8] text-cream/65">
                  {stage.copy}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3.5 lg:items-end">
            {STAGES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full max-w-[360px] items-center gap-4 border-t px-3.5 py-[18px] text-left transition-colors duration-300 ${
                    isActive
                      ? "border-transparent bg-cream/[0.06]"
                      : "border-cream/10 hover:bg-cream/[0.03]"
                  }`}
                >
                  <span
                    className={`font-sans text-[10px] uppercase tracking-[0.22em] ${
                      isActive ? "text-cream/60" : "text-cream/45"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`font-serif text-[22px] transition-colors ${
                      isActive ? "text-cream" : "text-cream/45"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span className="ml-auto">
                    <motion.span
                      animate={{ width: isActive ? 42 : 14 }}
                      className={`block h-px ${isActive ? "bg-bronze" : "bg-cream/25"}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.22em] text-cream/45">
            Top
          </span>
          <div className="relative h-px flex-1 bg-cream/15">
            <motion.div
              className="absolute inset-y-0 left-0 bg-bronze"
              animate={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="font-sans text-[9px] font-light uppercase tracking-[0.22em] text-cream/45">
            Base
          </span>
        </div>
      </div>
    </section>
  );
}
