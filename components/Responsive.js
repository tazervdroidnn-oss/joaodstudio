"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

gsap.registerPlugin(ScrollTrigger);

/*
  Identidade visual de cada projeto.
  - Brasa Fish: cores e fonte lidas do código do próprio site (#111211, #f05a25, Montserrat).
  - Demais: paleta e textos já validados na seção Projetos.
  Nenhum preço é exibido aqui, para não divulgar valores desatualizados.
*/
const SITES = [
  {
    id: "brasa", tab: "Brasa Fish", host: "brasafish.com.br", href: "https://www.brasafish.com.br/",
    brand: "BRASA FISH", links: ["Nossa história", "Day Use", "Frota", "Reservas"],
    eyebrow: "LAGO DO MANSO · MT", hero: ["NÃO É SÓ PESCARIA", "É HISTÓRIA"],
    lead: "Embarcações equipadas e experiências reais no Lago do Manso, em Mato Grosso.",
    cta: "Quero viver essa experiência", ctaShort: "Reservar",
    cards: [["Guia", "Incluso"], ["Combustível", "Incluso"], ["Almoço", "Incluso"], ["Tábua de frios", "Por embarcação"]],
    band: "Day Use no Lago do Manso, das 07h às 17h.", foot: "Pesca esportiva de pescador para pescador",
    vars: {
      "--s-bg": "#111211", "--s-tx": "#f5f3ef", "--s-mut": "rgba(245,243,239,.66)", "--s-card": "#222a24", "--s-cardtx": "#f5f3ef",
      "--s-bd": "rgba(245,243,239,.12)", "--s-ac": "#f05a25", "--s-actx": "#ffffff", "--s-btn": "#f05a25", "--s-hbtn": "#f05a25",
      "--s-hbtntx": "#ffffff", "--s-hero": "#111211", "--s-herotx": "#f5f3ef", "--s-eb": "#f05a25", "--s-ring": "#f05a25",
      "--s-art": "radial-gradient(circle at 68% 32%,rgba(240,90,37,.55),transparent 55%),linear-gradient(160deg,#222a24,#101512)",
      "--s-font": "var(--font-montserrat),Arial,sans-serif", "--s-up": "uppercase", "--s-glow": "#f05a25", "--s-tabtx": "#ffffff",
    },
  },
  {
    id: "meteoro", tab: "Meteoro Joias", host: "meteorojoias.com.br", href: "https://www.meteorojoias.com.br/",
    brand: "METEORO", links: ["Vitrine", "Alianças", "Coleções", "Contato"],
    eyebrow: "JOIAS & ACESSÓRIOS", hero: ["SUA PRESENÇA.", "SUA ASSINATURA."],
    lead: "Alianças, anéis, correntes e colares com atendimento pelo WhatsApp.",
    cta: "Explorar a vitrine", ctaShort: "Vitrine",
    cards: [["Anel Soberano", "Noir"], ["Alianças", "Laço"], ["Corrente", "Cruz"], ["Colar", "Asas"]],
    band: "Vitrine com filtros por categoria e pedido direto pelo WhatsApp.", foot: "Joias & Acessórios",
    vars: {
      "--s-bg": "#121212", "--s-tx": "#f3e6c4", "--s-mut": "rgba(243,230,196,.66)", "--s-card": "#1d1d1d", "--s-cardtx": "#f3e6c4",
      "--s-bd": "#3a3220", "--s-ac": "#d4af37", "--s-actx": "#111111", "--s-btn": "linear-gradient(120deg,#c9a227,#f3d97a)",
      "--s-hbtn": "linear-gradient(120deg,#c9a227,#f3d97a)", "--s-hbtntx": "#111111", "--s-hero": "#121212", "--s-herotx": "#f3e6c4",
      "--s-eb": "#d4af37", "--s-ring": "#d4af37",
      "--s-art": "radial-gradient(circle at 50% 46%,rgba(212,175,55,.5),transparent 52%),linear-gradient(160deg,#1d1d1d,#0c0c0c)",
      "--s-font": "var(--font-sora),Inter,sans-serif", "--s-up": "uppercase", "--s-glow": "#d4af37", "--s-tabtx": "#111111",
    },
  },
  {
    id: "valentim", tab: "Balneário Valentim", host: "balneariovalentimm.com.br", href: "https://www.balneariovalentimm.com.br/",
    brand: "BALNEÁRIO VALENTIM", links: ["Início", "Valores", "Avaliações", "Como chegar"],
    eyebrow: "AÇAILÂNDIA · MA", hero: ["Seu refúgio perfeito", "em meio à natureza."],
    lead: "Águas cristalinas em Açailândia, no Maranhão.",
    cta: "Planejar minha visita", ctaShort: "Visitar",
    cards: [["Passar o dia", "Day use"], ["Camping", "Estrutura"], ["Restaurante", "No local"], ["Como chegar", "Mapa"]],
    band: "Avaliações do Google, vídeos e mapa para você planejar a visita.", foot: "Turismo e natureza no Maranhão",
    vars: {
      "--s-bg": "#e9fbf5", "--s-tx": "#0b3d33", "--s-mut": "rgba(11,61,51,.68)", "--s-card": "#ffffff", "--s-cardtx": "#0b6e63",
      "--s-bd": "rgba(11,110,99,.18)", "--s-ac": "#0b6e63", "--s-actx": "#ffffff", "--s-btn": "#0b6e63", "--s-hbtn": "#ffffff",
      "--s-hbtntx": "#0b6e63", "--s-hero": "linear-gradient(160deg,#0fa28a,#0b6e63 60%,#064c46)", "--s-herotx": "#ffffff",
      "--s-eb": "rgba(255,255,255,.85)", "--s-ring": "rgba(255,255,255,.7)",
      "--s-art": "radial-gradient(circle at 60% 40%,rgba(255,255,255,.35),transparent 55%),linear-gradient(160deg,#0b6e63,#064c46)",
      "--s-font": "var(--font-sora),Inter,sans-serif", "--s-up": "none", "--s-glow": "#0fa28a", "--s-tabtx": "#ffffff",
    },
  },
  {
    id: "nasa", tab: "Eletricista da NASA", host: "eletricadanasa.vercel.app", href: "https://eletricadanasa.vercel.app/",
    brand: "ELETRICISTA DA NASA", links: ["Biblioteca", "Como funciona", "Minha biblioteca"],
    eyebrow: "AUTOELÉTRICA", hero: ["CONHECIMENTO TÉCNICO", "PARA IR MAIS LONGE."],
    lead: "Biblioteca digital de esquemas elétricos e diagramas de autoelétrica.",
    cta: "Explorar a biblioteca", ctaShort: "Biblioteca",
    cards: [["Catálogo", "Por montadora"], ["Prévia", "Dos materiais"], ["Pagamento", "Via Pix"], ["Acervo", "Minha biblioteca"]],
    band: "Catálogo por montadora, filtros e compra por Pix.", foot: "Esquemas e diagramas para a autoelétrica",
    vars: {
      "--s-bg": "#071d4a", "--s-tx": "#ffffff", "--s-mut": "rgba(255,255,255,.7)", "--s-card": "rgba(43,140,255,.15)", "--s-cardtx": "#ffffff",
      "--s-bd": "rgba(43,140,255,.4)", "--s-ac": "#2b8cff", "--s-actx": "#ffffff", "--s-btn": "#2b8cff", "--s-hbtn": "#2b8cff",
      "--s-hbtntx": "#ffffff", "--s-hero": "#071d4a", "--s-herotx": "#ffffff", "--s-eb": "#6db3ff", "--s-ring": "#6db3ff",
      "--s-art": "radial-gradient(circle at 62% 38%,rgba(43,140,255,.55),transparent 55%),linear-gradient(160deg,#12408f,#092b68)",
      "--s-font": "var(--font-sora),Inter,sans-serif", "--s-up": "uppercase", "--s-glow": "#2b8cff", "--s-tabtx": "#ffffff",
    },
  },
];

