import Image from "next/image";

const MAPS_URL = "https://www.google.com/maps/place/La+Maison+O'Pizza/@48.6333787,2.2832177,15z/data=!4m10!1m2!2m1!1sopizza+91240!3m6!1s0x47e5d988b3baaa3b:0xfe0b225b227d8f37!8m2!3d48.6333787!4d2.3022721!15sCgtwaXp6YSA5MTI0MFoNIgtwaXp6YSA5MTI0MJIBEHBpenphX3Jlc3RhdXJhbnSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUmFiWEZIYVRKblJSQULgAQD6AQQIABA7!16s%2Fg%2F11h2fj7xzk?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D";

export default function Footer() {
  const hours = [
    { day: "Lundi",    time: "Fermé",                          closed: true  },
    { day: "Mardi",    time: "11:30 – 14:30 & 18:00 – 23:00", closed: false },
    { day: "Mercredi", time: "11:30 – 14:30 & 18:00 – 23:00", closed: false },
    { day: "Jeudi",    time: "11:30 – 14:30 & 18:00 – 23:00", closed: false },
    { day: "Vendredi", time: "18:00 – 23:30",                  closed: false },
    { day: "Samedi",   time: "11:30 – 14:30 & 18:00 – 23:30", closed: false },
    { day: "Dimanche", time: "18:00 – 23:30",                  closed: false },
  ];

  return (
    <footer id="footer" className="bg-black">

      {/* Delivery section */}
      <div className="py-20 px-6 md:px-10 max-w-6xl mx-auto text-center">
        <h2 className="font-heading italic text-[clamp(2.5rem,6vw,5rem)] leading-none text-accent mb-10">
          LIVRAISON
        </h2>

        {/* 3 info blocks */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: "DÉLAI MOYEN",    value: "30 min" },
            { label: "COMMANDE MIN.",  value: "15€"    },
            { label: "ZONE",           value: "10 km"  },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-heading italic text-[clamp(2rem,5vw,3.5rem)] leading-none text-white mb-1">{value}</p>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/35">{label}</p>
            </div>
          ))}
        </div>

        {/* Zone detail */}
        <p className="font-body text-base text-white mb-10">
          Jusqu&apos;à 10 km autour de Saint-Michel-sur-Orge
        </p>

        {/* Promo line */}
        <p className="font-heading italic text-[clamp(1.2rem,3vw,2rem)] leading-none text-accent mb-10">
          Livraison offerte à partir de 20€
        </p>

        {/* Platform logos */}
        <div className="flex items-center justify-center gap-12">
          <Image
            src="/uber.svg"
            alt="Uber Eats"
            width={280}
            height={60}
            className="h-[60px] w-auto opacity-50 hover:opacity-80 transition-opacity duration-200"
          />
          <Image
            src="/deli.png"
            alt="Deliveroo"
            width={300}
            height={60}
            className="h-[60px] w-auto opacity-50 hover:opacity-80 transition-opacity duration-200"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center pb-14 px-6">
        <a
          href="tel:+33983518714"
          className="inline-flex items-center gap-3 bg-accent text-black font-body font-bold tracking-[0.25em] uppercase text-sm px-10 py-5 rounded-full transition-all duration-300 hover:bg-yellow-300 hover:scale-105"
        >
          <PhoneIcon />
          Commander maintenant
        </a>
      </div>

      {/* Yellow divider */}
      <div className="w-full h-px bg-accent" />

      {/* 3 columns */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 items-start">

        {/* Logo */}
        <div className="flex flex-col gap-4 md:items-end md:pr-32">
          <Image src="/logo.png" alt="O'Pizza" width={160} height={70} className="w-36 h-auto" />
        </div>

        {/* Address + phone */}
        <div className="flex flex-col gap-3 items-center text-center">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-1">Nous trouver</p>
          <p className="font-body text-white/60 text-sm leading-loose">
            20 rue des Fusillés de la Résistance<br />
            91240 Saint-Michel-sur-Orge
          </p>
          <a
            href="tel:+33983518714"
            className="inline-flex items-center gap-2 font-body text-white/50 text-sm hover:text-accent transition-colors duration-200"
          >
            <PhoneIcon />
            +33 9 83 51 87 14
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-semibold tracking-[0.2em] text-accent hover:text-yellow-300 transition-colors duration-200 mt-1"
          >
            VOIR SUR MAPS →
          </a>
        </div>

        {/* Hours */}
        <div className="flex flex-col md:ml-auto">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-2">Horaires</p>
          {hours.map(({ day, time, closed }) => (
            <div key={day} className="flex items-center font-body text-xs mt-1.5">
              <span className="w-20 shrink-0 text-white/45">{day}</span>
              <span className={closed ? "text-white/45 italic" : "text-white/65 tabular-nums"}>{time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yellow divider */}
      <div className="w-full h-px bg-white/8" />

      {/* Bottom bar */}
      <div className="py-6 px-6 text-center">
        <p className="font-body text-white/20 text-[11px] tracking-[0.15em]">
          © {new Date().getFullYear()} La Maison O&apos;Pizza — Tous droits réservés
        </p>
      </div>

    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}
