import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

export default function Hero() {
  return (
    <header id="top" className="relative grid min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-12">
      <div className="orb" style={{ width: 480, height: 480, background: "var(--b1)", top: -80, left: -120 }} />
      <div className="orb" style={{ width: 420, height: 420, background: "var(--v)", bottom: -100, right: -80, animationDelay: "-5s" }} />
      <div className="orb" style={{ width: 300, height: 300, background: "var(--b2)", top: "40%", left: "55%", opacity: 0.28 }} />
      <div className="wrap relative z-[2]" data-hero>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="hero-i mb-6 inline-block rounded-full border bg-card px-4 py-1.5 text-sm text-b2">● Criador de Landing Pages</span>
            <h1 className="hero-i mx-auto max-w-[900px] text-[clamp(34px,5.4vw,64px)] font-extrabold lg:mx-0">
              Transformo cliques em <span className="g">clientes</span> com landing pages de alto impacto.
            </h1>
            <p className="hero-i mx-auto my-6 mb-9 max-w-[580px] text-base text-mut md:text-lg lg:mx-0">
              Design moderno, animações cinematográficas e estrutura pensada para converter. Sua página não precisa só ser bonita — precisa vender.
            </p>
            <div className="hero-i flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w">
                <WaIcon /> Chamar no WhatsApp
              </a>
              <a href="#projetos" className="btn btn-o">Ver projetos</a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="hero-art" data-art>
              <div className="hero-halo" />
              <div className="hero-float">
                <div className="hero-tilt" data-tilt>
                  <div className="hero-ring" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/joao-d.jpg" alt="João D, criador de landing pages do João D Studio"
                    width="1080" height="1080" fetchPriority="high" decoding="async"
                  />
                  <span className="hero-chip hero-chip-a">Design moderno</span>
                  <span className="hero-chip hero-chip-b">Foco em conversão</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
