"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Reveal } from "./motion/Reveal";
import { ASSETS } from "@/constants/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "18", label: "Months of maceration" },
  { value: "24%", label: "Perfume concentration" },
  { value: "04", label: "Compositions, no more" },
];

function AnimatedStat({
  value,
  label,
  reduce,
}: {
  value: string;
  label: string;
  reduce: boolean;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const match = value.match(/^(\d+)(%?)$/);
  const numeric = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const padded = value.length > 1 && value.startsWith("0");

  const [display, setDisplay] = useState(reduce ? value : (padded ? "00" : "0") + suffix);

  useEffect(() => {
    if (!inView) {
      if (!reduce) setDisplay((padded ? "00" : "0") + suffix);
      return;
    }
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, numeric, {
      duration: 1.2,
      ease: EASE,
      onUpdate(v) {
        const rounded = Math.round(v);
        setDisplay((padded ? String(rounded).padStart(2, "0") : String(rounded)) + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, numeric, padded, suffix, reduce, value]);

  return (
    <div className="w-[170px]">
      <p ref={ref} className="font-serif text-4xl tabular-nums text-cream">
        {display}
      </p>
      <p className="mt-2 font-sans text-[10px] font-light uppercase tracking-[0.22em] text-cream/55">
        {label}
      </p>
    </div>
  );
}

export default function Philosophy() {
  const reduce = Boolean(useReducedMotion());

  const frameRef = useRef<HTMLDivElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: imageBoxRef,
    offset: ["start end", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.015, 1, 1.015]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  const imgX = useTransform(smx, [-1, 1], [5, -5]);
  const imgYFromMouse = useTransform(smy, [-1, 1], [5, -5]);
  const combinedY = useTransform([scrollY, imgYFromMouse], (values: number[]) => {
    const [a, b] = values;
    return a + b;
  });

  const cardX = useTransform(smx, [-1, 1], [2.5, -2.5]);
  const cardY = useTransform(smy, [-1, 1], [2.5, -2.5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch || reduce) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  const headingContainer: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
  };

  const line: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  };

  const italicLine: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 1.05, ease: EASE } },
  };

  const divider: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: reduce ? 0 : 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 1.2, ease: EASE }}
      className="border-t border-cream/10 bg-[#221f1c] px-6 py-24 text-cream md:px-14 md:py-[140px]"
    >
      <div className="mx-auto flex max-w-container flex-col items-start gap-16 lg:flex-row lg:items-end lg:gap-[92px]">
        <div className="w-full max-w-[666px]">
          <Reveal once={false}>
            <div className="flex items-center gap-3.5">
              <span className="h-px w-9 bg-bronze" />
              <span className="font-sans text-[10px] font-light uppercase tracking-[0.28em] text-bronze">
                02 / Philosophy
              </span>
            </div>
          </Reveal>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            variants={headingContainer}
            className="mt-[54px] font-serif text-[44px] leading-[0.96] tracking-[-0.02em] sm:text-[64px] md:text-[86px]"
          >
            <motion.span variants={line} className="block">
              A fragrance
            </motion.span>
            <motion.span variants={line} className="block">
              is more than
            </motion.span>
            <motion.span variants={italicLine} className="block italic text-amber">
              a scent.
            </motion.span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            variants={divider}
            style={{ transformOrigin: "left" }}
            className="mt-14 h-px w-full bg-cream/10"
          />

          <Reveal delay={0.18} once={false}>
            <p className="mt-14 max-w-[462px] font-sans text-[17px] font-light leading-[1.85] text-cream/70">
              It is presence. It is emotion. It is the memory someone carries
              long after you&apos;ve left the room.
            </p>
          </Reveal>

          <div className="mt-16 flex flex-wrap gap-10 sm:gap-14">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} value={stat.value} label={stat.label} reduce={reduce} />
            ))}
          </div>
        </div>

        <div
          ref={frameRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[666px]"
        >
          <div
            ref={imageBoxRef}
            className="relative h-[560px] w-full overflow-hidden sm:h-[700px] md:h-[832px]"
          >
            <motion.div
              style={reduce ? undefined : { x: imgX, y: combinedY, scale }}
              className="absolute inset-0"
            >
              <Image
                src={ASSETS.images.philosophyGrasse}
                alt="The Aurélis bottle in low light"
                fill
                sizes="(min-width: 1024px) 666px, 100vw"
                className="object-cover"
                priority
              />

              {!reduce && (
                <>
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(28% 22% at 68% 32%, rgba(255,214,168,0.1), transparent 72%)",
                    }}
                    animate={{
                      opacity: [0.35, 0.85, 0.35],
                      x: [0, 10, -4, 0],
                      y: [0, -6, 5, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(32% 30% at 30% 70%, rgba(241,238,231,0.06), transparent 75%)",
                    }}
                    animate={{
                      opacity: [0.3, 0.75, 0.3],
                      x: [0, -8, 6, 0],
                      y: [0, 8, -5, 0],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                  />
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            style={reduce ? undefined : { x: cardX, y: cardY }}
            className="absolute bottom-0 left-0 max-w-[280px] sm:left-6 sm:bottom-6"
          >
            <div className="border border-cream/15 bg-[#1a1816]/90 px-8 py-6 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-1">
              <p className="font-sans text-[10px] font-light uppercase tracking-[0.24em] text-bronze">
                Grasse, France
              </p>
              <p className="mt-2.5 font-serif text-[22px] leading-[1.4] text-cream">
                Composed by hand, in small batches, against the light.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
