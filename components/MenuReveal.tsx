"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Menu from "./Menu";
import About from "./About";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export default function MenuReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const hero = document.getElementById("hero-section");
    if (!wrapper || !hero) return;

    const vh = window.innerHeight;
    const rootEm = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // Hero "Osez découvrir": top-[40vh] -translate-y-1/2, font clamp(3rem,5.5vw,5rem), 2 lines leading-none
    // Total text height = fontPx*2.3 → half = fontPx*1.15
    // Bottom of text (in viewport) = vh*0.4 + fontPx*1.15
    const fontPx = Math.min(Math.max(rootEm * 3, window.innerWidth * 0.055), rootEm * 5);

    // Hero: h-[950vh] → wrapper doc pos = (950-100)*vh/100 = 850*vh/100
    // Phase 1 ends at at(800): wrapper viewport pos = (850-800)*vh/100 = vh/2
    // For "Notre Menu" h2 to land at "Osez découvrir" bottom:
    //   rendered = wrapper_pos + y = vh/2 + y = vh*0.4 + fontPx*1.15 - rootEm*1.5
    //   → y = fontPx*1.15 - vh*0.1 - rootEm*1.5
    const oseBottom = fontPx * 1.15 - vh * 0.1 - rootEm * 1.5;

    // Phase 2 (frozen): wrapper moves up by vh/2 (from at(800) to at(850))
    // Compensate with +vh/2 on y so menu stays at same screen position
    const oseFrozen = oseBottom + vh * 0.5;

    // Single timeline: phase1 = menu rises (630→800vh), phase2 = frozen (800→850vh)
    const total = 850 - 630; // 220vh
    const p1 = (800 - 630) / total; // 170/220
    const p2 = (850 - 800) / total; //  50/220

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: () => `top+=${vh * 630 / 100} top`,
        end:   () => `top+=${vh * 850 / 100} top`,
        scrub: true,
      },
    });
    tl.fromTo(wrapper, { y: vh },       { y: oseBottom, ease: "none", duration: p1 })
      .fromTo(wrapper, { y: oseBottom }, { y: oseFrozen, ease: "none", duration: p2 });

    return () => { tl.kill(); };
  }, []);

  return (
    // z-30 above Hero canvas (z-20), -mt-[100vh] to overlap
    // bg-black on inner content so pizza doesn't bleed through text
    <div ref={wrapperRef} className="relative z-30 -mt-[100vh]">
      <Menu />

      {/* Torn edge: yellow bleeding into black Menu above */}
      <div className="w-full bg-black leading-none overflow-hidden" style={{ height: 70 }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="70" style={{ display: 'block' }}>
          <defs>
            <filter id="torn1" x="-5%" y="-100%" width="110%" height="400%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055 0.38" numOctaves="5" seed="23" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <path
            d="M-20,110 L-20,52 L90,40 L210,62 L340,34 L460,58 L580,30 L700,56 L820,38 L940,64 L1060,34 L1180,58 L1310,38 L1460,54 L1460,110 Z"
            fill="#F5C518"
            filter="url(#torn1)"
          />
        </svg>
      </div>

      <About />

      {/* Torn edge: black bleeding into yellow About above */}
      <div className="w-full bg-accent leading-none overflow-hidden" style={{ height: 70 }}>
        <svg viewBox="0 0 1440 110" preserveAspectRatio="none" width="100%" height="70" style={{ display: 'block' }}>
          <defs>
            <filter id="torn2" x="-5%" y="-100%" width="110%" height="400%">
              <feTurbulence type="fractalNoise" baseFrequency="0.055 0.38" numOctaves="5" seed="47" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <path
            d="M-20,110 L-20,52 L100,36 L230,58 L350,32 L470,60 L590,38 L710,56 L830,34 L950,62 L1070,36 L1200,56 L1330,42 L1460,50 L1460,110 Z"
            fill="#000000"
            filter="url(#torn2)"
          />
        </svg>
      </div>

      <Footer />
    </div>
  );
}
