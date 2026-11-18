import WaIcon from "./WaIcon";
import { WA_LINK, INSTAGRAM } from "./config";

export function Cta() {
  return (
    <section className="sec overflow-hidden text-center">
      <div className="wrap">
        <div className="cta-box rv rounded-[32px] px-6 py-16 md:py-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/joao-d-256.jpg" alt="João D" width="96" height="96" loading="lazy" className="cta-avatar" />
          <h2 data-split className="mb-4 text-[clamp(30px,5vw,52px)] font-extrabold">Vamos colocar sua marca em outro nível?</h2>
          <p className="mx-auto mb-8 max-w-[520px] opacity-90">
            Chame no WhatsApp e conte sobre o seu projeto. Sua próxima landing page pode começar hoje.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w"><WaIcon /> Falar no WhatsApp</a>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn">@joaodstudio</a>
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
