export default function Footer() {
  const hours = [
    { day: "Lundi", time: "Fermé", closed: true },
    { day: "Mardi", time: "18:00 – 01:00", closed: false },
    { day: "Mercredi", time: "18:00 – 01:00", closed: false },
    { day: "Jeudi", time: "18:00 – 01:00", closed: false },
    { day: "Vendredi", time: "18:00 – 02:00", closed: false },
    { day: "Samedi", time: "18:00 – 02:00", closed: false },
    { day: "Dimanche", time: "18:00 – 01:00", closed: false },
  ];

  return (
    <footer id="footer" className="border-t border-white/8">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-10">
        {/* Brand */}
        <div>
          <h3 className="italic font-heading text-5xl md:text-6xl text-white tracking-wide mb-4">
            O&apos;PIZZA
          </h3>
          <div className="w-10 h-px bg-accent mb-6" />
          <p className="font-body text-white/40 text-sm leading-relaxed max-w-xs">
            Street food de luxe. Pâte fermentée 72h, ingrédients sélectionnés.
            Sans compromis.
          </p>

          {/* Call CTA */}
          <a
            href="tel:+33983518714"
            className="mt-8 inline-flex items-center gap-3 bg-accent text-black font-body font-semibold tracking-[0.2em] uppercase text-xs px-6 py-3 rounded-full transition-all duration-300 hover:bg-yellow-300"
          >
            Commander
          </a>
        </div>

        {/* Contact + Address */}
        <div>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-accent mb-6">
            Nous trouver
          </p>
          <address className="not-italic space-y-3">
            <p className="font-body text-white/70 text-sm leading-relaxed">
              20 rue des Fusillés de la Résistance
              <br />
              91240 Saint-Michel-sur-Orge
              <br />
              France
            </p>
            <a
              href="tel:+33983518714"
              className="block font-body text-white/55 text-sm hover:text-accent transition-colors duration-200 mt-4"
            >
              +33 9 83 51 87 14
            </a>
          </address>
        </div>

        {/* Hours */}
        <div>
          <p className="font-body text-xs tracking-[0.35em] uppercase text-accent mb-6">
            Horaires
          </p>
          <ul className="space-y-2.5">
            {hours.map(({ day, time, closed }) => (
              <li
                key={day}
                className="flex items-center justify-between font-body text-sm"
              >
                <span className={closed ? "text-white/25" : "text-white/60"}>
                  {day}
                </span>
                <span
                  className={
                    closed
                      ? "text-white/20 italic"
                      : "text-white/80 tabular-nums"
                  }
                >
                  {time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-white/20 text-xs tracking-wide">
          © {new Date().getFullYear()} O&apos;Pizza. Tous droits réservés.
        </p>
        <p className="font-body text-white/15 text-xs">
          Saint-Michel-sur-Orge, Île-de-France
        </p>
      </div>
    </footer>
  );
}
