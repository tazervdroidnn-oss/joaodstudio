"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "brasa", href: "https://www.brasafish.com.br/", host: "brasafish.com.br",
    title: "Brasa Fish",
    desc: "Pesca esportiva no Lago do Manso, com frota, pacotes, galerias e reservas pelo WhatsApp.",
    chips: ["Vídeo hero", "Frota", "Pacotes", "WhatsApp"],
  },
  {
    id: "meteoro", href: "https://www.meteorojoias.com.br/", host: "meteorojoias.com.br",
    title: "Meteoro Joias & Acessórios",
    desc: "Vitrine de joias com filtros por categoria, carrinho e pedido direto pelo WhatsApp.",
    chips: ["Vitrine", "Carrinho", "Animação de scroll", "Mapa"],
  },
  {
    id: "manso", href: "https://mansosportfishing.vercel.app/", host: "mansosportfishing.vercel.app",
    title: "Mansô Sport Fishing",
    desc: "Pesca esportiva no Rio e no Lago do Manso, com galeria de troféus, pacotes para grupos, mapa com rota e agendamento pelo WhatsApp.",
    chips: ["Galeria de troféus", "Grupos", "Mapa com rota", "WhatsApp"],
  },
  {
    id: "lahatua", href: "https://www.pousadadalahatua.com.br/", host: "pousadadalahatua.com.br",
    title: "Aldeia Lahatua",
    desc: "Pesca esportiva no Xingu com experiência indígena, contada em capítulos, com vídeos, galeria e reservas pelo WhatsApp.",
    chips: ["Narrativa em capítulos", "Vídeos", "Galeria", "Reservas"],
  },
];

