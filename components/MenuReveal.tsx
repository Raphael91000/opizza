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

    gsap.set(wrapper, { y: "100vh" });

    const tween = gsap.to(wrapper, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative z-30 -mt-[100vh]"
    >
      <div className="pointer-events-auto">
        {/* "Osez découvrir" — monte avec MenuReveal, s'aligne avec "Notre Menu" */}
        <div className="px-6 md:px-10 pt-24 md:pt-36 pb-0">
          <div className="max-w-7xl mx-auto">
            <p className="italic font-heading text-[clamp(3rem,8vw,7rem)] leading-none text-white/90">
              Osez <span className="text-accent">découvrir</span>
            </p>
          </div>
        </div>
        <Menu />
        <About />
        <Footer />
      </div>
    </div>
  );
}