const DEVICES = [
  { key: "laptop", vw: 1440, label: "Desktop", px: "1440 px" },
  { key: "tablet", vw: 820, label: "Tablet", px: "820 px" },
  { key: "phone", vw: 390, label: "Mobile", px: "390 px" },
];

const STEPS = [
  ["01", "Mobile · 390 px", "Nasce no celular.", "Quem chega pelo Instagram precisa entender tudo em segundos. Menu enxuto, textos diretos e o botão de WhatsApp sempre ao alcance do polegar."],
  ["02", "Tablet · 820 px", "Cresce sem quebrar.", "O menu se abre, a grade passa para duas colunas e os cards ganham respiro. Nada espremido, nada esticado."],
  ["03", "Desktop · 1440 px", "Ocupa a tela inteira.", "Composição em colunas, hierarquia clara e o mesmo caminho até o contato: título, prova e ação."],
];

function SiteView({ s }) {
  return (
    <>
      <div className="rs-site">
        <header className="rs-nav">
          <b className="rs-brand">{s.brand}</b>
          <nav className="rs-links">{s.links.map((l) => <span key={l}>{l}</span>)}</nav>
          <span className="rs-navcta">{s.ctaShort}</span>
          <span className="rs-burger"><i /><i /><i /></span>
        </header>
        <section className="rs-hero">
          <div>
            <small className="rs-eyebrow">{s.eyebrow}</small>
            <h4>{s.hero[0]}<br />{s.hero[1]}</h4>
            <p>{s.lead}</p>
            <span className="rs-btn">{s.cta}</span>
          </div>
          <div className="rs-art" />
        </section>
        <section className="rs-cards">
          {s.cards.map(([t, d]) => <div key={t}><b>{t}</b><span>{d}</span></div>)}
        </section>
        <section className="rs-band"><p>{s.band}</p></section>
        <footer className="rs-foot">{s.brand} · {s.foot}</footer>
      </div>
      <span className="rs-wa"><WaIcon className="h-full w-full" /></span>
    </>
  );
}

