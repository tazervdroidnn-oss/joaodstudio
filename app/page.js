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
      <Bridge n="01" label="Prova" acc="c">
        Beleza chama atenção. Estrutura é o que <em className="hl">fecha a venda</em>. São mais de <em className="hl">45 projetos</em> entregues aplicando isso.
      </Bridge>
      <Numbers />
      <Bridge n="02" label="No ar" acc="m">
        Nada de maquete. São sites reais, <em className="hl">no ar</em>, atendendo clientes pelo WhatsApp.
      </Bridge>
      <Projects />
      <Bridge n="03" label="Todas as telas" acc="v">
        Seu cliente vai abrir no celular, no tablet ou no notebook. A página precisa <em className="hl">funcionar nos três</em>.
      </Bridge>
      <Responsive />
      <Bridge n="04" label="Formato" acc="y">
        Funcionar em todas as telas é o mínimo. O que muda o resultado é escolher o <em className="hl">formato certo</em> para o seu negócio.
      </Bridge>
      <Services />
      <Bridge n="05" label="Google" acc="c">
        Um site bonito que ninguém encontra não vende. Por isso cada página já sai preparada para <em className="hl">aparecer nas pesquisas</em>.
      </Bridge>
      <Seo />
      <Bridge n="06" label="Diagnóstico" acc="v">
        Formato, palavras-chave, cores. Responda quatro perguntas e veja o <em className="hl">diagnóstico do seu site</em> na hora.
      </Bridge>
      <Briefing />
      <Bridge n="07" label="Como" acc="g">
        Com o diagnóstico em mãos, o caminho até a página no ar tem <em className="hl">quatro etapas</em>.
      </Bridge>
      <Process />
      <Bridge n="08" label="Sua vez" acc="h">
        Cada dia sem uma página que convença é um cliente que <em className="hl">clicou e foi embora</em>.
      </Bridge>
      <Cta />
      <Footer />
      <Motion />
      <Cinema />
    </main>
  );
}
