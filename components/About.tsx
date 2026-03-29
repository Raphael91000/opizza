export default function About() {
  const textLines = [
    "La Maison O'Pizza c'est plus qu'un resto. C'est une adresse qui s'est forgé une réputation sur la qualité, la générosité et le respect du client.",
    "Ici on prend le temps de bien faire. Des ingrédients frais sélectionnés, des recettes travaillées, des portions qui respectent ta faim.",
    "On propose pas que des pizzas, notre carte est pensée pour satisfaire tout le monde, à chaque moment de la journée. Que tu commandes depuis ton canapé ou que tu passes nous voir, l'expérience est la même : du bon, du vrai, du généreux.",
    "On est fiers de ce qu'on fait. Et ça se sent dans chaque assiette.",
  ];

  return (
    <section id="about" className="pt-16 pb-16 px-6 md:px-10 bg-accent">
      <div className="max-w-7xl mx-auto">

        <div className="relative mb-12 text-center">
          <p className="font-body text-black text-xs tracking-[0.4em] uppercase mb-3">
            Notre histoire
          </p>
          <h2 className="italic font-heading text-[clamp(2.5rem,6vw,5rem)] leading-none text-black relative z-10 mb-6">
            LA MAISON,<br className="md:hidden" />C'EST ICI.
          </h2>
          <div className="w-20 h-px bg-black mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto mb-12 text-center space-y-4">
          {textLines.map((line, i) => (
            <p key={i} className="font-body text-black text-base md:text-lg leading-[1.9]">
              {line}
            </p>
          ))}
        </div>

        <div className="border-t border-black/20 pt-8 text-center">
          <p className="font-heading text-[clamp(1.2rem,2.5vw,2rem)] leading-tight text-black">
            UNE SEULE ADRESSE. UN SEUL STANDARD : L'EXCELLENCE.
          </p>
        </div>

      </div>
    </section>
  );
}
