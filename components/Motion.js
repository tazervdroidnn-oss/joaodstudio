"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Motion() {
  useEffect(() => {
    const counter = document.querySelector("[data-count]");
    const chart = document.querySelector("[data-chart]");
    const target = Number(counter?.dataset.count || 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (counter) counter.textContent = target;
      chart?.classList.add("on");
      return;
    }

    let tiltX, tiltY;
    const ctx = gsap.context(() => {
      // Entrada do hero (sem intro): texto em cascata e retrato surgindo do desfoque
      gsap.from(".hero-i", { y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.1 });
      gsap.from("[data-art]", { scale: 0.84, opacity: 0, filter: "blur(16px)", duration: 1.8, ease: "power3.out", delay: 0.2, clearProps: "filter" });

      // Retrato inclina de leve seguindo o mouse (só em dispositivos com mouse)
      if (window.matchMedia("(hover: hover)").matches) {
        const tilt = document.querySelector("[data-tilt]");
        if (tilt) {
          gsap.set(tilt, { transformPerspective: 900 });
          tiltX = gsap.quickTo(tilt, "rotationY", { duration: 0.9, ease: "power3.out" });
          tiltY = gsap.quickTo(tilt, "rotationX", { duration: 0.9, ease: "power3.out" });
        }
      }

      // Parallax do hero
      gsap.to("[data-hero]", {
        y: -90, opacity: 0.2, ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });

      // Revelar elementos ao rolar
      gsap.set(".rv", { opacity: 0, y: 50, scale: 0.97 });
      ScrollTrigger.batch(".rv", {
        start: "top 88%", once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.1, ease: "power3.out", overwrite: true }),
      });

      // Contador 0 → 45 + desenho do gráfico
      const obj = { n: 0 };
      ScrollTrigger.create({
        trigger: "#numeros", start: "top 65%", once: true,
        onEnter: () => {
          chart?.classList.add("on");
          gsap.to(obj, { n: target, duration: 2.2, ease: "power3.out", onUpdate: () => { if (counter) counter.textContent = Math.round(obj.n); } });
        },
      });
    });

    // Orbes seguem o mouse
    const orbs = [...document.querySelectorAll(".orb")];
    const move = (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      orbs.forEach((o, i) => { o.style.translate = `${x * 40 * (i + 1)}px ${y * 40 * (i + 1)}px`; });
      if (tiltX) { tiltX(x * 16); tiltY(-y * 16); }
    };
    window.addEventListener("mousemove", move);

    return () => { window.removeEventListener("mousemove", move); ctx.revert(); };
  }, []);

  return null;
}
