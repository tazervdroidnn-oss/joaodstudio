"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3D } from "./use3D";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  ["Diagnóstico", "Você responde o briefing e eu analiso o seu negócio, o seu público e quem disputa o mesmo cliente. Saio com o formato certo e o objetivo da página."],
  ["Roteiro e cores", "Defino a ordem das seções, os textos que respondem às dúvidas do cliente e a paleta pela psicologia das cores da sua marca."],
  ["Design e desenvolvimento", "Construo começando pelo celular, com animações cinematográficas, carregamento rápido e WhatsApp com mensagem pronta."],
  ["No ar e ajustes", "Publico, testo no celular, no tablet e no computador e ajusto os detalhes com você antes de divulgar."],
];

export default function Process() {
  const root = useRef(null);
  use3D(root, ".pr-step", { rotationY: -58, x: -60, y: 30, origin: "0% 50%", stagger: 0.2 });

  // Linha que liga as etapas, desenhada conforme a rolagem
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pr-line i", { scaleX: 0, scaleY: 0 }, {
        scaleX: 1, scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".pr-grid", start: "top 80%", end: "bottom 60%", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="processo" className="sec acc-g" ref={root}>
      <div className="wrap">
        <span className="kicker rv">Processo</span>
        <h2 className="h2" data-split>Do diagnóstico à página <span className="g">no ar</span></h2>
        <p className="sub rv">Quatro etapas claras. Você sabe o que está acontecendo em cada uma e aprova antes de seguir.</p>
        <div className="pr-grid relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pr-line" aria-hidden="true"><i /></div>
          {steps.map(([t, d], i) => (
            <div key={t} className="pr-step fx-card">
              <span className="pr-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mb-2 text-xl font-bold">{t}</h3>
              <p className="fx-in text-[15px] text-mut">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
