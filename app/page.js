import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Bridge from "@/components/Bridge";
import Numbers from "@/components/Numbers";
import Projects from "@/components/Projects";
import Responsive from "@/components/Responsive";
import Services from "@/components/Services";
import Briefing from "@/components/Briefing";
import Seo from "@/components/Seo";
import Process from "@/components/Process";
import { Cta, Footer } from "@/components/Footer";
import Motion from "@/components/Motion";
import Cinema from "@/components/Cinema";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Numbers />
      <Bridge n="01" label="No ar" acc="m">
        Nada de maquete. São sites reais, <em className="hl">no ar</em>, atendendo clientes pelo WhatsApp.
      </Bridge>
      <Projects />
      <Services />
      <Bridge n="02" label="Diagnóstico" acc="v">
        Qual é o seu caso? Responda quatro perguntas e veja o <em className="hl">diagnóstico do seu site</em> na hora.
      </Bridge>
      <Briefing />
      <Responsive />
      <Seo />
      <Process />
      <Bridge n="03" label="Sua vez" acc="h">
        Cada dia sem uma página que convença é um cliente que <em className="hl">clicou e foi embora</em>.
      </Bridge>
      <Cta />
      <Footer />
      <Motion />
      <Cinema />
    </main>
  );
}
