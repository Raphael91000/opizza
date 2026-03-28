"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT_1 = 145;
const FRAME_COUNT_2 = 97;

function getFrame1Src(i: number) {
  return `/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;
}
function getFrame2Src(i: number) {
  return `/frames2/frame_${String(i + 1).padStart(3, "0")}.jpg`;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

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

    const frames1: HTMLImageElement[] = Array.from({ length: FRAME_COUNT_1 }, (_, i) => {
      const img = new Image();
      img.src = getFrame1Src(i);
      return img;
    });

    const frames2: HTMLImageElement[] = Array.from({ length: FRAME_COUNT_2 }, (_, i) => {
      const img = new Image();
      img.src = getFrame2Src(i);
      return img;
    });

    // Shared mutable state driven by ScrollTrigger tweens
    const state = { frame1: 0, frame2: 0, crossfade: 0, offsetY: 0 };

    function drawPizza(img: HTMLImageElement, offsetY: number) {
      const targetW = canvas!.width * 0.62;
      const targetH = canvas!.height;
      const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const x = canvas!.width * 0.63 - drawW / 2;
      const y = (canvas!.height - drawH) / 2 + offsetY;
      ctx!.drawImage(img, x, y, drawW, drawH);
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img1 = frames1[Math.round(state.frame1)];
      const img2 = frames2[Math.round(state.frame2)];

      // Draw video 1 (fades out during crossfade)
      if (state.crossfade < 1 && img1?.complete && img1.naturalWidth > 0) {
        ctx.globalAlpha = 1 - state.crossfade;
        drawPizza(img1, 0);
      }

      // Draw video 2 on top (fades in during crossfade, then descends)
      if (state.crossfade > 0 && img2?.complete && img2.naturalWidth > 0) {
        ctx.globalAlpha = state.crossfade;
        drawPizza(img2, state.offsetY);
      }

      ctx.globalAlpha = 1;
    }

    frames1[0].onload = () => render();

    // ── Video 1 scrub: 0 → 550vh ─────────────────────────────
    const tween1 = gsap.to(state, {
      frame1: FRAME_COUNT_1 - 1,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `top+=${window.innerHeight * 5.5} top`,
        scrub: 0.5,
      },
      onUpdate: render,
    });

    // ── Crossfade v1 → v2: 500vh → 570vh ─────────────────────
    const tweenCrossfade = gsap.to(state, {
      crossfade: 1,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 5} top`,
        end: () => `top+=${window.innerHeight * 5.7} top`,
        scrub: true,
      },
      onUpdate: render,
    });

    // ── Video 2 scrub: 570vh → 700vh — pizza figée, pas de descente ─
    const tween2 = gsap.to(state, {
      frame2: FRAME_COUNT_2 - 1,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 5.7} top`,
        end: () => `top+=${window.innerHeight * 7} top`,
        scrub: true,
      },
      onUpdate: render,
    });

    // ── Fade out entire canvas (JPEG frames are opaque, need CSS opacity): 680vh → 780vh ─
    const tweenBg = gsap.to(canvas, {
      opacity: 0,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 6.8} top`,
        end: () => `top+=${window.innerHeight * 7.8} top`,
        scrub: true,
      },
    });

    // ── Entrance animations ───────────────────────────────────
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, ctaRef.current], { autoAlpha: 0, y: 35 });
    gsap.set(scrollHintRef.current, { autoAlpha: 0 });
    gsap.set(phrase2Ref.current, { autoAlpha: 0, y: 40 });

    const enterTl = gsap.timeline({ delay: 0.3 });
    enterTl
      .to(word1Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(word2Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .to(word3Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .to(scrollHintRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

    // ── Phrase 1 exit ────────────────────────────────────────
    const phrase1Exit = gsap.to(phrase1Ref.current, {
      autoAlpha: 0, y: -50, ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 0.48} top`,
        end: () => `top+=${window.innerHeight * 1.08} top`,
        scrub: true,
      },
    });

    // ── Phrase 2 enter ───────────────────────────────────────
    const phrase2Enter = gsap.to(phrase2Ref.current, {
      autoAlpha: 1, y: 0, ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 0.84} top`,
        end: () => `top+=${window.innerHeight * 1.56} top`,
        scrub: true,
      },
    });

    // ── Text + CTA exit before transition ────────────────────
    const textExit = gsap.to([phrase2Ref.current, ctaRef.current], {
      autoAlpha: 0, y: -30, ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: () => `top+=${window.innerHeight * 5} top`,
        end: () => `top+=${window.innerHeight * 5.6} top`,
        scrub: true,
      },
    });


    const handleResize = () => {
      setCanvasSize();
      render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tween1.kill();
      tween2.kill();
      tweenCrossfade.kill();
      tweenBg.kill();
      phrase1Exit.kill();
      phrase2Enter.kill();
      textExit.kill();
      enterTl.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[800vh] z-20">
      <div className="hero-perspective sticky top-0 h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Wrapper texte + CTA */}
        <div className="absolute pt-36 px-10 md:px-20 left-0 right-0 top-0">
          <div className="relative h-[calc(3*clamp(3rem,7vw,6rem)*1.25)]">
            {/* Phrase 1 */}
            <div ref={phrase1Ref} className="cube-face absolute inset-0 pointer-events-none">
              <p className="italic font-heading text-[clamp(3rem,7vw,6rem)] text-white/90 leading-tight max-w-sm">
                <span ref={word1Ref} className="block">Croustillante</span>
                <span ref={word2Ref} className="block text-accent">généreuse</span>
                <span ref={word3Ref} className="block">fondante</span>
              </p>
            </div>

            {/* Phrase 2 */}
            <div ref={phrase2Ref} className="cube-face absolute inset-0 pointer-events-none">
              <p className="italic font-heading text-[clamp(3rem,7vw,6rem)] text-white/90 leading-tight max-w-sm">
                Directement<br /><span className="text-accent">livré</span> chez toi.
              </p>
            </div>

          </div>

          {/* CTA */}
          <div ref={ctaRef} className="mt-[clamp(0.75rem,1.75vw,1.5rem)]">
            <a
              href="tel:+33983518714"
              className="inline-flex items-center gap-3 bg-accent text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-fit rounded-full transition-all duration-300 hover:bg-yellow-300"
            >
              <PhoneIcon />
              <span>Commander maintenant</span>
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div ref={scrollHintRef} className="absolute bottom-8 left-10 md:left-20 flex items-center gap-3 pointer-events-none">
          <div className="w-px h-8 bg-white/20" />
          <span className="font-body text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        </div>

      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
      />
    </svg>
  );
}
