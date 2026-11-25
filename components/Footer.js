import WaIcon from "./WaIcon";
import { WA_LINK, INSTAGRAM } from "./config";

export function Cta() {
  return (
    <section className="sec band-l overflow-hidden text-center">
      <div className="wrap">
        <div className="cta-box rv rounded-[32px] px-6 py-16 md:py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/joao-d-256.jpg" alt="João D" width="96" height="96" loading="lazy" className="cta-avatar" />
          <h2 data-split className="mx-auto mb-4 max-w-[820px] text-[clamp(30px,5vw,52px)] font-extrabold">Seu cliente já está procurando. Falta ele <span className="g">encontrar você</span>.</h2>
          <p className="mx-auto mb-8 max-w-[560px] text-mut">
            Me chame no WhatsApp com o seu diagnóstico ou só com uma ideia. Na primeira conversa eu digo qual formato faz sentido para o seu negócio e como começar.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w"><WaIcon /> Falar no WhatsApp</a>
            <a href="#diagnostico" className="btn btn-k">Fazer o diagnóstico</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn-o">@joaodstudio</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <>
      <footer className="border-t py-9 pb-24 text-center text-sm text-mut">
        <div className="wrap">
          © 2026 João D Studio · WhatsApp (99) 99191-9769 ·{" "}
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-b2">@joaodstudio</a>
        </div>
      </footer>
      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fab text-white">
        <WaIcon className="h-8 w-8" />
      </a>
    </>
  );
}
