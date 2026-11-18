"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Elementos com .g ou data-unit são animados inteiros (mantém a cor do destaque)
const UNIT = ".g, [data-unit]";

// Divide o texto em palavras (e letras). Retorna também o revert para restaurar o HTML original.
function split(el, byChar) {
  const original = el.innerHTML;
  const label = el.textContent.replace(/\s+/g, " ").trim();
  const words = [], chars = [], units = [];

  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span");
          w.className = byChar ? "sw m" : "sw";
          w.setAttribute("aria-hidden", "true");
          if (byChar) {
            [...part].forEach((ch) => {
              const c = document.createElement("span");
              c.className = "sc";
              c.textContent = ch;
              w.appendChild(c);
              chars.push(c);
            });
          } else {
            w.textContent = part;
          }
          frag.appendChild(w);
          words.push(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) {
        if (n.matches(UNIT)) { n.setAttribute("aria-hidden", "true"); units.push(n); }
        else walk(n);
      }
    });
  };
  walk(el);

  const sr = document.createElement("span");
  sr.className = "sr-only";
  sr.textContent = label;
  el.prepend(sr);

  return { words, chars, units, revert: () => { el.innerHTML = original; } };
}

export default function Cinema() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const secs = [...document.querySelectorAll(".sec")];

    if (reduce) {
      secs.forEach((s) => s.classList.add("in"));
      document.querySelectorAll("[data-bridge]").forEach((p) => p.classList.add("on"));
      return;
    }

    const splits = [];

    const ctx = gsap.context(() => {
      // Título do hero: letras sobem de uma máscara, sem desfoque nem brilho
      const h1 = document.querySelector("[data-hero-title]");
      if (h1) {
        const s = split(h1, true);
        splits.push(s);
        gsap.set(s.chars, { yPercent: 105 });
        gsap.set(s.units, { opacity: 0, y: 14 });
        const tl = gsap.timeline({ delay: 0.25 });
        tl.to(s.chars, { yPercent: 0, duration: 0.9, ease: "power4.out", stagger: 0.012 });
        tl.to(s.units, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.45);
      }

      // Títulos das seções: mesmo efeito, ao rolar
      document.querySelectorAll("[data-split]").forEach((el) => {
        const s = split(el, true);
        splits.push(s);
        gsap.set(s.chars, { yPercent: 105 });
        gsap.set(s.units, { opacity: 0, y: 14 });
        ScrollTrigger.create({
          trigger: el, start: "top 88%", once: true,
          onEnter: () => {
            gsap.to(s.chars, { yPercent: 0, duration: 0.85, ease: "power4.out", stagger: 0.014 });
            gsap.to(s.units, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 });
          },
        });
      });

      // Pontes de texto: as palavras acendem conforme a rolagem; o destaque ganha sublinhado
      document.querySelectorAll("[data-bridge]").forEach((p) => {
        const s = split(p, false);
        splits.push(s);
        gsap.set(s.words, { opacity: 0.2 });
        gsap.to(s.words, {
          opacity: 1, ease: "none", stagger: 0.1,
          scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 52%", scrub: 0.5 },
        });
        ScrollTrigger.create({
          trigger: p, start: "top 50%",
          onEnter: () => p.classList.add("on"),
          onLeaveBack: () => p.classList.remove("on"),
        });
      });

      // Fios finos que ligam uma seção à outra
      document.querySelectorAll("[data-thread]").forEach((t) => {
        gsap.to(t, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: t.parentElement, start: "bottom 92%", end: "bottom 55%", scrub: true },
        });
      });

      // Linha fina no topo de cada divisão
      secs.forEach((s) => {
        ScrollTrigger.create({ trigger: s, start: "top 82%", once: true, onEnter: () => s.classList.add("in") });
      });

      // Barra de progresso da página
      gsap.to("[data-progress]", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      clearTimeout(t);
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return <div className="progress" data-progress aria-hidden="true" />;
}
