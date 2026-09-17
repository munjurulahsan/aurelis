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
