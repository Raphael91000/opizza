"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      if (current > lastScrollY.current && current > 80) setHidden(true);
      else if (current < lastScrollY.current) setHidden(false);
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [scrolled]);

  return (
    <>
      <nav
        className={`navbar-entrance fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled || menuOpen
            ? "bg-black/95 border-b border-white/5 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="px-5 md:px-10 md:px-20 h-16 md:h-20 flex items-center justify-between">

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-8 font-body text-xs tracking-[0.2em] uppercase text-white/60">
            <a href="#menu"  className="hover:text-white transition-colors duration-200">Menu</a>
            <a href="#about" className="hover:text-white transition-colors duration-200">Notre histoire</a>
            <a href="#footer" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>

          {/* Logo — centré desktop, gauche mobile */}
          <a href="#" className="absolute left-1/2 -translate-x-1/2">
            <Logo width={55} height={55} />
          </a>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA — desktop only */}
            <a
              href="tel:+33983518714"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-black font-body font-semibold tracking-[0.15em] uppercase text-[10px] px-5 py-2.5 rounded-full transition-all duration-300 hover:bg-yellow-300"
            >
              <PhoneIcon />
              <span>Commander</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="px-5 pb-8 pt-4 flex flex-col gap-6 bg-black/95">
            <a href="#menu"   onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">Menu</a>
            <a href="#about"  onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">Notre histoire</a>
            <a href="#footer" onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors">Contact</a>
            <a
              href="tel:+33983518714"
              className="inline-flex items-center gap-2 bg-accent text-black font-body font-semibold tracking-[0.15em] uppercase text-xs px-5 py-3 rounded-full w-fit"
            >
              <PhoneIcon />
              Commander maintenant
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}
