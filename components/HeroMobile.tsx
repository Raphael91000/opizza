"use client";

import Image from "next/image";

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}

export default function HeroMobile() {
  return (
    <div className="md:hidden">

      {/* ── Section 1 : Hero ── */}
      <section className="relative h-screen bg-black overflow-hidden flex flex-col">
        <div className="absolute inset-0">
          <Image
            src="/frames/frame_001.jpg"
            fill
            alt=""
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="hero-dots absolute inset-0 pointer-events-none opacity-30" />
        <div className="absolute top-[62%] bottom-0 left-0 right-0 bg-black z-[5]" />

        {/* Badge promo */}
        <div className="absolute top-[59%] left-0 right-0 flex justify-center z-10" style={{ transform: "rotate(-2deg)" }}>
          <div style={{ padding: "8px 16px", backgroundColor: "#F5C518", display: "inline-block" }}>
            <p className="font-heading italic text-base leading-none text-black whitespace-nowrap">
              1 pizza achetée = 1 pizza offerte
            </p>
          </div>
        </div>

        <div className="absolute top-16 left-0 right-0 flex justify-center z-10">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-accent font-semibold text-center">
            Pizza · Burgers · Tacos
          </p>
        </div>

        <div className="relative z-10 flex flex-col h-full px-5 pt-40 pb-20">
          <p className="italic font-heading leading-none text-white/90">
            <span className="block text-[clamp(3rem,5.5vw,5rem)]">Chaude</span>
            <span className="block text-accent text-[clamp(3.9rem,7.15vw,6.5rem)]">généreuse</span>
            <span className="block text-[clamp(3rem,8vw,7rem)]">fondante</span>
          </p>
          <div className="flex-1" />
          <div className="flex flex-col gap-3">
            <a
              href="tel:+33983518714"
              className="inline-flex items-center justify-center gap-3 bg-accent text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-full rounded-full"
            >
              <PhoneIcon />
              <span>Commander maintenant</span>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center gap-3 bg-white text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-7 py-4 w-full rounded-full"
            >
              <span>Découvrir notre menu</span>
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
