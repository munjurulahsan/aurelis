"use client";

import Image from "next/image";
import { Reveal } from "./motion/Reveal";

export default function TheHouse() {
  return (
    <section className="bg-cream px-6 py-24 text-charcoal md:px-14 md:py-[180px]">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative h-[420px] w-full overflow-hidden bg-ink-soft sm:h-[560px] lg:h-[799px]">
            <Image
              src="/images/the-house.jpg"
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
          <h2 className="mt-5 font-serif text-[40px] leading-[0.98] tracking-[-0.02em] sm:text-[54px] md:text-[62px]">
            Crafted for
            <br />
            those who
            <br />
            leave an
            <br />
            <span className="italic text-wine">impression.</span>
          </h2>
          <p className="mt-11 max-w-[422px] pb-6 font-sans text-[17px] font-light leading-[1.85] text-charcoal/70">
            We believe fragrance should not simply be worn. It should become
            part of who you are.
          </p>

          <a
            href="#"
            className="link-underline inline-flex w-fit items-center gap-3 border border-charcoal/28 px-8 py-[18px] font-sans text-[11px] font-light uppercase tracking-[0.24em] text-charcoal transition-colors hover:border-charcoal/60"
          >
            Our philosophy
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
