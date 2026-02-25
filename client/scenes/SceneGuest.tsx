import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SceneData } from "../data";

export default function SceneGuest({ data }: { data: SceneData["guest"] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0-2s: foto entra com reveal horizontal e leve scale down
      tl.fromTo(
        imageRef.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.1 },
        { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 2, ease: "power3.inOut" }
      );

      // 2-6s: nome revela por linhas
      tl.fromTo(
        nameRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.5"
      );

      // Meta (Role/Company)
      tl.fromTo(
        metaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );

      // 6-12s: bio aparece com stagger de linhas
      const words = bioRef.current?.querySelectorAll(".word");
      if (words) {
        tl.fromTo(
          words,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Micro movement
      gsap.to(imageRef.current, {
        x: 4,
        duration: 6,
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
      className="flex h-full w-full flex-col bg-white text-black px-8 py-16 md:p-24 relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 h-full gap-12 items-center">
        {/* Left: Photo (5-6 columns) */}
        <div className="md:col-span-5 h-[50vh] md:h-full relative overflow-hidden">
          <div
            ref={imageRef}
            className="w-full h-full bg-cover bg-top grayscale contrast-125 scale-100"
            style={{ backgroundImage: `url(${data.guestImageUrl})` }}
          />
        </div>

        {/* Right: Content (6-7 columns) */}
        <div className="md:col-span-7 flex flex-col justify-center gap-8">
          <div className="flex flex-col gap-2">
            <div ref={metaRef} className="flex flex-col gap-1">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase opacity-60">
                Editorial Profile
              </span>
              <span className="font-sans text-xs tracking-[0.1em] font-medium uppercase">
                {data.guestRole} / {data.guestCompany}
              </span>
            </div>
            <h2
              ref={nameRef}
              className="text-[clamp(2.5rem,6vw,5rem)] font-serif leading-none tracking-tight mt-4"
            >
              {data.guestName}
            </h2>
          </div>

          <div className="hairline w-1/4" />

          <div
            ref={bioRef}
            className="max-w-md text-[clamp(1rem,1.2vw,1.25rem)] font-sans font-light leading-relaxed text-black/80"
          >
            {data.guestBio.split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            {data.guestTags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 border border-black/10 font-sans text-[9px] tracking-[0.2em] uppercase rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
