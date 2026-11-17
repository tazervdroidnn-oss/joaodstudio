import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Numbers from "@/components/Numbers";
import Projects from "@/components/Projects";
import Responsive from "@/components/Responsive";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Cta, Footer } from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Numbers />
      <Projects />
      <Responsive />
      <Services />
      <Process />
      <Cta />
      <Footer />
      <Motion />
    </main>
  );
}
