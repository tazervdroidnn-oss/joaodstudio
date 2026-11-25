"use client";

import { useEffect, useRef, useState } from "react";
import { use3D } from "./use3D";

// Pesquisas de exemplo: a barra digita a busca e o resultado mostra como o site do cliente aparece.
const SEARCHES = [
  { q: "eletricista 24 horas em imperatriz", url: "eletricistaimperatriz.com.br", title: "Eletricista 24 horas em Imperatriz | Orçamento pelo WhatsApp", desc: "Instalações, reparos e quadros de energia com atendimento no mesmo dia. Veja serviços, fotos de trabalhos e peça seu orçamento." },
  { q: "pousada com piscina no maranhão", url: "balneario.com.br", title: "Balneário com piscina natural no Maranhão | Reserve seu dia", desc: "Águas cristalinas, restaurante e área para família. Veja fotos, valores, avaliações e como chegar. Reservas pelo WhatsApp." },
  { q: "joias banhadas a ouro 18k", url: "suajoalheria.com.br", title: "Joias banhadas a ouro 18k | Colares, brincos e anéis", desc: "Peças com garantia, novidades toda semana e pedido direto pelo WhatsApp. Escolha por categoria e receba em casa." },
  { q: "fotógrafo de casamento em são luís", url: "seunome.com.br", title: "Fotógrafo de casamento em São Luís | Portfólio e pacotes", desc: "Casamentos contados com naturalidade e emoção. Veja histórias reais, depoimentos de noivos e solicite seu orçamento." },
];

const STEPS = [
  ["As palavras que o seu cliente pesquisa", "nos títulos e nos textos da página"],
  ["Título e resumo que geram clique", "o texto azul e a descrição que aparecem no Google"],
  ["Rápido no celular e na sua cidade", "página leve e região atendida, pronta para o Google Maps"],
];

export const KEYWORDS = {
  servico: ["eletricista 24 horas em [sua cidade]", "clínica de estética perto de mim", "orçamento de instalação elétrica", "conserto de ar-condicionado em [bairro]"],
  loja: ["joias banhadas a ouro 18k", "loja de acessórios femininos em [sua cidade]", "presente para namorada", "colar de prata com pingente"],
  turismo: ["balneário com piscina natural no Maranhão", "pousada para fim de semana perto de [sua cidade]", "passeio de pesca esportiva", "day use com almoço"],
  criativo: ["fotógrafo de casamento em [sua cidade]", "arquiteto de interiores para apartamento", "designer de logotipo", "ensaio fotográfico gestante"],
  digital: ["curso de elétrica automotiva", "diagrama elétrico de carro pdf", "apostila de injeção eletrônica", "curso online com certificado"],
};

export default function Seo() {
  const root = useRef(null);
  const mock = useRef(null);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(SEARCHES[0].q);
  const [show, setShow] = useState(true);

  use3D(root, ".seo-mock", { rotationX: 32, z: -240, y: 90, origin: "50% 100%", tilt: false });

  // Digita a pesquisa, mostra o resultado e passa para a próxima (só enquanto está na tela)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false, timer, idx = 0;
    const wait = (ms) => new Promise((r) => { timer = setTimeout(r, ms); });
    let alive = true;
    const loop = async () => {
      while (alive) {
        if (!visible) { await wait(400); continue; }
        const s = SEARCHES[idx];
        setShow(false);
        await wait(450); // o resultado anterior some antes de trocar o conteúdo
        setI(idx);
        for (let n = 0; n <= s.q.length && alive; n++) { setTyped(s.q.slice(0, n)); await wait(55); }
        await wait(350); setShow(true);
        await wait(3600);
        idx = (idx + 1) % SEARCHES.length;
      }
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    if (mock.current) io.observe(mock.current);
    loop();
    return () => { alive = false; clearTimeout(timer); io.disconnect(); };
  }, []);

  const r = SEARCHES[i];

  return (
    <section id="seo" className="sec acc-c" ref={root}>
      <div className="wrap">
        <span className="kicker rv">SEO · Google</span>
        <h2 className="h2" data-split>Seu cliente pesquisa no Google. Seu site precisa <span className="g">aparecer</span>.</h2>
        <div className="seo-top">
          <div className="seo-mock" ref={mock} aria-hidden="true">
            <div className="seo-search">
              <span className="seo-g"><b style={{ color: "#4285f4" }}>G</b><b style={{ color: "#ea4335" }}>o</b><b style={{ color: "#fbbc05" }}>o</b><b style={{ color: "#4285f4" }}>g</b><b style={{ color: "#34a853" }}>l</b><b style={{ color: "#ea4335" }}>e</b></span>
              <span className="seo-q">{typed}<i className="seo-caret" /></span>
            </div>
            <div className={`seo-res${show ? " on" : ""}`}>
              <span className="seo-url"><i />{r.url}</span>
              <span className="seo-title">{r.title}</span>
              <span className="seo-desc">{r.desc}</span>
            </div>
            <div className="seo-ghost"><i /><i /><i /></div>
          </div>

          <div className="seo-explain rv">
            <p>SEO são os ajustes que ajudam o Google a mostrar o seu site para quem procura o que você vende. Toda página que eu entrego já sai com essa base:</p>
            <ul className="seo-list">
              {STEPS.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}
            </ul>
            <p className="seo-honest">É trabalho de médio prazo: o Google leva algumas semanas para conhecer uma página nova. No diagnóstico você já recebe as palavras-chave para começar.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
