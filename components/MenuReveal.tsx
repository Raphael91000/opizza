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
      <About />
      <Footer />
    </div>
  );
}
