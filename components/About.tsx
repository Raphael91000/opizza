"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate label
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        }
      );
    }

    // Animate text lines with stagger
    linesRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        }
      );
    });

    // Decorative accent line width animation
    if (decorRef.current) {
      gsap.fromTo(
        decorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          transformOrigin: "left center",
          scrollTrigger: { trigger: decorRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  const textLines = [
    "O'Pizza est né dans les rues de Saint-Michel-sur-Orge,",
    "là où la nuit est longue et les envies sont intenses.",
    "Chaque pizza est façonnée à la main — pâte fermentée",
    "72 heures, ingrédients sélectionnés, garnitures généreuses.",
    "Ni chic, ni vulgaire : juste du goût brut, servi avec exigence.",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-10 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-accent/10 pointer-events-none" />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-1/2 bg-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left — large number */}
        <div className="relative">
          <p
            ref={labelRef}
            className="font-body text-accent text-xs tracking-[0.4em] uppercase mb-6"
          >
            Notre histoire
          </p>

          <div
            ref={decorRef}
            className="w-20 h-px bg-accent mb-10"
          />

          <div
            className="font-heading text-[clamp(6rem,18vw,16rem)] leading-none text-white/[0.03] select-none pointer-events-none absolute -top-4 -left-4"
            aria-hidden
          >
            01
          </div>

          <h2 className="italic font-heading text-[clamp(3rem,8vw,6rem)] leading-none text-white relative z-10">
            La rue
            <br />
            <span className="text-accent">a du goût.</span>
          </h2>
        </div>

        {/* Right — story */}
        <div>
          <div className="space-y-1">
            {textLines.map((line, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el) linesRef.current[i] = el;
                }}
                className="overflow-hidden"
              >
                <p className="font-body text-white/65 text-base md:text-lg leading-[1.9]">
                  {line}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6">
            {[
              { value: "72H", label: "Fermentation" },
              { value: "100%", label: "Fait maison" },
              { value: "6J/7", label: "Ouvert" },
            ].map((stat) => (
              <div key={stat.label} className="border-t border-white/10 pt-4">
                <p className="font-heading text-3xl text-accent">{stat.value}</p>
                <p className="font-body text-white/40 text-xs tracking-wider uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
