import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

export function Intro() {
  return (
    <div className="intro" aria-hidden="true">
      <b>JOÃO D</b>
    </div>
  );
}

export default function Hero() {
  return (
    <header id="top" className="relative grid min-h-[100svh] items-center overflow-hidden pt-28">
      <div className="orb" style={{ width: 480, height: 480, background: "var(--b1)", top: -80, left: -120 }} />
      <div className="orb" style={{ width: 420, height: 420, background: "var(--v)", bottom: -100, right: -80, animationDelay: "-5s" }} />
      <div className="orb" style={{ width: 300, height: 300, background: "var(--b2)", top: "40%", left: "55%", opacity: 0.28 }} />
      <div className="wrap relative z-[2]" data-hero>
        <span className="hero-i mb-6 inline-block rounded-full border bg-card px-4 py-1.5 text-sm text-b2">● Criador de Landing Pages</span>
        <h1 className="hero-i max-w-[900px] text-[clamp(38px,7.5vw,84px)] font-extrabold">
          Transformo cliques em <span className="g">clientes</span> com landing pages de alto impacto.
        </h1>
        <p className="hero-i my-6 mb-9 max-w-[600px] text-lg text-mut">
          Design moderno, animações cinematográficas e estrutura pensada para converter. Sua página não precisa só ser bonita — precisa vender.
        </p>
        <div className="hero-i flex flex-wrap gap-3.5">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w">
            <WaIcon /> Chamar no WhatsApp
          </a>
          <a href="#projetos" className="btn btn-o">Ver projetos</a>
        </div>
      </div>
    </header>
  );
}
