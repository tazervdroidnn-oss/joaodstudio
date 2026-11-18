"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

gsap.registerPlugin(ScrollTrigger);

/*
  Cada aparelho mostra uma captura REAL do site, feita na largura do aparelho
  (1440 / 820 / 390 px), em /public/sites/<id>-<laptop|tablet|phone>.jpg.
  "glow" e "tabtx" só definem a cor do brilho e da aba de cada projeto.
*/
const SITES = [
  { id: "brasa", tab: "Brasa Fish", host: "brasafish.com.br", href: "https://www.brasafish.com.br/", glow: "#f05a25", tabtx: "#ffffff" },
  { id: "meteoro", tab: "Meteoro Joias", host: "meteorojoias.com.br", href: "https://www.meteorojoias.com.br/", glow: "#d4af37", tabtx: "#111111" },
  { id: "valentim", tab: "Balneário Valentim", host: "balneariovalentimm.com.br", href: "https://www.balneariovalentimm.com.br/", glow: "#0fa28a", tabtx: "#ffffff" },
  { id: "nasa", tab: "Eletricista da NASA", host: "eletricadanasa.vercel.app", href: "https://eletricadanasa.vercel.app/", glow: "#2b8cff", tabtx: "#ffffff" },
];

const DEVICES = [
  { key: "laptop", label: "Desktop", px: "1440 px" },
  { key: "tablet", label: "Tablet", px: "820 px" },
  { key: "phone", label: "Mobile", px: "390 px" },
];

const STEPS = [
  ["01", "Mobile · 390 px", "Nasce no celular.", "Quem chega pelo Instagram precisa entender tudo em segundos. Menu enxuto, textos diretos e o botão de WhatsApp sempre ao alcance do polegar."],
  ["02", "Tablet · 820 px", "Cresce sem quebrar.", "O menu se abre, a grade passa para duas colunas e os cards ganham respiro. Nada espremido, nada esticado."],
  ["03", "Desktop · 1440 px", "Ocupa a tela inteira.", "Composição em colunas, hierarquia clara e o mesmo caminho até o contato: título, prova e ação."],
];

const preload = (id) => {
  DEVICES.forEach((d) => { const i = new Image(); i.src = `/sites/${id}-${d.key}.jpg`; });
};

function Device({ d, s }) {
  return (
    <div className={`rs-dev rs-${d.key}`} aria-hidden="true">
      <span className="rs-chip">{d.label} · {d.px}</span>
      <div className="rs-depth"><div className="rs-float">
        <div className="rs-frame">
          <div className="rs-bz">
            {d.key === "laptop" && <div className="rs-bar"><u /><u /><u /><em>{s.host}</em></div>}
            <div className="rs-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={`${s.id}-${d.key}`} className="rs-shot" src={`/sites/${s.id}-${d.key}.jpg`}
                alt="" loading="lazy" decoding="async" draggable="false"
              />
            </div>
          </div>
        </div>
        {d.key === "laptop" && <div className="rs-base" />}
        </div>
      </div>
    </div>
  );
}

