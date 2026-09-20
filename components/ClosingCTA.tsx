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

          <p className="mt-10 font-sans text-[17px] font-light text-cream/70">
            Find the fragrance they&apos;ll remember.
          </p>

          <a
            href="#collection"
            className="mt-10 inline-flex w-fit items-center bg-cream px-10 py-5 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            Explore the collection
          </a>
        </Reveal>
      </div>
    </section>
  );
}
