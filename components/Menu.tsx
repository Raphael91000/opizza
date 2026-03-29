"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────── */

const CATEGORIES = [
  "Pizzas",
  "Burgers",
  "Sandwichs",
  "Tacos",
  "Nouveautés",
  "Salades & Paninis",
  "Box & Barquettes",
  "Boissons & Desserts",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Item {
  name: string;
  desc?: string;
  price: string;
  badge?: string;
}

interface Section {
  title: string;
  subtitle?: string;
  items: Item[];
}

const MENU: Record<Category, Section[]> = {
  Pizzas: [
    {
      title: "Base Tomate",
      subtitle: "Junior 8€ · Sénior 12€ · Méga 16€",
      items: [
        { name: "Marguerita", desc: "Sauce tomate, mozzarella", price: "8 / 12 / 16€" },
        { name: "Reine", desc: "Sauce tomate, mozzarella, jambon, champignons", price: "8 / 12 / 16€" },
        { name: "4 Fromages", desc: "Sauce tomate, mozzarella, chèvre, bleu, brie, parmesan", price: "8 / 12 / 16€" },
        { name: "Paysanne", desc: "Sauce tomate, mozzarella, lardons, oeuf", price: "8 / 12 / 16€" },
        { name: "Campione", desc: "Sauce tomate, mozzarella, viande hachée, champignons", price: "8 / 12 / 16€" },
        { name: "Calzone", desc: "Sauce tomate, mozzarella, oeuf, jambon ou viande hachée", price: "8 / 12 / 16€" },
        { name: "Napolitaine", desc: "Sauce tomate, mozzarella, anchois, câpres, olives", price: "8 / 12 / 16€" },
        { name: "Mexicaine", desc: "Sauce tomate, mozzarella, viande hachée, chorizo, poivrons", price: "8 / 12 / 16€" },
        { name: "Neptune", desc: "Sauce tomate, mozzarella, thon, poivrons, tomates fraîches, olives", price: "8 / 12 / 16€" },
        { name: "Orientale", desc: "Sauce tomate, mozzarella, merguez, poivrons, oeuf, olives", price: "8 / 12 / 16€" },
        { name: "Del Grec", desc: "Sauce tomate, mozzarella, viande grec, tomates fraîches, oignons", price: "8 / 12 / 16€" },
        { name: "3 Jambons", desc: "Sauce tomate, mozzarella, jambon, lardons, chorizo", price: "8 / 12 / 16€" },
        { name: "Fajitas", desc: "Sauce tomate, mozzarella, poulet, poivrons, oignons", price: "8 / 12 / 16€" },
        { name: "Bolognaise", desc: "Sauce tomate, mozzarella, viande hachée, pommes de terre, oignons", price: "8 / 12 / 16€" },
        { name: "Boursin", desc: "Sauce tomate, mozzarella, viande hachée, boursin", price: "8 / 12 / 16€" },
        { name: "Végétarienne", desc: "Sauce tomate, mozzarella, champignons, poivrons, artichauts, tomates fraîches, olives", price: "8 / 12 / 16€" },
        { name: "Portugaise", desc: "Sauce tomate, mozzarella, merguez, chorizo, oeuf", price: "8 / 12 / 16€" },
        { name: "4 Saisons", desc: "Sauce tomate, mozzarella, jambon, champignons, poivrons, artichauts, olives", price: "8 / 12 / 16€" },
        { name: "Américaine", desc: "Sauce tomate, mozzarella, viande hachée, bacon, oignons, oeuf", price: "8 / 12 / 16€" },
        { name: "Royale", desc: "Sauce tomate, mozzarella, merguez, viande hachée, poulet", price: "8 / 12 / 16€" },
      ],
    },
    {
      title: "Spéciales",
      subtitle: "Junior 10€ · Sénior 18€ · Méga 24€",
      items: [
        { name: "Tunisienne", desc: "Sauce tomate, mozzarella, thon, piment, poivrons, oignons, olives", price: "10 / 18 / 24€" },
        { name: "Barbecue", desc: "Sauce barbecue, mozzarella, viande hachée, chorizo, poivrons", price: "10 / 18 / 24€" },
        { name: "Kebab", desc: "Sauce barbecue, mozzarella, viande kebab, oignons", price: "10 / 18 / 24€" },
        { name: "Indienne", desc: "Sauce curry, mozzarella, poulet, oignons", price: "10 / 18 / 24€" },
        { name: "Moitié / Moitié", desc: "Deux pizzas au choix en une", price: "+2€", badge: "Option" },
      ],
    },
    {
      title: "Base Crème Fraîche",
      subtitle: "Junior 10€ · Sénior 18€ · Méga 24€",
      items: [
        { name: "Blanche Neige", desc: "Crème fraîche, mozzarella, poulet, chèvre, champignons", price: "10 / 18 / 24€" },
        { name: "Raclette", desc: "Crème fraîche, mozzarella, jambon, raclette, pommes de terre", price: "10 / 18 / 24€" },
        { name: "Chèvre Miel", desc: "Crème fraîche, mozzarella, chèvre, miel", price: "10 / 18 / 24€" },
        { name: "Fromagère", desc: "Crème fraîche, mozzarella, chèvre, bleu, parmesan", price: "10 / 18 / 24€" },
        { name: "Norvégienne", desc: "Crème fraîche, mozzarella, saumon fumé", price: "10 / 18 / 24€" },
        { name: "New Texas", desc: "Crème fraîche, mozzarella, viande hachée, boursin, pommes de terre", price: "10 / 18 / 24€" },
        { name: "Tartiflette", desc: "Crème fraîche, mozzarella, lardons, reblochon, pommes de terre", price: "10 / 18 / 24€" },
        { name: "Fermière", desc: "Crème fraîche, mozzarella, poulet, pommes de terre", price: "10 / 18 / 24€" },
      ],
    },
  ],
  Burgers: [
    {
      title: "Nos Burgers",
      subtitle: "Servis avec frites ou potatoes",
      items: [
        { name: "Cheese", desc: "Steak 45g, cheddar", price: "6,50€" },
        { name: "Double Cheese", desc: "2 steaks 45g, 2 cheddar", price: "7,50€" },
        { name: "Chicken Burger", desc: "Poulet pané, cheddar", price: "7,50€" },
        { name: "Crousty Burger", desc: "Steak 45g, galette de pommes de terre, cheddar", price: "7,50€" },
        { name: "Suprem Bacon", desc: "2 steaks 45g, 2 cheddar, bacon, oeuf", price: "8,50€" },
        { name: "Big M", desc: "2 steaks 45g, 2 cheddar, 3 pains", price: "8,50€" },
        { name: "Tank 1", desc: "Steak 180g, cheddar", price: "10€" },
        { name: "Tank 2", desc: "2 steaks 180g, 2 cheddar", price: "11€" },
        { name: "Tank 3", desc: "3 steaks 180g, 3 cheddar", price: "12€" },
      ],
    },
  ],
  Sandwichs: [
    {
      title: "Nos Sandwichs",
      subtitle: "Pain maison ou tortilla · salade, tomates, oignons, sauce au choix",
      items: [
        { name: "Grec", desc: "Viande grec", price: "9€" },
        { name: "Chicken Curry", desc: "Chicken curry, cheddar", price: "9€" },
        { name: "Américain", desc: "2 steaks 45g, oeuf, cheddar", price: "9,50€" },
        { name: "X6", desc: "Steak 45g, chicken, boursin, cheddar", price: "9,90€" },
        { name: "Mix Up", desc: "2 viandes au choix, cheddar", price: "9,90€" },
        { name: "Cordon Steak", desc: "Cordon bleu, steak, cheddar", price: "9,90€" },
        { name: "Five", desc: "4 steaks 45g, jambon, oeuf, 5 cheddar", price: "9,90€" },
      ],
    },
    {
      title: "Spécialités",
      items: [
        { name: "Crousty Tasty", desc: "Riz, sauce maison, tenders, sauce sweet, oignons crispy — + boisson 33cl", price: "10€", badge: "Nouveau" },
        { name: "Pizza Burger", desc: "Pâte à pizza, 2 steaks 120g façon bouchère, tomates, oignons frits, mozzarella, sauce au choix — gratiné au four + frites + boisson 33cl", price: "13€", badge: "Signature" },
      ],
    },
  ],
  Tacos: [
    {
      title: "Nos Tacos",
      subtitle: "Galette · sauce fromagère · frites · viande au choix",
      items: [
        { name: "Simple", desc: "1 viande au choix", price: "7,50€" },
        { name: "Double", desc: "2 viandes au choix", price: "8,50€" },
        { name: "Triple", desc: "3 viandes au choix", price: "9,50€" },
      ],
    },
    {
      title: "Viandes au choix",
      items: [
        { name: "Cordon Bleu", price: "" },
        { name: "Escalope", price: "" },
        { name: "Viande Hachée", price: "" },
        { name: "Merguez", price: "" },
        { name: "Kebab", price: "" },
        { name: "Poulet", price: "" },
        { name: "Tenders", price: "" },
        { name: "Nuggets", price: "" },
      ],
    },
  ],
  "Nouveautés": [
    {
      title: "Crêpes & Bubble Waffles",
      subtitle: "Toppings : speculoos, daim, bueno, oreo, M&M's, bueno white, boules de glaces",
      items: [
        { name: "Crêpe", desc: "Garnie au choix", price: "à partir de 4€" },
        { name: "Bubble Waffle", desc: "Garni au choix + boules de glaces", price: "6,50€" },
      ],
    },
    {
      title: "Corn Sucré & Salé",
      items: [
        { name: "Corn Sucré", desc: "Toppings : speculoos, daim, oreo, M&M's — nappage chocolat ou caramel", price: "2 pièces · 4€" },
        { name: "Corn Salé", desc: "Saucisses hot-dog, ketchup, moutarde, oignons crispy", price: "2 pièces · 4,50€" },
      ],
    },
  ],
  "Salades & Paninis": [
    {
      title: "Nos Salades",
      subtitle: "8€",
      items: [
        { name: "Du Chef", desc: "Salade, tomates, jambon, emmental", price: "8€" },
        { name: "Crousty", desc: "Salade, tomates, tenders, croûtons, olives", price: "8€" },
        { name: "Niçoise", desc: "Salade, thon, pommes de terre, olives", price: "8€" },
      ],
    },
    {
      title: "Nos Paninis",
      subtitle: "+ 1 boisson 50cl",
      items: [
        { name: "4 Fromages", price: "6€" },
        { name: "Jambon", price: "6€" },
        { name: "Poulet", price: "6€" },
        { name: "Viande Hachée", price: "6€" },
        { name: "Thon", price: "6€" },
        { name: "Saumon", price: "6€" },
        { name: "Merguez", price: "6€" },
      ],
    },
    {
      title: "Nos Zapp'Wichs",
      subtitle: "+ 1 boisson 50cl",
      items: [
        { name: "Merguez", price: "7€" },
        { name: "Jambon", price: "7€" },
        { name: "Poulet", price: "7€" },
        { name: "Viande Hachée", price: "7€" },
        { name: "Cannibale", desc: "2 viandes hachées, merguez, poulet", price: "8€" },
      ],
    },
    {
      title: "Nos Tex Mex",
      subtitle: "+ 0,50€",
      items: [
        { name: "Stick Mozza", desc: "6 pièces", price: "0,50€" },
        { name: "Nuggets", desc: "8 pièces", price: "0,50€" },
        { name: "Bouchées Camemberts", desc: "8 pièces", price: "0,50€" },
      ],
    },
  ],
  "Box & Barquettes": [
    {
      title: "Nos Box",
      items: [
        { name: "Box 1", desc: "5 tenders + frites + boisson 33cl", price: "8€" },
        { name: "Box 2", desc: "8 hot wings + frites + boisson 33cl", price: "9€" },
        { name: "Box 3", desc: "5 tenders + 2 tenders + boisson 33cl", price: "8,50€" },
        { name: "Box 4", desc: "10 hot wings + 10 tenders + frites + boisson 33cl", price: "28,90€" },
      ],
    },
    {
      title: "Nos Barquettes",
      items: [
        { name: "Frites", desc: "Petite / Grande", price: "2€ / 3€" },
        { name: "Frites Cheddar Bacon", desc: "Petite / Grande", price: "3€ / 4,50€" },
      ],
    },
    {
      title: "Promos Livraison",
      items: [
        { name: "Promo Trio", desc: "3 pizzas Junior + 1 maxi boisson", price: "24€", badge: "Promo" },
        { name: "Promo Sénior", desc: "2 pizzas Sénior + 1 maxi boisson", price: "24€", badge: "Promo" },
        { name: "Promo Méga", desc: "2 pizzas Méga + 1 maxi boisson", price: "34€", badge: "Promo" },
        { name: "Menu Enfant", desc: "4 Nuggets ou 1 Cheese + frites + Caprisun + pompote + surprise", price: "7€" },
      ],
    },
  ],
  "Boissons & Desserts": [
    {
      title: "Boissons",
      items: [
        { name: "Coca-Cola / Zéro / Cherry 33cl", price: "1,50€" },
        { name: "Fanta Citron ou Orange 33cl", price: "1,50€" },
        { name: "Ice Tea / Oasis Tropical 33cl", price: "1,50€" },
        { name: "Perrier 33cl / Eau minérale 50cl", price: "1,50€" },
        { name: "Cristaline Fraise ou Pêche 50cl", price: "1,50€" },
        { name: "Maxi Coca / Tropico 1,5L", price: "3€" },
      ],
    },
    {
      title: "Desserts",
      items: [
        { name: "Tarte au Daim", price: "3€" },
        { name: "Tiramisu", price: "3€" },
      ],
    },
  ],
};

/* ─── COMPONENT ─────────────────────────────────────────── */

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<Category>("Pizzas");
  const [activePizzaSection, setActivePizzaSection] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }
  }, []);

  const scrollTabIntoView = (cat: string) => {
    const tab = tabRefs.current[cat];
    const container = tabsScrollRef.current;
    if (!tab || !container) return;
    const tabLeft = tab.offsetLeft;
    const tabWidth = tab.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollTo = tabLeft - containerWidth / 2 + tabWidth / 2;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const switchCategory = (cat: Category) => {
    scrollTabIntoView(cat);
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActiveCategory(cat);
        setActivePizzaSection(0);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
      },
    });
  };

  const switchPizzaSection = (idx: number) => {
    if (!contentRef.current) return;
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.18, ease: "power2.in",
      onComplete: () => {
        setActivePizzaSection(idx);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" });
      },
    });
  };

  const sections = activeCategory === "Pizzas"
    ? [MENU.Pizzas[activePizzaSection]]
    : MENU[activeCategory];

  return (
    <section id="menu" className="pt-6 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <h2 className="italic font-heading text-[clamp(3rem,8vw,7rem)] leading-none text-white">Notre Menu</h2>
          <div className="mt-4 w-16 h-px bg-accent" />
        </div>

      </div>

        {/* Black band starting from tabs — full screen width */}
        <div className="w-full bg-black pt-8 pb-24 md:pb-36 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">


        {/* Category tabs */}
        <div className="relative mb-12 md:mb-12">
          <div ref={tabsScrollRef} className="flex overflow-x-auto gap-2 border-b border-white/8 pb-6 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              ref={(el) => { tabRefs.current[cat] = el; }}
              onClick={() => switchCategory(cat)}
              className={`font-body text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? "border-accent text-black bg-accent"
                  : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              {/* Section title */}
              <div className="mb-6">
                {activeCategory === "Pizzas" ? (
                  <div className="flex flex-wrap items-baseline gap-6">
                    {MENU.Pizzas.map((s, idx) => (
                      <button
                        key={s.title}
                        onClick={() => switchPizzaSection(idx)}
                        className={`font-heading text-3xl md:text-4xl transition-colors duration-200 pb-1 border-b-2 ${
                          activePizzaSection === idx
                            ? "text-accent border-accent"
                            : "text-white/70 border-transparent hover:text-white"
                        }`}
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                ) : (
                  <h3 className="font-heading text-3xl md:text-4xl text-white">{section.title}</h3>
                )}
                {section.subtitle && (
                  <p className="font-body text-accent/70 text-xs tracking-wider mt-1">{section.subtitle}</p>
                )}
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="px-5 py-4 flex items-start justify-between gap-4 hover:bg-white/[0.03] transition-colors duration-150"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-body font-semibold text-white text-sm">{item.name}</span>
                        {item.badge && (
                          <span className="font-body text-[9px] tracking-widest uppercase text-black bg-accent px-1.5 py-0.5 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className="font-body text-white/40 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                    {item.price && (
                      <span className="font-heading text-accent text-xl shrink-0">{item.price}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Supplément info for pizzas */}
          {activeCategory === "Pizzas" && (
            <p className="font-heading italic text-white text-lg mt-4">
              Ingrédient supplémentaire : 1€ (Junior) · 1,50€ (Sénior) · 2€ (Méga)
            </p>
          )}
          {(activeCategory === "Burgers" || activeCategory === "Sandwichs" || activeCategory === "Tacos") && (
            <p className="font-heading italic text-white text-lg mt-4">
              Supplément charcuterie ou fromage : +1€
            </p>
          )}
        </div>
        </div>{/* end max-w */}
        </div>{/* end black band */}
    </section>
  );
}
