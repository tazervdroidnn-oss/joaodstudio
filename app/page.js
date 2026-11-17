import Nav from "@/components/Nav";
import Hero, { Intro } from "@/components/Hero";
import Numbers from "@/components/Numbers";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Cta, Footer } from "@/components/Footer";
import Motion from "@/components/Motion";

export default function Home() {
  return (
    <main>
      <Intro />
      <Nav />
      <Hero />
      <Numbers />
      <Projects />
      <Services />
      <Process />
      <Cta />
      <Footer />
      <Motion />
    </main>
  );
}
