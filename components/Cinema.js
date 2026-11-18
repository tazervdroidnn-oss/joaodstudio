"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Elementos com .g ou data-unit são animados inteiros (mantém o degradê do texto)
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
      // Título do hero: letras sobem de uma máscara, palavra em degradê entra com desfoque
      const h1 = document.querySelector("[data-hero-title]");
      if (h1) {
        const s = split(h1, true);
        splits.push(s);
        gsap.set(s.chars, { yPercent: 120, rotate: 8, opacity: 0, transformOrigin: "0% 100%" });
        gsap.set(s.units, { opacity: 0, scale: 0.86, y: 20, filter: "blur(14px)" });
        const tl = gsap.timeline({ delay: 0.3 });
        tl.to(s.chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.014 });
        tl.to(s.units, {
          opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
          onComplete: () => { gsap.set(s.units, { clearProps: "filter" }); h1.classList.add("shine"); },
        }, 0.5);
      }

      // Títulos das seções: mesmo efeito, disparado ao rolar
      document.querySelectorAll("[data-split]").forEach((el) => {
        const s = split(el, true);
        splits.push(s);
        gsap.set(s.chars, { yPercent: 118, rotate: 7, opacity: 0, transformOrigin: "0% 100%" });
        gsap.set(s.units, { opacity: 0, y: 28, filter: "blur(10px)" });
        ScrollTrigger.create({
          trigger: el, start: "top 86%", once: true,
          onEnter: () => {
            gsap.to(s.chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.95, ease: "expo.out", stagger: 0.02 });
            gsap.to(s.units, {
              opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out", delay: 0.25,
              onComplete: () => { gsap.set(s.units, { clearProps: "filter" }); el.classList.add("shine"); },
            });
          },
        });
      });

      // Pontes de texto: as palavras acendem conforme a rolagem; destaques ganham marca-texto
      document.querySelectorAll("[data-bridge]").forEach((p) => {
        const s = split(p, false);
        splits.push(s);
        gsap.set(s.words, { opacity: 0.14 });
        gsap.to(s.words, {
          opacity: 1, ease: "none", stagger: 0.12,
          scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 50%", scrub: 0.6 },
        });
        ScrollTrigger.create({
          trigger: p, start: "top 45%",
          onEnter: () => p.classList.add("on"),
          onLeaveBack: () => p.classList.remove("on"),
        });
      });

      // Fios que ligam uma seção à outra
      document.querySelectorAll("[data-thread]").forEach((t) => {
        gsap.to(t, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: t.parentElement, start: "bottom 92%", end: "bottom 55%", scrub: true },
        });
      });

      // Linha de luz no topo de cada divisão
      secs.forEach((s) => {
        ScrollTrigger.create({ trigger: s, start: "top 82%", once: true, onEnter: () => s.classList.add("in") });
      });

      // Barra de progresso da página
      gsap.to("[data-progress]", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    });

    // Holofote que segue o mouse dentro dos cards
    const onMove = (e) => {
      const c = e.target.closest && e.target.closest(".card");
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      clearTimeout(t);
      document.removeEventListener("pointermove", onMove);
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  return <div className="progress" data-progress aria-hidden="true" />;
}
