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
    if (!wrapper) return;

    const isMobile = window.innerWidth < 768;
    const rootEm = parseFloat(getComputedStyle(document.documentElement).fontSize);
    // "Osez découvrir": top-[40vh] -translate-y-1/2, font clamp(3rem,5.5vw,5rem), 2 lines leading-none
    // Total text height = fontPx*2.3 → half = fontPx*1.15
    const fontPx = Math.min(Math.max(rootEm * 3, window.innerWidth * 0.055), rootEm * 5);

    if (isMobile) {
      gsap.set(wrapper, { y: 0 });
      return;
    }

    // Desktop: trigger is #hero-section (h-[950vh])
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const vh = window.visualViewport?.height ?? window.innerHeight;
    // Hero: h-[950vh] → wrapper doc pos = (950-100)*vh/100 = 850*vh/100
    // Animation ends at at(850) = when wrapper viewport pos = 0
    const oseBottom = vh * 0.4 + fontPx * 1.15 - rootEm * 1.5;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: () => `top+=${vh * 720 / 100} top`,  // 720vh — earlier start, faster arrival
        end:   () => `top+=${vh * 850 / 100} top`,  // 850vh — sticky releases, scroll resumes
        scrub: true,
      },
    });
    tl.fromTo(wrapper, { y: vh }, { y: oseBottom, ease: "none" });

    return () => { tl.kill(); };
  }, []);

  return (
    // z-30 above Hero canvas (z-20), -mt-[100vh] to overlap
    // bg-black on inner content so pizza doesn't bleed through text
    <div ref={wrapperRef} className="relative z-30 md:-mt-[100vh]">
      <div className="md:hidden bg-black px-5 pt-20 pb-0">
        <p className="italic font-heading text-[clamp(3rem,5.5vw,5rem)] leading-none text-white/90">
          Osez<br /><span className="text-accent text-[1.3em]">découvrir</span>
        </p>
      </div>
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
