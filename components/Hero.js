import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

export default function Hero() {
  return (
    <header id="top" className="acc-h relative grid min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pb-12">
      <div className="orb" style={{ width: 480, height: 480, background: "var(--b1)", top: -80, left: -120 }} />
      <div className="orb" style={{ width: 420, height: 420, background: "var(--v)", bottom: -100, right: -80, animationDelay: "-5s" }} />
      <div className="orb" style={{ width: 300, height: 300, background: "var(--b2)", top: "40%", left: "55%", opacity: 0.28 }} />
      <div className="wrap relative z-[2]" data-hero>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="order-1 text-center lg:text-left">
            <span className="hero-i hero-kicker mb-6">Estúdio de presença digital</span>
            <h1 data-hero-title className="hero-i mx-auto max-w-[900px] text-[clamp(34px,5.4vw,64px)] font-extrabold lg:mx-0">
              O site certo para o que o seu negócio precisa <span className="g">vender</span>.
            </h1>
            <p className="hero-i mx-auto my-6 max-w-[600px] text-base text-mut md:text-lg lg:mx-0">
              Crio landing pages, portfólios e vitrines digitais sob medida. Antes do layout vem o diagnóstico: entendo quem é o seu cliente e o que ele precisa ver para chamar você.
            </p>
            <ul className="hero-i hero-formats mx-auto mb-9 lg:mx-0" aria-label="Formatos de site">
              <li style={{ "--fc": "#ff8a3d" }}><b>Landing page</b><span>para gerar contatos</span></li>
              <li style={{ "--fc": "#4d7dff" }}><b>Portfólio</b><span>para provar autoridade</span></li>
              <li style={{ "--fc": "#e0457f" }}><b>Vitrine</b><span>para mostrar e vender produtos</span></li>
            </ul>
            <div className="hero-i flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w">
                <WaIcon /> Chamar no WhatsApp
              </a>
              <a href="#diagnostico" className="btn btn-o">Fazer o diagnóstico grátis</a>
            </div>
            <p className="hero-i hero-proof"><b>45+</b> projetos entregues <span aria-hidden="true">·</span> sites reais no ar</p>
          </div>

          <div className="order-2">
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
                  <span className="hero-chip hero-chip-a">Sob medida</span>
                  <span className="hero-chip hero-chip-b">Foco em resultado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