export default function Projects() {
  const root = useRef(null);
  const grid = useRef(null);
  const [active, setActive] = useState(0);
  const [swiped, setSwiped] = useState(false);

  // Carrossel do celular: descobre qual card está na tela e some o aviso depois do 1º arraste
  const onGridScroll = () => {
    const g = grid.current;
    if (!g || !g.firstElementChild) return;
    const step = g.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(g).columnGap || 0);
    setActive(Math.round(g.scrollLeft / step));
    if (g.scrollLeft > 40) setSwiped(true);
  };
  const goTo = (i) => {
    const g = grid.current;
    const card = g?.children[i];
    if (card) g.scrollTo({ left: card.offsetLeft - g.firstElementChild.offsetLeft, behavior: "smooth" });
  };

  // Uma deslizada leve e automática, só para mostrar que dá para arrastar (celular)
  useEffect(() => {
    const g = grid.current;
    if (!g || !window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let done = false;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done) return;
      done = true;
      io.disconnect();
      setTimeout(() => {
        if (g.scrollLeft > 10) return;
        g.style.scrollSnapType = "none";
        gsap.to(g, {
          scrollLeft: 90, duration: 0.55, ease: "power2.out", yoyo: true, repeat: 1, repeatDelay: 0.25,
          onComplete: () => { g.style.scrollSnapType = ""; },
        });
      }, 1800);
    }, { threshold: 0.6 });
    io.observe(g);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = root.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const small = window.matchMedia("(max-width: 767px)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".pj", section);

      // Estado inicial (só com JS ativo; sem JS tudo aparece normalmente)
      cards.forEach((card) => {
        const q = gsap.utils.selector(card);
        gsap.set(card, { opacity: 0, y: small ? 56 : 96, scale: small ? 0.97 : 0.93, transformPerspective: 1200, transformOrigin: "50% 100%" });
        gsap.set(q(".pj-scr"), { clipPath: "inset(0% 0% 100% 0% round 0px)" });
        gsap.set(q(".pj-media"), { scale: small ? 1.18 : 1.32, transformOrigin: "50% 0%" });
        gsap.set(q(".bar u"), { scale: 0 });
        gsap.set(q(".bar em"), { opacity: 0, x: -12 });
        gsap.set(q(".pj-l"), { opacity: 0, y: 22 });
        gsap.set(q(".chips span"), { opacity: 0, y: 10 });
      });

      // Timeline cinematográfica de cada card: o card sobe, a captura é revelada
      // por uma máscara (clip-path) de cima para baixo enquanto desfaz o zoom,
      // e depois entram barra do navegador, título, descrição e etiquetas.
      const reveal = (card, delay) => {
        const q = gsap.utils.selector(card);
        const tl = gsap.timeline({ delay });
        tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 1.3, ease: "expo.out" })
          .to(q(".pj-scr"), { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.35, ease: "power4.inOut" }, 0.12)
          .to(q(".pj-media"), { scale: 1, duration: 2, ease: "power3.out" }, 0.12)
          .to(q(".bar u"), { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.07 }, 0.3)
          .to(q(".bar em"), { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, 0.42)
          .to(q(".pj-l"), { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09 }, 0.62)
          .to(q(".chips span"), { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05 }, 0.9)
          .add(() => {
            gsap.set(q(".pj-scr"), { clearProps: "clipPath" });
            card.classList.add("pj-in");
          });
      };

      // Stagger entre os cards que entram juntos (lado a lado no desktop)
      ScrollTrigger.batch(cards, {
        start: small ? "top 92%" : "top 86%",
        once: true,
        interval: 0.12,
        onEnter: (batch) => batch.forEach((card, i) => reveal(card, i * 0.2)),
      });

      // Microinterações: inclinação 3D leve e luz que segue o cursor (só com mouse)
      if (canHover) {
        cards.forEach((card) => {
          const shot = card.querySelector(".pj-shot");
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });
          const move = (e) => {
            const r = shot.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            shot.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
            shot.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
            ry((x - 0.5) * 5);
            rx((0.5 - y) * 4);
          };
          const leave = () => { rx(0); ry(0); };
          shot.addEventListener("pointermove", move);
          shot.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            shot.removeEventListener("pointermove", move);
            shot.removeEventListener("pointerleave", leave);
          });
        });
      }
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section id="projetos" className="sec acc-m" ref={root}>
      <div className="wrap">
        <h2 className="h2" data-split>Projetos que <span className="g">já entreguei</span></h2>
        <p className="sub rv">Sites reais, no ar, atendendo clientes pelo WhatsApp.</p>
        <p className={`pj-hint${swiped ? " off" : ""}`} aria-hidden="true">
          Arraste para o lado e veja os {projects.length} sites <span className="pj-hint-hand">→</span>
        </p>
        <div
          ref={grid}
          className="pj-grid grid grid-cols-1 gap-8 md:grid-cols-2"
          onScroll={onGridScroll}
          role="region" aria-label="Projetos (arraste para o lado no celular)" tabIndex={0}
        >
          {projects.map((p, i) => (
            <div key={p.href} className="pj">
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="shot pj-shot" aria-label={`Visitar ${p.title} (${p.host})`}>
                <span className="pj-glow" aria-hidden="true" />
                <div className="bar"><u /><u /><u /><em>{p.host}</em></div>
                <div className="scr pj-scr">
                  <div className="pj-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/sites/${p.id}-laptop.jpg`} alt={`Captura de tela do site ${p.title}`}
                      width="1280" height="3022" loading="lazy" decoding="async" draggable="false"
                    />
                  </div>
                </div>
                <div className="px-5 pb-5 pt-4">
                  <h3 className="pj-l pj-title text-lg font-bold">
                    <span className="pj-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    {p.title}
                    <span className="pj-arrow" aria-hidden="true">↗</span>
                  </h3>
                  <p className="pj-l my-1 mb-2.5 text-sm text-mut">{p.desc}</p>
                  <div className="pj-l chips flex flex-wrap gap-1.5">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="pj-dots" role="group" aria-label="Escolher projeto">
          {projects.map((p, i) => (
            <button
              key={p.id} type="button" className={i === active ? "on" : ""}
              aria-label={`Ver ${p.title}`} aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
