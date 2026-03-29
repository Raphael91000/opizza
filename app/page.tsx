import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeroMobile from "@/components/HeroMobile";
import MenuReveal from "@/components/MenuReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroMobile />
        <MenuReveal />
      </main>
    </>
  );
}
