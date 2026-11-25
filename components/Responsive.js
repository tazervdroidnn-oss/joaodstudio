"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WaIcon from "./WaIcon";
import { WA_LINK } from "./config";

gsap.registerPlugin(ScrollTrigger);
// Barra de endereço do celular aparecendo/sumindo não deve recalcular a cena (evita tremida).
ScrollTrigger.config({ ignoreMobileResize: true });

/*
  Cada aparelho mostra uma captura REAL do site, feita na largura do aparelho
  (1440 / 820 / 390 px), em /public/sites/<id>-<laptop|tablet|phone>.(webp|jpg).
  "glow" e "tabtx" só definem a cor do brilho e da aba de cada projeto.
*/
const SITES = [
  { id: "brasa", tab: "Brasa Fish", short: "Brasa", host: "brasafish.com.br", href: "https://www.brasafish.com.br/", glow: "#f05a25", tabtx: "#ffffff" },
  { id: "meteoro", tab: "Meteoro Joias", short: "Meteoro", host: "meteorojoias.com.br", href: "https://www.meteorojoias.com.br/", glow: "#d4af37", tabtx: "#111111" },
  { id: "manso", tab: "Mansô Sport Fishing", short: "Mansô", host: "mansosportfishing.vercel.app", href: "https://mansosportfishing.vercel.app/", glow: "#f28a1d", tabtx: "#ffffff" },
  { id: "lahatua", tab: "Aldeia Lahatua", short: "Lahatua", host: "pousadadalahatua.com.br", href: "https://www.pousadadalahatua.com.br/", glow: "#3f8f66", tabtx: "#ffffff" },
];

const DEVICES = [
  { key: "laptop", label: "Desktop", px: "1440 px" },
  { key: "tablet", label: "Tablet", px: "820 px" },
  { key: "phone", label: "Mobile", px: "390 px" },
];

// Cada etapa fala de um aparelho: o texto, o trilho e o aparelho em destaque andam juntos.
const STEPS = [
  ["01", "Mobile · 390 px", "Nasce no celular.", "Quem chega pelo Instagram precisa entender tudo em segundos. Menu enxuto, textos diretos e o botão de WhatsApp sempre ao alcance do polegar."],
  ["02", "Tablet · 820 px", "Cresce sem quebrar.", "O menu se abre, a grade passa para duas colunas e os cards ganham respiro. Nada espremido, nada esticado."],
  ["03", "Desktop · 1440 px", "Ocupa a tela inteira.", "Composição em colunas, hierarquia clara e o mesmo caminho até o contato: título, prova e ação."],
];

const preload = (id, keys = DEVICES.map((d) => d.key)) => {
  keys.forEach((k) => { const i = new Image(); i.src = `/sites/${id}-${k}.webp`; });
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
              <picture key={`${s.id}-${d.key}`}>
                <source type="image/webp" srcSet={`/sites/${s.id}-${d.key}.webp`} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="rs-shot" src={`/sites/${s.id}-${d.key}.jpg`} alt="" loading="lazy" decoding="async" draggable="false" />
              </picture>
            </div>
          </div>
        </div>
        {d.key === "laptop" && <div className="rs-base" />}
      </div></div>
    </div>
  );
}

