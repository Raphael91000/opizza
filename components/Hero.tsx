"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT_1 = 145;
const FRAME_COUNT_2 = 97;

// All timings in vh
const V1_END   = 500;
const XFADE_S  = 480;
const XFADE_E  = 560;
const V2_START = 560;
const V2_END   = 710;   // V2 ends = menu already in place (rose during V2)
const FREEZE_END = 810; // 100vh freeze to read "Osez découvrir Notre Menu"
// Hero total = 810vh

function getFrame1Src(i: number) { return `/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`; }
function getFrame2Src(i: number) { return `/frames2/frame_${String(i + 1).padStart(3, "0")}.jpg`; }

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const phrase1Ref = useRef<HTMLDivElement>(null);
  const phrase2Ref = useRef<HTMLDivElement>(null);
  const word1Ref   = useRef<HTMLSpanElement>(null);
  const word2Ref   = useRef<HTMLSpanElement>(null);
  const word3Ref   = useRef<HTMLSpanElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const hintRef    = useRef<HTMLDivElement>(null);
  const oseRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();

    const f1: HTMLImageElement[] = Array.from({ length: FRAME_COUNT_1 }, (_, i) => {
      const img = new Image(); img.src = getFrame1Src(i); return img;
    });
    const f2: HTMLImageElement[] = Array.from({ length: FRAME_COUNT_2 }, (_, i) => {
      const img = new Image(); img.src = getFrame2Src(i); return img;
    });

    const state = { v1: 0, v2: 0, xfade: 0 };

    function drawImg(img: HTMLImageElement, alpha: number) {
      ctx!.globalAlpha = alpha;
      const tw = canvas!.width * 0.62, th = canvas!.height;
      const sc = Math.max(tw / img.naturalWidth, th / img.naturalHeight);
      const dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
      ctx!.drawImage(img, canvas!.width * 0.63 - dw / 2, (canvas!.height - dh) / 2, dw, dh);
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const i1 = f1[Math.round(state.v1)];
      const i2 = f2[Math.round(state.v2)];
      if (state.xfade < 1 && i1?.complete && i1.naturalWidth > 0) drawImg(i1, 1 - state.xfade);
      if (state.xfade > 0  && i2?.complete && i2.naturalWidth > 0) drawImg(i2, state.xfade);
      ctx.globalAlpha = 1;
    }

    f1[0].onload = () => render();

    const vh = window.innerHeight;
    const at = (vhVal: number) => () => `top+=${vh * vhVal / 100} top`;

    const tw1 = gsap.to(state, { v1: FRAME_COUNT_1 - 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: "top top", end: at(V1_END), scrub: 1 }, onUpdate: render });
    const twX = gsap.to(state, { xfade: 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(XFADE_S), end: at(XFADE_E), scrub: 1 }, onUpdate: render });
    const tw2 = gsap.to(state, { v2: FRAME_COUNT_2 - 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(V2_START), end: at(V2_END), scrub: 1 }, onUpdate: render });

    // "Osez découvrir" appears after phrase2
    gsap.set(oseRef.current, { autoAlpha: 0, x: -60 });
    const twOse = gsap.to(oseRef.current, {
      autoAlpha: 1, x: 0, ease: "none", immediateRender: false,
      scrollTrigger: { trigger: section, start: at(560), end: at(630), scrub: 1 },
    });

    // Entrance
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, ctaRef.current], { autoAlpha: 0, y: 35 });
    gsap.set([hintRef.current, phrase2Ref.current], { autoAlpha: 0, y: 40 });

    const enterTl = gsap.timeline({ delay: 0.3 });
    enterTl
      .to(word1Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" })
      .to(word2Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .to(word3Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .to(ctaRef.current,   { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
      .to(hintRef.current,  { autoAlpha: 1,        duration: 0.6, ease: "power2.out" }, "-=0.2");

    const p1Exit  = gsap.to(phrase1Ref.current, { autoAlpha: 0, y: -50, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(48),  end: at(108), scrub: true } });
    const p2Enter = gsap.to(phrase2Ref.current, { autoAlpha: 1, y: 0,   ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(84),  end: at(156), scrub: true } });
    const p2Exit  = gsap.to([phrase2Ref.current, ctaRef.current], { autoAlpha: 0, y: -30, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(540), end: at(630), scrub: true } });

    const handleResize = () => { resize(); render(); };
    window.addEventListener("resize", handleResize);
    return () => {
      [tw1, twX, tw2, twOse, p1Exit, p2Enter, p2Exit, enterTl].forEach(t => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // 1010vh: Hero stays sticky until MenuReveal is in place + 100vh freeze
    <section ref={sectionRef} id="hero-section" className="relative h-[810vh] z-20">
      {/* No overflow-hidden — MenuReveal z-30 rises freely above */}
      <div className="sticky top-0 h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="absolute pt-36 px-10 md:px-20 left-0 right-0 top-0">
          <div className="relative h-[calc(3*clamp(3rem,7vw,6rem)*1.25)]">
            <div ref={phrase1Ref} className="absolute inset-0 pointer-events-none">
              <p className="italic font-heading text-[clamp(3rem,7vw,6rem)] text-white/90 leading-tight max-w-sm">
                <span ref={word1Ref} className="block">Croustillante</span>
                <span ref={word2Ref} className="block text-accent">généreuse</span>
                <span ref={word3Ref} className="block">fondante</span>
              </p>
            </div>
            <div ref={phrase2Ref} className="absolute inset-0 pointer-events-none">
              <p className="italic font-heading text-[clamp(3rem,7vw,6rem)] text-white/90 leading-tight max-w-sm">
                Directement<br /><span className="text-accent">livré</span> chez toi.
              </p>
            </div>
          </div>
          <div ref={ctaRef} className="mt-[clamp(0.75rem,1.75vw,1.5rem)]">
            <a href="tel:+33983518714" className="inline-flex items-center gap-3 bg-accent text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-fit rounded-full transition-all duration-300 hover:bg-yellow-300">
              <PhoneIcon /><span>Commander maintenant</span>
            </a>
          </div>
        </div>

        {/* "Osez découvrir" — pinned, waits for "Notre Menu" */}
        <div ref={oseRef} className="absolute top-[40vh] -translate-y-1/2 left-0 px-10 md:px-20 pointer-events-none">
          <p className="italic font-heading text-[clamp(3.75rem,8vw,6.5rem)] leading-none text-white/90">
            Osez<br /><span className="text-accent">découvrir</span>
          </p>
        </div>

        <div ref={hintRef} className="absolute bottom-8 left-10 md:left-20 flex items-center gap-3 pointer-events-none">
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}
