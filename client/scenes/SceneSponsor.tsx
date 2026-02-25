import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SceneData } from "../data";

export default function SceneSponsor({ data }: { data: SceneData["sponsor"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".flip-card-inner", { rotateY: 0 });
      gsap.set(".split-grid", { opacity: 0 });
      gsap.set(".full-logo", { opacity: 0, scale: 0.9, y: 18 });

      const tl = gsap.timeline();

      tl.fromTo(
        phraseRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );

      tl.to(".full-logo", { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.1");

      tl.to(
        ".full-logo",
        { y: -6, duration: 0.45, ease: "power1.inOut", yoyo: true, repeat: 1 },
        "+=0.25"
      );

      tl.to(".split-grid", { opacity: 1, duration: 0.2, ease: "none" }, "-=0.15");
      tl.to(".full-logo", { opacity: 0, duration: 0.25, ease: "power1.out" }, "<");
      tl.fromTo(".flip-card", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" }, "<");
      tl.to(".flip-card-1", { x: -70, duration: 0.75, ease: "power3.inOut" }, "<+0.05");
      tl.to(".flip-card-3", { x: 70, duration: 0.75, ease: "power3.inOut" }, "<");

      tl.to(
        ".flip-card-inner",
        { rotateY: 180, duration: 1.15, stagger: 0.12, ease: "power3.inOut" },
        "+=0.2"
      );

      tl.fromTo(
        ".card-back-content",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.35"
      );

      // Hold cards briefly, then reverse back to the full composed image.
      tl.to(".card-back-content", { opacity: 0, y: -8, duration: 0.35, stagger: 0.04, ease: "power2.in" }, "+=1.1");

      tl.to(
        ".flip-card-inner",
        { rotateY: 0, duration: 1.0, stagger: 0.1, ease: "power3.inOut" },
        "+=0.05"
      );

      tl.to(".flip-card-1", { x: 0, duration: 0.75, ease: "power3.inOut" }, "-=0.35");
      tl.to(".flip-card-3", { x: 0, duration: 0.75, ease: "power3.inOut" }, "<");

      tl.to(".full-logo", { opacity: 1, duration: 0.3, ease: "power1.out" }, "-=0.1");
      tl.to(".split-grid", { opacity: 0, duration: 0.3, ease: "power1.out" }, "<");
      tl.to(".full-logo", { y: 0, scale: 1, duration: 0.35, ease: "power2.out" }, "<");

      gsap.to(containerRef.current, {
        y: -3,
        duration: 5,
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
      className="flex h-full w-full flex-col bg-black text-white px-8 py-16 md:p-24 relative overflow-hidden"
    >
      <div
        ref={phraseRef}
        className="text-center font-serif text-[clamp(1.5rem,4vw,3rem)] leading-tight max-w-4xl mx-auto mb-12"
      >
        {data.sponsorImpactPhrase}
      </div>

      <div className="flex-grow flex items-center justify-center relative w-full">
        <div className="relative w-full max-w-6xl h-[340px] md:h-[380px]">
          <div
            className="full-logo absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${data.sponsorLogoUrl})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "50% 50%",
            filter: "grayscale(100%) brightness(1.05)",
          }}
          />

          <div className="split-grid absolute inset-0 grid grid-cols-3 gap-0">
            {data.cards.map((card, i) => (
              <div
                key={i}
                className={`flip-card flip-card-${i + 1} h-full opacity-0`}
                style={{ perspective: "1400px" }}
              >
              <div
                className="flip-card-inner relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded-none"
                  style={{
                    backfaceVisibility: "hidden",
                    backgroundImage: `url(${data.sponsorLogoUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "300% 100%",
                    backgroundPosition: `${i * 50}% 50%`,
                    filter: "grayscale(100%) brightness(1.05)",
                  }}
                />

                <article
                  className="absolute inset-0 bg-white text-black p-6 md:p-8 flex flex-col justify-between"
                  style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                >
                  <div className="card-back-content flex flex-col gap-6 opacity-0">
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-40">
                      0{i + 1}
                    </span>
                    <h3 className="text-3xl font-serif tracking-tight">{card.title}</h3>
                    <div className="hairline !opacity-10" />
                    <ul className="flex flex-col gap-3">
                      {card.bullets.map((bullet, j) => (
                        <li key={j} className="font-sans text-sm tracking-wide flex items-center gap-3">
                          <span className="w-1 h-1 bg-black/20 rounded-full" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="card-back-content mt-8 opacity-0">
                    <a
                      href={card.ctaHref}
                      className="font-sans text-[10px] uppercase tracking-[0.2em] border-b border-black/20 pb-1 hover:border-black transition-colors"
                    >
                      {card.ctaLabel}
                    </a>
                  </div>
                </article>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </div>
  );
}
