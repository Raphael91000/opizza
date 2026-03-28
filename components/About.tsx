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
    "La Maison O'Pizza c'est plus qu'un resto. C'est une adresse qui s'est forgé une réputation sur la qualité, la générosité et le respect du client.",
    "Ici on prend le temps de bien faire. Des ingrédients frais sélectionnés, des recettes travaillées, des portions qui respectent ta faim.",
    "On propose pas que des pizzas — notre carte est pensée pour satisfaire tout le monde, à chaque moment de la journée. Que tu commandes depuis ton canapé ou que tu passes nous voir, l'expérience est la même : du bon, du vrai, du généreux.",
    "On est fiers de ce qu'on fait. Et ça se sent dans chaque assiette.",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="pt-16 pb-16 px-6 md:px-10 bg-accent"
    >

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="relative mb-12">
          <p
            ref={labelRef}
            className="font-body text-black text-xs tracking-[0.4em] uppercase mb-3"
          >
            Notre histoire
          </p>

          <h2 className="italic font-heading text-[clamp(2.5rem,6vw,5rem)] leading-none text-black relative z-10 mb-6">
            LA MAISON,<br />C'EST ICI.
          </h2>

          <div ref={decorRef} className="w-20 h-px bg-black" />

          <div
            className="font-heading text-[clamp(6rem,18vw,16rem)] leading-none text-black/[0.06] select-none pointer-events-none absolute -top-4 -left-4"
            aria-hidden
          >
            01
          </div>
        </div>

        {/* Body text — full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {textLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => { if (el) linesRef.current[i] = el; }}
            >
              <p className="font-body text-black text-base md:text-lg leading-[1.9]">
                {line}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line — full width */}
        <div className="border-t border-black/20 pt-8">
          <p className="font-heading text-[clamp(1.2rem,2.5vw,2rem)] leading-tight text-black">
            UNE SEULE ADRESSE. UN SEUL STANDARD : L'EXCELLENCE.
          </p>
        </div>
      </div>
    </section>
  );
}
