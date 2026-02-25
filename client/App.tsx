import React, { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { SCENE_DATA } from "./data";
import SceneEvent from "./scenes/SceneEvent";
import SceneGuest from "./scenes/SceneGuest";
import SceneSponsor from "./scenes/SceneSponsor";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";

const SCENES = [SceneEvent, SceneGuest, SceneSponsor];
const DURATION = 15000; // 15 seconds
const AUDIO_SRC = "/audio/hitslab-elevator-elevator-jazz-lounge-music-412339.mp3";
const AUDIO_VOLUME = 0.5;

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageTransitionRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const goToScene = useCallback(
    (targetIndex: number, direction: 1 | -1) => {
      if (isTransitioningRef.current || targetIndex === currentScene) return;

      const layer = pageTransitionRef.current;
      if (!layer) {
        setCurrentScene(targetIndex);
        return;
      }

      isTransitioningRef.current = true;
      const startX = direction === 1 ? 100 : -100;
      const endX = direction === 1 ? -100 : 100;
      const isOneToTwo = currentScene === 0 && targetIndex === 1;
      const transitionBackground = isOneToTwo
        ? "linear-gradient(90deg, rgba(0,0,0,0.98) 0%, rgba(8,8,8,0.98) 45%, rgba(0,0,0,0.98) 100%)"
        : "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(246,242,233,0.98) 45%, rgba(226,220,207,0.96) 100%)";

      const tl = gsap.timeline({
        onComplete: () => {
          isTransitioningRef.current = false;
        },
      });

      tl.set(layer, {
        xPercent: startX,
        opacity: 1,
        rotate: direction === 1 ? 0.8 : -0.8,
        background: transitionBackground,
      });
      tl.to(layer, { xPercent: 0, rotate: 0, duration: 0.38, ease: "power3.in" });
      tl.add(() => setCurrentScene(targetIndex));
      tl.to(layer, { xPercent: endX, duration: 0.46, ease: "power3.out" });
      tl.set(layer, { opacity: 0 });
    },
    [currentScene]
  );

  const next = useCallback(() => {
    const target = (currentScene + 1) % SCENES.length;
    goToScene(target, 1);
  }, [currentScene, goToScene]);

  const prev = useCallback(() => {
    const target = (currentScene - 1 + SCENES.length) % SCENES.length;
    goToScene(target, -1);
  }, [currentScene, goToScene]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = AUDIO_VOLUME;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(() => {
          // Browser may block autoplay until first user interaction.
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        next();
      } else if (e.code === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // GSAP Progress Bar & Auto-advance
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (!isPlaying) {
      gsap.to(progressRef.current, { scaleX: 0, duration: 0.3, transformOrigin: "left" });
      return;
    }

    timelineRef.current = gsap.timeline({
      onComplete: next,
    });

    timelineRef.current.fromTo(
      progressRef.current,
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: DURATION / 1000, ease: "none" }
    );

    return () => {
      timelineRef.current?.kill();
    };
  }, [currentScene, isPlaying, next]);

  const sceneKey = ["event", "guest", "sponsor"][currentScene] as keyof typeof SCENE_DATA;
  const CurrentSceneComponent = SCENES[currentScene];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black selection:bg-white selection:text-black">
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />

      {/* Scenes Container */}
      <div className="h-full w-full">
        <div className="absolute inset-0 z-10">
          <CurrentSceneComponent data={SCENE_DATA[sceneKey] as any} />
        </div>

        <div
          ref={pageTransitionRef}
          className="pointer-events-none absolute inset-y-0 left-0 z-40 w-full opacity-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.92) 0%, rgba(246,242,233,0.98) 45%, rgba(226,220,207,0.96) 100%)",
            boxShadow: "0 0 60px rgba(0,0,0,0.35)",
          }}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 flex flex-col justify-between p-6 md:p-12">
        {/* Top: Marker */}
        <div className="flex justify-end">
          <div className="font-sans text-[clamp(10px,1.5vw,12px)] tracking-[0.3em] mix-blend-difference text-white">
            0{currentScene + 1} / 0{SCENES.length}
          </div>
        </div>

        {/* Bottom: Progress & Controls */}
        <div className="flex flex-col gap-8 pointer-events-auto">
          {/* Progress Bar */}
          <div className="w-full h-[1px] bg-white/20 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full w-full bg-white origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-6 items-center">
              <button
                onClick={prev}
                className="hover:opacity-50 transition-opacity text-white mix-blend-difference"
                aria-label="Previous scene"
              >
                <ChevronLeft size={20} strokeWidth={1} />
              </button>
              <button
                onClick={togglePlay}
                className="hover:opacity-50 transition-opacity text-white mix-blend-difference"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={20} strokeWidth={1} /> : <Play size={20} strokeWidth={1} />}
              </button>
              <button
                onClick={next}
                className="hover:opacity-50 transition-opacity text-white mix-blend-difference"
                aria-label="Next scene"
              >
                <ChevronRight size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="hidden md:block font-sans text-[9px] tracking-[0.4em] uppercase opacity-40 text-white mix-blend-difference">
              Editorial Issue No. 001 - May 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