function Device({ d, s }) {
  return (
    <div className={`rs-dev rs-${d.key}`} aria-hidden="true">
      <span className="rs-chip">{d.label} · {d.px}</span>
      <div className="rs-float">
        <div className="rs-frame">
          <div className="rs-bz">
            {d.key === "laptop" && <div className="rs-bar"><u /><u /><u /><em>{s.host}</em></div>}
            <div className="rs-fit" data-vw={d.vw} style={{ "--vw": d.vw }}>
              <div className="rs-vp" key={s.id}><SiteView s={s} /></div>
            </div>
          </div>
        </div>
        {d.key === "laptop" && <div className="rs-base" />}
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

    // Escala cada tela virtual (390 / 820 / 1440 px) para caber no aparelho, mantendo as quebras reais do layout.
    const fits = [...el.querySelectorAll(".rs-fit")];
    const fit = (f) => {
      const k = f.clientWidth / Number(f.dataset.vw);
      if (!k) return;
      f.style.setProperty("--k", k);
      f.style.setProperty("--vh", f.clientHeight / k + "px");
      f.classList.add("on");
    };
    const ro = new ResizeObserver(() => fits.forEach(fit));
    fits.forEach((f) => { ro.observe(f); fit(f); });

    const mm = gsap.matchMedia();

    // Desktop: cena fixa na tela, os aparelhos entram conforme a rolagem.
    mm.add("(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)", () => {
      el.classList.add("rs-pinned");
      const q = (sel) => el.querySelector(sel);
      const [c0, c1, c2] = el.querySelectorAll(".rs-cap");
      const L = q(".rs-laptop"), T = q(".rs-tablet"), P = q(".rs-phone");

      gsap.set(L, { autoAlpha: 0, y: 70, scale: 0.94 });
      gsap.set(T, { autoAlpha: 0, x: -90 });
      gsap.set(P, { autoAlpha: 0, y: 90, scale: 1.12, transformOrigin: "50% 100%" });
      gsap.set([c0, c1, c2], { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: { trigger: q(".rs-pin"), start: "top top", end: "+=240%", pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      tl.to(P, { autoAlpha: 1, y: 0, duration: 1 })
        .to(c0, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
        .to({}, { duration: 0.7 })
        .to(c0, { autoAlpha: 0, y: -24, duration: 0.5 })
        .to(T, { autoAlpha: 1, x: 0, duration: 1 }, "<")
        .to(P, { scale: 1, duration: 1 }, "<")
        .to(c1, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.3")
        .to({}, { duration: 0.7 })
        .to(c1, { autoAlpha: 0, y: -24, duration: 0.5 })
        .to(L, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1 }, "<")
        .to(c2, { autoAlpha: 1, y: 0, duration: 0.6 }, "<0.3")
        .to({}, { duration: 0.8 });
      tl.to(q(".rs-prog i"), { scaleY: 1, ease: "none", duration: tl.duration() }, 0);

      return () => el.classList.remove("rs-pinned");
    });

    // Celular e tablet: sem fixar a tela, os aparelhos entram em sequência.
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(el.querySelectorAll(".rs-dev"), {
        autoAlpha: 0, y: 60, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".rs-stage"), start: "top 80%", once: true },
      });
    });

    return () => { ro.disconnect(); mm.revert(); };
  }, []);

  return (
    <section id="responsivo" ref={root} className="rs sec">
      <div className="rs-wrap">
        <div className="rs-head">
          <span className="rs-pill rv">● Responsividade de verdade</span>
          <h2 className="h2 rv">Uma página. <span className="g">Todas as telas.</span></h2>
          <p className="sub rv" style={{ marginBottom: 0 }}>
            Você acabou de ver os projetos no ar. Agora veja o que acontece por trás: cada página nasce pensada para o celular,
            ganha espaço no tablet e se recompõe no notebook, sem perder a identidade da marca.
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
              <small>Veja com a identidade de cada projeto</small>
              <div className="rs-tabs" role="tablist" aria-label="Projetos">
                {SITES.map((x) => (
                  <button
                    key={x.id} type="button" role="tab" aria-selected={x.id === id}
                    className={x.id === id ? "on" : ""} onClick={() => setId(x.id)}
                    style={{ "--tc": x.vars["--s-glow"], "--tcx": x.vars["--s-tabtx"] }}
                  >
                    {x.tab}
                  </button>
                ))}
              </div>
              <a className="rs-visit" href={s.href} target="_blank" rel="noopener noreferrer">Visitar {s.host} ↗</a>
            </div>
          </div>

          <div className="rs-stage" role="img" aria-label={`Mockups de celular, tablet e notebook exibindo o site ${s.tab}`} style={s.vars}>
            <div className="rs-glow" />
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
            Representação ilustrativa montada com a identidade visual de cada projeto. Os sites reais estão na seção <a href="#projetos">Projetos</a>.
          </small>
        </div>
      </div>
    </section>
  );
}