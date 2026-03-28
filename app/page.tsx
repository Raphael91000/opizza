import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuReveal from "@/components/MenuReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuReveal />
      </main>
    </>
  );
}
