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
