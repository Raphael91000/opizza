"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawPizzaFrame } from "./Hero";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 97;

function getFrameSrc(index: number): string {
  return `/frames2/frame_${String(index + 1).padStart(3, "0")}.jpg`;
}

export default function PizzaTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const frames: HTMLImageElement[] = Array.from(
      { length: FRAME_COUNT },
      (_, i) => {
        const img = new Image();
        img.src = getFrameSrc(i);
        return img;
      }
    );

    // offsetY: 0 au début (même position que la fin du Hero)
    // puis descend progressivement vers canvas.height (sort par le bas)
    const obj = { frame: 0, offsetY: 0 };

    frames[0].onload = () => drawPizzaFrame(ctx, canvas, frames[0], 0);

    const scrubTween = gsap.to(obj, {
      frame: FRAME_COUNT - 1,
      offsetY: () => canvas.height * 0.85,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate() {
        const img = frames[Math.round(obj.frame)];
        if (img?.complete && img.naturalWidth > 0) drawPizzaFrame(ctx, canvas, img, obj.offsetY);
      },
    });

    const handleResize = () => {
      setCanvasSize();
      const img = frames[Math.round(obj.frame)];
      if (img?.complete) drawPizzaFrame(ctx, canvas, img, obj.offsetY);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      scrubTween.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}
