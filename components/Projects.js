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
    id: "valentim", href: "https://www.balneariovalentimm.com.br/", host: "balneariovalentimm.com.br",
    title: "Balneário Valentim",
    desc: "Turismo e natureza no Maranhão, com vídeos, avaliações do Google, mapa e valores.",
    chips: ["Vídeos", "Avaliações", "Mapa", "FAQ"],
  },
  {
    id: "nasa", href: "https://eletricadanasa.vercel.app/", host: "eletricadanasa.vercel.app",
    title: "Eletricista da NASA",
    desc: "Biblioteca técnica com catálogo por montadora, prévia dos materiais e compra por Pix.",
    chips: ["Catálogo", "Filtros", "Pix", "Minha biblioteca"],
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="sec acc-m">
      <div className="wrap">
        <h2 className="h2" data-split>Projetos que <span className="g">já entreguei</span></h2>
        <p className="sub rv">Sites reais, no ar. Passe o mouse (ou toque) na miniatura para ver a página rolando e clique para visitar.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="shot rv" aria-label={`Visitar ${p.title} (${p.host})`}>
              <div className="bar"><u /><u /><u /><em>{p.host}</em></div>
              <div className="scr">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/sites/${p.id}-laptop.jpg`} alt={`Captura de tela do site ${p.title}`}
                  width="1280" height="3022" loading="lazy" decoding="async" draggable="false"
                />
              </div>
              <div className="px-5 pb-5 pt-4">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="my-1 mb-2.5 text-sm text-mut">{p.desc}</p>
                <div className="chips flex flex-wrap gap-1.5">{p.chips.map((c) => <span key={c}>{c}</span>)}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
