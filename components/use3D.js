"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Entrada cinematográfica em 3D para cards de uma seção + inclinação leve no hover.
// Os cards começam deitados/afastados no espaço e se levantam em cascata ao rolar.
// Elementos internos com .fx-in entram depois, em sequência.
export function use3D(ref, selector, from = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const small = window.matchMedia("(max-width: 767px)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const k = small ? 0.5 : 1; // no celular o giro é menor
    const { rotationX = 0, rotationY = 0, z = 0, x = 0, y = 80, origin = "50% 100%", stagger = 0.16, tilt = true } = from;
    const cleanups = [];

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(selector, root);

      cards.forEach((card) => {
        gsap.set(card, {
          opacity: 0, transformPerspective: 1400, transformOrigin: origin,
          rotationX: rotationX * k, rotationY: rotationY * k, z: z * k, x: x * k, y: y * k,
        });
        gsap.set(card.querySelectorAll(".fx-in"), { opacity: 0, y: 16 });
      });

      ScrollTrigger.batch(cards, {
        start: small ? "top 92%" : "top 85%",
        once: true,
        interval: 0.12,
        onEnter: (batch) => batch.forEach((card, i) => {
          const tl = gsap.timeline({ delay: i * stagger });
          tl.to(card, { opacity: 1, rotationX: 0, rotationY: 0, z: 0, x: 0, y: 0, duration: 1.5, ease: "expo.out" })
            .to(card.querySelectorAll(".fx-in"), { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.45)
            .add(() => card.classList.add("fx-done"));
        }),
      });

      if (canHover && tilt) {
        cards.forEach((card) => {
          const rx = gsap.quickTo(card, "rotationX", { duration: 0.8, ease: "power3.out" });
          const ry = gsap.quickTo(card, "rotationY", { duration: 0.8, ease: "power3.out" });
          const move = (e) => {
            if (!card.classList.contains("fx-done")) return;
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
            card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
            ry((px - 0.5) * 6);
            rx((0.5 - py) * 5);
          };
          const leave = () => { if (card.classList.contains("fx-done")) { rx(0); ry(0); } };
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          });
        });
      }
    }, root);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, [ref, selector]); // eslint-disable-line react-hooks/exhaustive-deps
}