/*
  Cena fixa na tela, guiada pela rolagem. Serve ao desktop e ao celular em pé:
  só mudam distâncias, duração e o toque do mouse (que só existe com mouse).
*/
function buildScene(el, { mobile, jump }) {
  const q = (sel) => el.querySelector(sel);
  const caps = gsap.utils.toArray(".rs-cap", el);
  const nodes = gsap.utils.toArray(".rs-node", el);
  const fill = q(".rs-rail-fill i");
  const L = q(".rs-laptop"), T = q(".rs-tablet"), P = q(".rs-phone");
  const depths = [L, T, P].map((d) => d.querySelector(".rs-depth"));
  const setFill = gsap.quickSetter(fill, "scaleX");

  el.classList.add("rs-pinned");
  if (mobile) el.classList.add("rs-m");

  gsap.set([L, T, P], { transformPerspective: 1600 });
  gsap.set(L, { autoAlpha: 0, y: mobile ? 46 : 70, scale: 0.94, rotationY: mobile ? 10 : 14 });
  gsap.set(T, { autoAlpha: 0, x: mobile ? -34 : -90, rotationY: mobile ? 16 : 20 });
  // No celular o aparelho abre sozinho, grande e no centro, e depois encolhe até o seu lugar quando os
  // outros chegam. Ele já nasce no tamanho grande (--pw maior no CSS) e só diminui: assim a captura
  // fica nítida, em vez de uma imagem pequena esticada.
  gsap.set(P, mobile
    ? { autoAlpha: 0, y: 64, scale: 1, xPercent: -73.5, rotationX: -10, transformOrigin: "100% 100%" }
    : { autoAlpha: 0, y: 90, scale: 1.12, xPercent: 0, rotationX: -10, transformOrigin: "50% 100%" });
  gsap.set(caps, { autoAlpha: 0, y: 24 });
  gsap.set(depths, { transformPerspective: 1400, rotationY: -8, rotationX: 2 });
  setFill(0);

  let step = -1;
  const setStep = (n) => {
    if (n === step) return;
    step = n;
    el.dataset.step = String(n);
    nodes.forEach((b, i) => {
      b.setAttribute("aria-current", i === n ? "true" : "false");
      b.classList.toggle("done", i < n);
    });
  };
  setStep(0);

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    // O trilho lê o tempo da própria timeline (já suavizado pelo scrub), então anda junto com o texto.
    onUpdate() {
      const lb = this.labels;
      if (lb.s2 === undefined) return;
      const t = this.time();
      setStep(t >= lb.s2 ? 2 : t >= lb.s1 ? 1 : 0);
      setFill(gsap.utils.clamp(0, 1, (t - lb.s0) / (lb.s2 - lb.s0)));
    },
    scrollTrigger: {
      trigger: q(".rs-pin"), start: "top top", end: mobile ? "+=115%" : "+=135%",
      pin: true, scrub: mobile ? 0.8 : 0.6, anticipatePin: 1, invalidateOnRefresh: true,
    },
  });

  tl.to(P, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1 }, 0)
    .to(caps[0], { autoAlpha: 1, y: 0, duration: 0.6 }, 0.25)
    .addLabel("s0", 0.25)
    .to(caps[0], { autoAlpha: 0, y: -24, duration: 0.5 }, 1.9)
    .to(T, { autoAlpha: 1, x: 0, rotationY: 0, duration: 1 }, 1.9)
    .to(P, mobile ? { scale: 0.667, xPercent: 0, duration: 1 } : { scale: 1, duration: 1 }, 1.9)
    .to(caps[1], { autoAlpha: 1, y: 0, duration: 0.6 }, 2.2)
    .addLabel("s1", 2.2)
    .to(caps[1], { autoAlpha: 0, y: -24, duration: 0.5 }, 3.9)
    .to(L, { autoAlpha: 1, y: 0, scale: 1, rotationY: 0, duration: 1.1 }, 3.9)
    .to(caps[2], { autoAlpha: 1, y: 0, duration: 0.6 }, 4.2)
    .addLabel("s2", 4.2)
    .to({}, { duration: 0.8 }, 4.8);

  // Toque no nome de um aparelho leva a rolagem direto para aquela etapa.
  jump.current = (i) => {
    const st = tl.scrollTrigger;
    const t = tl.labels[`s${i}`] + 0.95;
    window.scrollTo({ top: st.start + (t / tl.duration()) * (st.end - st.start), behavior: "smooth" });
  };

  let off = () => {};
  if (mobile) {
    // Sem mouse: a "câmera" contorna os aparelhos devagar enquanto a rolagem avança.
    tl.fromTo(depths, { rotationY: -9 }, { rotationY: -2, ease: "none", duration: tl.duration() }, 0);
  } else if (window.matchMedia("(hover: hover)").matches) {
    // Com mouse: inclinação 3D acompanha o cursor, cada aparelho em uma profundidade.
    const stage = q(".rs-stage");
    const layers = [[L, 0.8, 6], [T, 1.2, 12], [P, 1.6, 20]].map(([dev, m, px]) => {
      const d = dev.querySelector(".rs-depth");
      return {
        m, px,
        ry: gsap.quickTo(d, "rotationY", { duration: 1, ease: "power3.out" }),
        rx: gsap.quickTo(d, "rotationX", { duration: 1, ease: "power3.out" }),
        x: gsap.quickTo(d, "x", { duration: 1, ease: "power3.out" }),
      };
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

  return () => {
    off();
    jump.current = null;
    el.classList.remove("rs-pinned", "rs-m");
    delete el.dataset.step;
    nodes.forEach((b) => { b.classList.remove("done"); b.removeAttribute("aria-current"); });
  };
}

export default function Responsive() {
  const root = useRef(null);
  const jump = useRef(null);
  const [id, setId] = useState("brasa");
  const s = SITES.find((x) => x.id === id) || SITES[0];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    const calm = "(prefers-reduced-motion: no-preference)";

    // Desktop: cena fixa na tela.
    mm.add(`(min-width: 1024px) and (min-height: 640px) and ${calm}`, () => buildScene(el, { mobile: false, jump }));

    // Celular e tablet em pé: a mesma cena fixa, com o texto logo abaixo dos aparelhos.
    mm.add(`(max-width: 1023px) and (orientation: portrait) and (min-height: 540px) and ${calm}`, () => buildScene(el, { mobile: true, jump }));

    // Celular deitado ou tela muito baixa: sem fixar, os aparelhos entram em sequência.
    mm.add(`(max-width: 1023px) and (orientation: landscape) and ${calm}, (max-width: 1023px) and (max-height: 539px) and ${calm}`, () => {
      gsap.from(el.querySelectorAll(".rs-dev"), {
        autoAlpha: 0, y: 60, duration: 1, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: el.querySelector(".rs-stage"), start: "top 80%", once: true },
      });
    });

    return () => mm.revert();
  }, []);

  // Pausa as animações contínuas quando a seção sai da tela e aquece as capturas em tempo ocioso.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let warmed = false;
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle("rs-off", !e.isIntersecting);
      if (e.isIntersecting && !warmed) {
        warmed = true;
        if (navigator.connection?.saveData) return;
        const idle = window.requestIdleCallback || ((f) => setTimeout(f, 500));
        const touch = window.matchMedia("(hover: none)").matches;
        // No toque, só as capturas leves do celular; o resto carrega ao escolher o projeto.
        idle(() => SITES.forEach((x) => preload(x.id, touch ? ["phone"] : undefined)));
      }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="responsivo" ref={root} className="rs sec acc-v">
      <div className="rs-wrap">
        <div className="rs-head">
          <span className="rs-pill rv">Responsividade de verdade</span>
          <h2 className="h2 rv">Uma página. <span className="g">Todas as telas.</span></h2>
          <p className="sub rv" style={{ marginBottom: 0 }}>
            Os mesmos sites em três telas: pensados primeiro para o celular, ajustados no tablet e completos no notebook.
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

            <div className="rs-rail" role="group" aria-label="Versões da página">
              <div className="rs-rail-fill" aria-hidden="true"><i /></div>
              {STEPS.map(([n, tag], i) => {
                const [name, px] = tag.split(" · ");
                return (
                  <button key={n} type="button" className="rs-node" aria-label={`Ver a versão ${name}, ${px}`} onClick={() => jump.current?.(i)}>
                    {name}<small>{px}</small>
                  </button>
                );
              })}
            </div>

            <div className="rs-tabs-wrap">
              <small>Veja cada projeto em três telas</small>
              <div className="rs-tabs" role="tablist" aria-label="Projetos">
                {SITES.map((x) => (
                  <button
                    key={x.id} type="button" role="tab" aria-selected={x.id === id} aria-label={x.tab}
                    className={x.id === id ? "on" : ""} onClick={() => { preload(x.id); setId(x.id); }}
                    onPointerEnter={() => preload(x.id)} onFocus={() => preload(x.id)}
                    style={{ "--tc": x.glow, "--tcx": x.tabtx }}
                  >
                    <span className="rs-t-l">{x.tab}</span><span className="rs-t-s">{x.short}</span>
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
