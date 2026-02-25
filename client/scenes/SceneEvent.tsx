import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { SceneData } from "../data";

type TypePhase = "typing" | "holding" | "erasing";

function RotatingTypewriter({
  phrases,
  typeSpeedMs = 35,
  startDelayMs = 250,
  holdMs = 900,
  eraseSpeedMs = 22,
  betweenMs = 250,
  cursor = true,
  className = "",
}: {
  phrases: string[];
  typeSpeedMs?: number;
  startDelayMs?: number;
  holdMs?: number;
  eraseSpeedMs?: number;
  betweenMs?: number;
  cursor?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<TypePhase>("typing");
  const [visibleCount, setVisibleCount] = useState(0);

  const current = phrases[index] ?? "";
  const letters = useMemo(() => current.split(""), [current]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      const delay = visibleCount === 0 ? startDelayMs : typeSpeedMs;

      if (visibleCount < letters.length) {
        t = setTimeout(() => setVisibleCount((c) => c + 1), delay);
      } else {
        t = setTimeout(() => setPhase("holding"), holdMs);
      }
    }

    if (phase === "holding") {
      t = setTimeout(() => setPhase("erasing"), holdMs);
    }

    if (phase === "erasing") {
      if (visibleCount > 0) {
        t = setTimeout(() => setVisibleCount((c) => c - 1), eraseSpeedMs);
      } else {
        t = setTimeout(() => {
          setIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, betweenMs);
      }
    }

    return () => {
      if (t) clearTimeout(t);
    };
  }, [
    phase,
    visibleCount,
    letters.length,
    phrases.length,
    typeSpeedMs,
    startDelayMs,
    holdMs,
    eraseSpeedMs,
    betweenMs,
  ]);

  const key = `${index}-${current}`;

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={key}
          initial={{ opacity: 0, y: 6, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
          transition={{ duration: 0.25 }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letters.slice(0, visibleCount).map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: i * 0.012 }}
              style={{ display: "inline-block" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>

      {cursor && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          style={{ marginLeft: 2 }}
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export default function SceneEvent({ data }: { data: SceneData["event"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const topTickerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 0, y: 50 },
        { clipPath: "inset(0% 0 0 0)", opacity: 1, y: 0, duration: 1.5, ease: "power4.out" }
      );

      tl.fromTo(
        topTickerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );

      const words = subtitleRef.current?.querySelectorAll(".word");
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" },
          "-=0.8"
        );
      }

      tl.fromTo(
        themeRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.45"
      );

      tl.fromTo(
        [metaRef.current, hairlineRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

      gsap.to(hairlineRef.current, {
        x: "100%",
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      gsap.to(containerRef.current, {
        y: -4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full flex-col bg-black text-white px-8 py-16 md:p-24 justify-between relative"
    >
      <div className="flex justify-between items-start">
        <div className="max-w-full flex items-center gap-3 font-sans text-[12px] tracking-[0.22em] uppercase opacity-70">
          <span className="shrink-0">{data.eventTitle}</span>
          <span className="opacity-40">|</span>
          <div ref={topTickerRef} className="min-w-0 tracking-[0.12em] normal-case opacity-90">
            <RotatingTypewriter phrases={data.eventPhrases} cursor={false} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow text-center">
        <h1
          ref={titleRef}
          className="text-[clamp(2.6rem,10vw,9rem)] font-serif leading-[0.85] tracking-tight uppercase mb-8 whitespace-nowrap"
        >
          Café com Aner
        </h1>
        <div
          ref={subtitleRef}
          className="max-w-3xl min-h-[3.2em] text-[clamp(1rem,2vw,1.5rem)] font-sans font-light leading-relaxed tracking-wide"
        >
          {(data.eventSubtitle ?? "").split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </div>
        <div
          ref={themeRef}
          className="mt-6 max-w-3xl border border-white/20 bg-white/[0.03] px-4 py-3 md:px-6 md:py-4"
        >
          <div className="font-sans text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">Tema de HOJE</div>
          <p className="text-[clamp(0.95rem,1.4vw,1.2rem)] leading-relaxed text-white/90 font-sans">
            {data.eventTheme}
          </p>
        </div>
      </div>

      <div className="w-full">
        <div ref={hairlineRef} className="hairline mb-8 w-full origin-left" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div ref={metaRef} className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-70">
            {data.eventMeta}
          </div>
          <div className="hidden md:block" />
          <div className="flex justify-end">
            <button className="group font-sans text-xs uppercase tracking-[0.2em] border-b border-white/30 pb-1 hover:border-white transition-colors">
              {data.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
