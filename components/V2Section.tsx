"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 97;

function getFrameSrc(i: number) {
  return `/frames2/frame_${String(i + 1).padStart(3, "0")}.jpg`;
}

export default function V2Section() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const frames: HTMLImageElement[] = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image(); img.src = getFrameSrc(i); return img;
    });

    function drawFrame(img: HTMLImageElement) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const targetW = canvas.width * 0.62;
      const targetH = canvas.height;
      const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const x = canvas.width * 0.63 - drawW / 2;
      const y = (canvas.height - drawH) / 2;
      ctx.drawImage(img, x, y, drawW, drawH);
    }

    frames[0].onload = () => drawFrame(frames[0]);

    const obj = { frame: 0 };

    // Step 1: V2 plays frame by frame over 300vh
    const scrub = gsap.to(obj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `top+=${window.innerHeight * 3} top`,
        scrub: 1,
      },
      onUpdate() {
        const img = frames[Math.round(obj.frame)];
        if (img?.complete && img.naturalWidth > 0) drawFrame(img);
      },
    });

    // Step 2: "Osez découvrir" appears exactly when V2 reaches last frame
    // Fades + slides in from left: 290vh → 360vh
    gsap.set(textRef.current, { autoAlpha: 0, x: -60 });
    const textEnter = gsap.to(textRef.current, {
      autoAlpha: 1, x: 0,
      ease: "none", immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 2.9} top`,
        end: () => `top+=${window.innerHeight * 3.6} top`,
        scrub: 1,
      },
    });

    // Step 4: canvas + text fade out as MenuReveal takes over (430vh → 530vh)
    const canvasFade = gsap.to(canvas, {
      opacity: 0,
      ease: "none", immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 4.3} top`,
        end: () => `top+=${window.innerHeight * 5.3} top`,
        scrub: 1,
      },
    });

    const textFade = gsap.to(textRef.current, {
      autoAlpha: 0,
      ease: "none", immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 4.3} top`,
        end: () => `top+=${window.innerHeight * 5.3} top`,
        scrub: 1,
      },
    });

    const handleResize = () => {
      setCanvasSize();
      const img = frames[Math.round(obj.frame)];
      if (img?.complete) drawFrame(img);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      scrub.kill(); textEnter.kill(); canvasFade.kill(); textFade.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // 600vh: 300vh for V2 playback + 300vh for transition
    <section ref={sectionRef} className="relative h-[600vh] z-20">
      <div className="sticky top-0 h-screen bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* "Osez découvrir" — apparaît à la dernière frame de V2 */}
        <div
          ref={textRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 px-10 md:px-20 pointer-events-none"
        >
          <p className="italic font-heading text-[clamp(3.75rem,8vw,6.5rem)] leading-none text-white/90">
            Osez<br /><span className="text-accent">découvrir</span>
          </p>
        </div>
      </div>
    </section>
  );
}
