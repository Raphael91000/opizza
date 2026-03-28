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
    // "Osez découvrir" center = 40vh, font clamp(3.75rem, 8vw, 6.5rem)
    const fontPx = Math.min(Math.max(rootEm * 3.75, window.innerWidth * 0.08), rootEm * 6.5);
    // "Osez découvrir": top-[40vh] -translate-y-1/2, font 2 lines leading-none
    // Block top = 40vh - fontPx, block bottom = 40vh + fontPx
    // Subtract Menu's pt-6 (1.5rem) so "Notre Menu" h2 lands right at oseBottom
    const oseBottom = vh * 0.4 + fontPx - rootEm * 1.5;

    // Rise from bottom of viewport to just below "Osez découvrir"
    // Exactly in sync with the frozen period: 710vh → 910vh
    const tween = gsap.fromTo(wrapper,
      { y: vh },
      {
        y: oseBottom,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: () => `top+=${vh * 560 / 100} top`,  // 560vh — V2 starts
          end:   () => `top+=${vh * 710 / 100} top`,  // 710vh — V2 ends = menu in place
          scrub: 1,
        },
      }
    );

    return () => { tween.kill(); };
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
