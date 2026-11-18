import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Bridge from "@/components/Bridge";
import Numbers from "@/components/Numbers";
import Projects from "@/components/Projects";
import Responsive from "@/components/Responsive";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Cta, Footer } from "@/components/Footer";
import Motion from "@/components/Motion";
import Cinema from "@/components/Cinema";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Bridge n="01" label="Prova" acc="c">
        Visual bonito chama atenção. <em className="hl">Estrutura</em> é o que vende. E <em className="hl">45+ projetos</em> provam que o método funciona.
      </Bridge>
      <Numbers />
      <Bridge n="02" label="No ar" acc="m">
        Número é só metade da história. A outra metade está <em className="hl">no ar agora</em>, rodando para clientes reais.
      </Bridge>
      <Projects />
      <Bridge n="03" label="Todas as telas" acc="v">
        O mesmo projeto precisa brilhar no <em className="hl">celular</em>, no <em className="hl">tablet</em> e no <em className="hl">notebook</em>.
      </Bridge>
      <Responsive />
      <Services />
      <Bridge n="04" label="Como" acc="g">
        Convenceu? Então veja como sua ideia sai do <em className="hl">papel</em> e vai para o <em className="hl">ar</em> em quatro passos.
      </Bridge>
      <Process />
      <Bridge n="05" label="Sua vez" acc="h">
        Falta um passo. O <em className="hl">próximo cliente</em> já está clicando no seu perfil.
      </Bridge>
      <Cta />
      <Footer />
      <Motion />
      <Cinema />
    </main>
  );
}
