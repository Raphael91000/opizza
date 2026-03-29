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
const V2_END   = 710;
const FREEZE_END = 950;
// Hero total = 950vh

function getFrame1Src(i: number) { return `/frames/frame_${String(i + 1).padStart(3, "0")}.jpg`; }
function getFrame2Src(i: number) { return `/frames2/frame_${String(i + 1).padStart(3, "0")}.jpg`; }

export default function Hero() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const phrase1Ref    = useRef<HTMLDivElement>(null);
  const phrase2Ref    = useRef<HTMLDivElement>(null);
  const word1Ref      = useRef<HTMLSpanElement>(null);
  const word2Ref      = useRef<HTMLSpanElement>(null);
  const word3Ref      = useRef<HTMLSpanElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const oseRef        = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLParagraphElement>(null);
  const promoRef      = useRef<HTMLDivElement>(null);
  const promoMobRef   = useRef<HTMLDivElement>(null);
  const livRef        = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth  || document.documentElement.clientWidth;
      canvas.height = window.innerHeight || document.documentElement.clientHeight;
    };
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
      const isMobile = canvas!.width < 768;
      const widthRatio = isMobile ? 0.85 : 0.62;
      const xCenter = isMobile ? 0.5 : 0.67;
      const tw = canvas!.width * widthRatio, th = canvas!.height;
      const sc = Math.max(tw / img.naturalWidth, th / img.naturalHeight) * (isMobile ? 0.32 : 1);
      const dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
      ctx!.drawImage(img, canvas!.width * xCenter - dw / 2, (canvas!.height - dh) / 2, dw, dh);
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
    if (f1[0].complete && f1[0].naturalWidth > 0) render();

    const vh = window.innerHeight;
    const at = (vhVal: number) => () => `top+=${vh * vhVal / 100} top`;

    const tw1 = gsap.to(state, { v1: FRAME_COUNT_1 - 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: "top top", end: at(V1_END), scrub: 1 }, onUpdate: render });
    const twX = gsap.to(state, { xfade: 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(XFADE_S), end: at(XFADE_E), scrub: 1 }, onUpdate: render });
    const tw2 = gsap.to(state, { v2: FRAME_COUNT_2 - 1, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(V2_START), end: at(V2_END), scrub: 1 }, onUpdate: render });

    requestAnimationFrame(render);

    // "Osez découvrir" appears after phrase2
    gsap.set(oseRef.current, { autoAlpha: 0, x: -60 });
    const twOse = gsap.to(oseRef.current, {
      autoAlpha: 1, x: 0, ease: "none", immediateRender: false,
      scrollTrigger: { trigger: section, start: at(560), end: at(630), scrub: 1 },
    });

    // Initial hidden states
    gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, ctaRef.current, labelRef.current, promoRef.current, promoMobRef.current], { autoAlpha: 0, y: 35 });
    gsap.set(phrase2Ref.current, { autoAlpha: 0, y: 40 });
    gsap.set(livRef.current, { autoAlpha: 0, y: 20 });

    // Entrance
    const loadedAtTop = window.scrollY < 10;
    const enterTl = gsap.timeline({ delay: loadedAtTop ? 0.3 : 0 });
    if (loadedAtTop) {
      // Animate in normally
      enterTl
        .to(labelRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(word1Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .to(word2Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .to(word3Ref.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .to(ctaRef.current,   { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .to(promoRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
        .to(promoMobRef.current, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5");
    } else {
      // Reloaded mid-scroll: set entrance end-state immediately so ScrollTrigger can override correctly
      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current, ctaRef.current, labelRef.current, promoRef.current, promoMobRef.current], { autoAlpha: 1, y: 0 });
    }

    // Scroll hint: appear after entrance, disappear on first scroll
    const twScrollHintIn = gsap.to(scrollHintRef.current, { autoAlpha: 1, duration: 0.8, delay: 2.0 });
    const twScrollHintOut = gsap.fromTo(scrollHintRef.current,
      { autoAlpha: 1 },
      { autoAlpha: 0, immediateRender: false,
        scrollTrigger: { trigger: section, start: "top top", end: at(8), scrub: true },
      }
    );

    const p1Exit  = gsap.fromTo([phrase1Ref.current, labelRef.current], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(48),  end: at(108), scrub: true } });
    const promoExit = gsap.fromTo(promoRef.current, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(48), end: at(108), scrub: true } });
    const promoMobExit = gsap.fromTo(promoMobRef.current, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -50, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(48), end: at(108), scrub: true } });
    const p2Enter = gsap.fromTo(phrase2Ref.current, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0,   ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(84),  end: at(156), scrub: true } });
    const livEnter = gsap.fromTo(livRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(120), end: at(180), scrub: true } });
    const p2Exit  = gsap.fromTo([phrase2Ref.current, ctaRef.current, livRef.current], { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -30, ease: "none", immediateRender: false, scrollTrigger: { trigger: section, start: at(540), end: at(630), scrub: true } });

    // Recalculate all scroll positions for current scroll on reload
    ScrollTrigger.refresh();

    const handleResize = () => { resize(); render(); };
    window.addEventListener("resize", handleResize);
    return () => {
      [tw1, twX, tw2, twOse, p1Exit, promoExit, promoMobExit, p2Enter, livEnter, p2Exit, enterTl, twScrollHintIn, twScrollHintOut].forEach(t => t?.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="hero-section" className="relative h-[950vh] z-20">
      <div className="sticky top-0 h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ willChange: "contents", transform: "translateZ(0)" }} />

        {/* Left vignette — anchors text area, separates it from canvas */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

        {/* Dot pattern — left side decoration */}
        <div className="hero-dots absolute inset-0 pointer-events-none opacity-30" />


        <div className="absolute pt-16 md:pt-20 px-5 md:px-20 left-0 right-0 top-0">
          {/* Category label */}
          <div
            ref={labelRef}
            className="flex justify-center md:justify-start items-center gap-2 mb-5 opacity-0 invisible"
          >
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-accent font-semibold">
              Pizza · Burgers · Tacos
            </p>
          </div>

          <div className="relative h-[calc(3*clamp(3rem,7vw,6rem)*1.25)]">
            <div ref={phrase1Ref} className="absolute inset-0 pointer-events-none flex items-center">
              <p className="italic font-heading leading-none text-white/90">
                <span ref={word1Ref} className="block text-[clamp(3rem,5.5vw,5rem)] opacity-0">Chaude</span>
                <span ref={word2Ref} className="block text-accent text-[clamp(3.9rem,7.15vw,6.5rem)] opacity-0">généreuse</span>
                <span ref={word3Ref} className="block text-[clamp(3rem,8vw,7rem)] opacity-0">fondante</span>
              </p>
            </div>
            <div ref={phrase2Ref} className="absolute inset-0 pointer-events-none opacity-0 invisible flex items-center">
              <div>
                <p className="italic font-heading leading-none text-white/90">
                  <span className="block text-[clamp(3rem,5.5vw,5rem)]">Directement</span>
                  <span className="block text-accent text-[clamp(3.9rem,7.15vw,6.5rem)]">livré</span>
                  <span className="block text-[clamp(3rem,8vw,7rem)]">chez toi.</span>
                </p>
              </div>
            </div>
          </div>
          {/* Livraison offerte badge — above CTA, phrase 2 */}
          <div ref={livRef} className="mt-3 mb-3 opacity-0 invisible">
            <div style={{ transform: "rotate(-2deg)", display: "inline-block", padding: "8px 16px", backgroundColor: "#F5C518" }}>
              <p className="font-heading italic text-base md:text-[clamp(0.9rem,1.8vw,1.4rem)] leading-none text-black whitespace-nowrap">
                Livraison offerte dès 20€
              </p>
            </div>
          </div>

          <div ref={ctaRef} className="mt-4 md:mt-4 flex flex-col gap-3 opacity-0 invisible md:relative fixed bottom-16 left-5 right-5 md:bottom-auto md:left-auto md:right-auto z-40 md:z-auto">
            <a href="tel:+33983518714" className="inline-flex items-center justify-center gap-3 bg-accent text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-full md:w-fit rounded-full transition-all duration-300 hover:bg-yellow-300">
              <PhoneIcon /><span>Commander maintenant</span>
            </a>
            <a href="#menu" className="inline-flex items-center justify-center gap-3 bg-white text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-full md:w-fit rounded-full transition-all duration-300 hover:bg-white/80">
              <span>Découvrir notre menu</span>
            </a>
          </div>
        </div>



        {/* Promo badge — desktop over pizza */}
        <div
          ref={promoRef}
          className="hidden md:block absolute bottom-[17%] right-[16%] pointer-events-none opacity-0 invisible"
          style={{ transform: "rotate(-5deg)" }}
        >
          <PromoBadge />
        </div>

        {/* Promo badge — mobile */}
        <div
          ref={promoMobRef}
          className="md:hidden absolute bottom-[38%] left-5 right-5 pointer-events-none opacity-0 invisible flex justify-center z-10"
        >
          <div style={{ padding: "8px 16px", backgroundColor: "#F5C518", transform: "rotate(-2deg)" }}>
            <p className="font-heading italic text-base leading-none text-black whitespace-nowrap">
              1 pizza achetée = 1 pizza offerte
            </p>
          </div>
        </div>

        {/* Black band — mobile, covers kling.ai watermark, full width below promo badge */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black pointer-events-none" style={{ top: "63%" }} />

        {/* "Osez découvrir" */}
        <div ref={oseRef} className="absolute top-[40vh] -translate-y-1/2 left-0 px-10 md:px-20 pointer-events-none opacity-0 invisible">
          <p className="italic font-heading text-[clamp(3rem,5.5vw,5rem)] leading-none text-white/90">
            Osez<br /><span className="text-accent text-[1.3em]">découvrir</span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 invisible pointer-events-none"
        >
          <div className="w-px h-14 bg-white/20 relative overflow-hidden">
            <div className="scroll-line-anim absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-white/70" />
          </div>
        </div>

        {/* Black band bottom — covers watermark and anchors hero */}
        <div className="absolute bottom-0 left-0 right-0 h-14 bg-black pointer-events-none" />
      </div>
    </section>
  );
}

function LivBadge() {
  const path = "M22,0 L418,0 L440,40 L418,80 L22,80 L0,40 Z";
  return (
    <div className="relative" style={{ width: 440, height: 80 }}>
      <svg viewBox="0 0 440 80" width={440} height={80} style={{ display: "block", position: "absolute", top: 0, left: 0 }}>
        <path d={path} fill="#F5C518" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-heading italic text-[clamp(1.3rem,2.4vw,2.2rem)] leading-none text-black whitespace-nowrap">
          Livraison offerte dès 20€
        </p>
      </div>
    </div>
  );
}

function PromoBadge() {
  // 548 wide, 72 tall
  // Left side 2 teeth pointing left (x=0), right side 2 teeth pointing right (x=548)
  // Teeth at y = 18, 54  (dividing 72 into thirds roughly)
  const path = "M22,0 L526,0 L548,36 L526,72 L22,72 L0,36 Z";

  return (
    <div className="relative" style={{ width: 548, height: 72 }}>
      <svg viewBox="0 0 548 72" width={548} height={72} style={{ display: "block", position: "absolute", top: 0, left: 0 }}>
        <path d={path} fill="#F5C518" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-heading italic text-[clamp(1.4rem,2.8vw,2.4rem)] leading-none text-black whitespace-nowrap">
          1 pizza achetée = 1 pizza offerte
        </p>
      </div>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}
