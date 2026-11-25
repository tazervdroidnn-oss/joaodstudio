"use client";

import { useRef } from "react";
import { use3D } from "./use3D";

// Cores pela psicologia das cores (versões escuras para ler bem sobre o fundo claro):
// laranja = ação e urgência; azul = confiança e autoridade; vinho/magenta = desejo e valor.
const formats = [
  {
    n: "01", name: "Landing page", goal: "chamar você", color: "#c2410c",
    lead: "Transforma quem chega do Instagram ou de um anúncio em conversa no WhatsApp.",
    who: "Prestadores de serviço, clínicas, turismo, eventos e lançamentos.",
    has: "Primeira tela que vende, provas reais, perguntas frequentes e botão com mensagem pronta.",
    ex: { label: "Brasa Fish", href: "https://www.brasafish.com.br/" },
  },
  {
    n: "02", name: "Portfólio", goal: "confiar em você", color: "#1d4ed8",
    lead: "Mostra trabalhos reais e a sua história para o cliente confiar antes de pedir orçamento.",
    who: "Fotógrafos, arquitetos, designers, consultores e profissionais liberais.",
    has: "Galeria de projetos, apresentação pessoal, depoimentos e contato em destaque.",
    ex: { label: "este site", href: "#projetos" },
  },
  {
    n: "03", name: "Vitrine digital", goal: "escolher um produto", color: "#be185d",
    lead: "Organiza seus produtos por categoria e leva o pedido pronto para o WhatsApp.",
    who: "Joias, moda, artesanato, cardápios, catálogos e produtos digitais.",
    has: "Catálogo com filtros, fotos em destaque, carrinho e pedido direto pelo WhatsApp.",
    ex: { label: "Meteoro Joias", href: "https://www.meteorojoias.com.br/" },
  },
];

export default function Services() {
  const root = useRef(null);
  use3D(root, ".fm-card", { rotationX: 62, z: -220, y: 120 });

  return (
    <section id="servicos" className="sec band-l" ref={root}>
      <div className="wrap">
        <span className="kicker rv">Formatos</span>
        <h2 className="h2" data-split>Três formatos. Cada um resolve <span className="g">um problema diferente</span>.</h2>
        <p className="sub rv">O formato certo depende do que o seu cliente precisa fazer quando chega: chamar, confiar ou escolher. Eu indico qual depois de entender o seu negócio.</p>
        <div className="fm-grid grid gap-6 lg:grid-cols-3">
          {formats.map((f) => (
            <article key={f.name} className="fm-card fx-card" style={{ "--fc": f.color }}>
              <div className="fm-top">
                <span className="fm-n">{f.n}</span>
                <span className="fm-goal">Para o cliente <b>{f.goal}</b></span>
              </div>
              <h3 className="fm-name">{f.name}</h3>
              <p className="fm-lead fx-in">{f.lead}</p>
              <dl className="fm-dl fx-in">
                <dt>Para quem</dt><dd>{f.who}</dd>
                <dt>O que tem</dt><dd>{f.has}</dd>
              </dl>
              <a className="fm-ex fx-in" href={f.ex.href} {...(f.ex.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                Exemplo no ar: {f.ex.label} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
