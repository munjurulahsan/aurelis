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
