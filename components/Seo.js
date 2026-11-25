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
  ["Palavras que o seu cliente usa", "Descubro como as pessoas pesquisam o que você vende e coloco essas palavras nos títulos e nos textos da página."],
  ["Título e resumo que geram clique", "Escrevo o título azul e a descrição que aparecem no Google, pensados para a pessoa escolher o seu site entre os outros."],
  ["Busca local", "Cidade, bairro e região atendida aparecem no site, e eu oriento a ligação com o Perfil da Empresa no Google, o que aparece no Maps."],
  ["Rápido no celular", "O Google dá preferência a páginas leves, que abrem rápido e funcionam bem no celular. Toda página já nasce assim."],
  ["Código que o Google entende", "Títulos em ordem, imagens com descrição e os dados da empresa marcados no código, para o Google saber quem você é e onde atende."],
  ["Prévia bonita ao compartilhar", "Quando o link é enviado no WhatsApp ou no Instagram, aparece com foto, título e descrição, e não um endereço solto."],
];

export const KEYWORDS = {
  servico: ["eletricista 24 horas em [sua cidade]", "clínica de estética perto de mim", "orçamento de instalação elétrica", "conserto de ar-condicionado em [bairro]"],
  loja: ["joias banhadas a ouro 18k", "loja de acessórios femininos em [sua cidade]", "presente para namorada", "colar de prata com pingente"],
  turismo: ["balneário com piscina natural no Maranhão", "pousada para fim de semana perto de [sua cidade]", "passeio de pesca esportiva", "day use com almoço"],
  criativo: ["fotógrafo de casamento em [sua cidade]", "arquiteto de interiores para apartamento", "designer de logotipo", "ensaio fotográfico gestante"],
  digital: ["curso de elétrica automotiva", "diagrama elétrico de carro pdf", "apostila de injeção eletrônica", "curso online com certificado"],
};

const GROUPS = [
  ["Serviços", "servico"], ["Lojas e vitrines", "loja"], ["Turismo", "turismo"], ["Criativos", "criativo"], ["Produtos digitais", "digital"],
];

export default function Seo() {
  const root = useRef(null);
  const mock = useRef(null);
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(SEARCHES[0].q);
  const [show, setShow] = useState(true);

  use3D(root, ".seo-mock", { rotationX: 32, z: -240, y: 90, origin: "50% 100%", tilt: false });
  use3D(root, ".seo-step", { rotationX: 48, y: 60, stagger: 0.1 });

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
        <p className="sub rv">SEO são os ajustes que ajudam o Google a entender o que você faz e onde você atende, para o seu site aparecer quando alguém procura por isso. Toda página que eu entrego já sai com essa base pronta.</p>

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
            <h3>Como funciona, em palavras simples</h3>
            <p>Quando alguém digita uma pesquisa, o Google procura as páginas que melhor respondem àquela frase. Se o seu site usa as mesmas palavras que o seu cliente, carrega rápido e mostra onde você atende, ele tem mais chance de aparecer.</p>
            <p><b>Palavra-chave</b> é a frase que a pessoa digita. As curtas, como &quot;joias&quot;, têm muita concorrência. As específicas, com cidade ou detalhe, como &quot;joias banhadas a ouro em Imperatriz&quot;, trazem quem já está pronto para comprar.</p>
            <p className="seo-honest">SEO é trabalho de médio prazo: o Google leva algumas semanas para conhecer e posicionar uma página nova. Por isso ela já nasce preparada.</p>
          </div>
        </div>

        <h3 className="seo-h3 rv">O que eu faço em cada página</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([t, d], n) => (
            <div key={t} className="seo-step fx-card">
              <span className="seo-n">{String(n + 1).padStart(2, "0")}</span>
              <h4>{t}</h4>
              <p className="fx-in">{d}</p>
            </div>
          ))}
        </div>

        <h3 className="seo-h3 rv">Exemplos de palavras-chave por tipo de negócio</h3>
        <div className="seo-kw rv">
          {GROUPS.map(([label, k]) => (
            <div key={k} className="seo-kw-row">
              <span className="seo-kw-label">{label}</span>
              <ul>{KEYWORDS[k].map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          ))}
          <p className="seo-kw-note">No diagnóstico eu levanto as palavras certas para o seu negócio e a sua cidade.</p>
        </div>
      </div>
    </section>
  );
}