export default function Responsive() {
  const root = useRef(null);
  const [id, setId] = useState("brasa");
  const s = SITES.find((x) => x.id === id) || SITES[0];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    // Desktop: cena fixa na tela, os aparelhos entram conforme a rolagem.
    mm.add("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      el.classList.add("rs-pinned");
      const q = (sel) => el.querySelector(sel);
      const [c0, c1, c2] = el.querySelectorAll(".rs-cap");
      const L = q(".rs-laptop"), T = q(".rs-tablet"), P = q(".rs-phone");

      gsap.set([L, T, P], { transformPerspective: 1600 });
      gsap.set(L, { autoAlpha: 0, y: 70, scale: 0.94, rotationY: 14 });
      gsap.set(T, { autoAlpha: 0, x: -90, rotationY: 20 });
      gsap.set(P, { autoAlpha: 0, y: 90, scale: 1.12, rotationX: -10, transformOrigin: "50% 100%" });
      gsap.set([c0, c1, c2], { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: q(".rs-pin"), start: "top top", end: "+=240%", pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      tl.to(P, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1 })
        .to(c0, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
        .to({}, { duration: 0.7 })
        .to(c0, { autoAlpha: 0, y: -24, duration: 0.5 })
        .to(T, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1 }, "<")
        .to(P, { scale: 1, duration: 1 }, "<")
        .to(c1, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.3")
        .to({}, { duration: 0.7 })
        .to(c1, { autoAlpha: 0, y: -24, duration: 0.5 })
        .to(L, { autoAlpha: 1, y: 0, scale: 1, rotationY: 0, duration: 1.1 }, "<")
        .to(c2, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.3")
        .to({}, { duration: 0.8 });
      tl.to(q(".rs-prog i"), { scaleY: 1, ease: "none", duration: tl.duration() }, 0);

      // Inclinação 3D que acompanha o mouse; cada aparelho se move um pouco diferente (profundidade)
      let off = () => {};
      if (window.matchMedia("(hover: hover)").matches) {
        const stage = q(".rs-stage");
        const layers = [[L, 0.8, 6], [T, 1.2, 12], [P, 1.6, 20]].map(([dev, m, px]) => {
          const d = dev.querySelector(".rs-depth");
          gsap.set(d, { transformPerspective: 1400, rotationY: -8, rotationX: 2 });
          const o = { m, px };
          o.ry = gsap.quickTo(d, "rotationY", { duration: 1, ease: "power3.out" });
          o.rx = gsap.quickTo(d, "rotationX", { duration: 1, ease: "power3.out" });
          o.x = gsap.quickTo(d, "x", { duration: 1, ease: "power3.out" });
          return o;
        });
        const move = (e) => {
          const r = stage.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((o) => { o.ry(-8 + nx * 14 * o.m); o.rx(2 - ny * 8 * o.m); o.x(nx * o.px); });
        };
        const leave = () => layers.forEach((o) => { o.ry(-8); o.rx(2); o.x(0); });
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerleave", leave);
        off = () => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", leave); };
      }

      return () => { off(); el.classList.remove("rs-pinned"); };
    });

    // Celular e tablet: sem fixar a tela, os aparelhos entram em sequência.
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll(".rs-dev"), {
        autoAlpha: 0, y: 60, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".rs-stage"), start: "top 80%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="responsivo" ref={root} className="rs sec acc-v">
      <div className="rs-wrap">
        <div className="rs-head">
          <span className="rs-pill rv">Responsividade de verdade</span>
          <h2 className="h2 rv">Uma página. <span className="g">Todas as telas.</span></h2>
          <p className="sub rv" style={{ marginBottom: 0 }}>
            Você acabou de ver os projetos no ar. Agora veja os mesmos sites em três tamanhos de tela: cada página nasce pensada para o
            celular, ganha espaço no tablet e se recompõe no notebook, sem perder a identidade da marca.
          </p>
        </div>

        <div className="rs-pin">
          <div className="rs-copy">
            <div className="rs-capwrap">
              {STEPS.map(([n, tag, t, d]) => (
                <article className="rs-cap" key={n}>
                  <span className="rs-num">{n}</span>
                  <small>{tag}</small>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </article>
              ))}
            </div>
            <div className="rs-prog" aria-hidden="true"><i /></div>

            <div className="rs-tabs-wrap">
              <small>Veja cada projeto em três telas</small>
              <div className="rs-tabs" role="tablist" aria-label="Projetos">
                {SITES.map((x) => (
                  <button
                    key={x.id} type="button" role="tab" aria-selected={x.id === id}
                    className={x.id === id ? "on" : ""} onClick={() => setId(x.id)}
                    onPointerEnter={() => preload(x.id)} onFocus={() => preload(x.id)}
                    style={{ "--tc": x.glow, "--tcx": x.tabtx }}
                  >
                    {x.tab}
                  </button>
                ))}
              </div>
              <a className="rs-visit" href={s.href} target="_blank" rel="noopener noreferrer">Visitar {s.host} ↗</a>
            </div>
          </div>

          <div className="rs-stage" role="img" aria-label={`Capturas reais do site ${s.tab} em celular, tablet e notebook`} style={{ "--s-glow": s.glow }}>
            <div className="rs-glow" />
            <div className="rs-floor" />
            {DEVICES.map((d) => <Device key={d.key} d={d} s={s} />)}
          </div>
        </div>

        <div className="rs-end rv">
          <p>
            Mesmo conteúdo, três composições. É esse cuidado que entra na etapa de <a href="#processo">Desenvolvimento</a> do meu
            processo e que mantém a página vendendo em qualquer aparelho.
          </p>
          <div className="rs-endbtns">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn btn-w"><WaIcon /> Quero minha página responsiva</a>
            <a href="#servicos" className="btn btn-o">Por que isso importa</a>
          </div>
          <small>
            Capturas reais dos sites, feitas em cada largura de tela. Os sites completos estão na seção <a href="#projetos">Projetos</a>.
          </small>
        </div>
      </div>
    </section>
  );
}
