"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = ["Collections", "Perfumes", "Story", "Journal"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-cream/10 bg-ink/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid w-full max-w-container grid-cols-3 items-center px-6 py-6 md:px-14">
        <a
          href="#"
          className="w-fit font-serif text-2xl uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-70"
        >
          Aurélis
        </a>

        <div className="hidden justify-self-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="link-underline py-1.5 font-sans text-[11px] font-light uppercase tracking-[0.22em] text-cream/80 transition-colors hover:text-cream"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-self-end gap-6">
          <button className="hidden py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream sm:inline-block">
            Search
          </button>
          <button className="hidden py-2 font-sans text-[11px] uppercase tracking-[0.2em] text-cream/80 transition-colors hover:text-cream sm:inline-block">
            Account
          </button>
          <button className="rounded-full border border-cream/20 px-4 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream/50 hover:bg-cream/5">
            Bag (0)
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
