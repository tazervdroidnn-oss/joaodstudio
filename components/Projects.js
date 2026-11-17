const Cs = ({ items }) => (
  <div className="cs">
    {items.map(([a, b]) => (
      <div key={a}>{a}<b>{b}</b></div>
    ))}
  </div>
);

const projects = [
  {
    href: "https://www.brasafish.com.br/", host: "brasafish.com.br", theme: "t1",
    title: "Brasa Fish",
    desc: "Pesca esportiva no Lago do Manso, com frota, pacotes, galerias e reservas pelo WhatsApp.",
    chips: ["Vídeo hero", "Frota", "Pacotes", "WhatsApp"],
    screen: (
      <>
        <div className="mn">BRASA FISH<span>Sobre · Day Use · Barcos</span></div>
        <div className="hr"><h4>NÃO É SÓ PESCARIA<br />É HISTÓRIA</h4><p>Embarcações equipadas e experiências reais no Lago do Manso — MT.</p><span className="pill">QUERO VIVER ESSA EXPERIÊNCIA</span></div>
        <div className="wv" />
        <Cs items={[["Alumínio", "R$ 1.300"], ["Storm 170", "R$ 1.500"], ["Storm 3 pesc.", "R$ 1.800"]]} />
        <Cs items={[["Guia", "Incluso"], ["Combustível", "Incluso"], ["Almoço", "Incluso"]]} />
      </>
    ),
  },
  {
    href: "https://www.meteorojoias.com.br/", host: "meteorojoias.com.br", theme: "t2",
    title: "Meteoro Joias & Acessórios",
    desc: "Vitrine de joias com filtros por categoria, carrinho e pedido direto pelo WhatsApp.",
    chips: ["Vitrine", "Carrinho", "Animação de scroll", "Mapa"],
    screen: (
      <>
        <div className="mn" style={{ color: "#d4af37" }}>METEORO<span>Vitrine · Alianças · Coleções</span></div>
        <div className="hr"><div className="ring" /><h4>SUA PRESENÇA.<br />SUA ASSINATURA.</h4><p>Alianças, anéis, correntes e colares com atendimento pelo WhatsApp.</p><span className="pill">EXPLORAR A VITRINE</span></div>
        <Cs items={[["Anel Soberano", "Noir"], ["Corrente Cruz", "R$ 220"], ["Alianças Laço", "R$ 250"]]} />
        <Cs items={[["Pulseira Elos", "R$ 90"], ["Colar Asas", "R$ 160"], ["Brincos", "R$ 50"]]} />
      </>
    ),
  },
  {
    href: "https://www.balneariovalentimm.com.br/", host: "balneariovalentimm.com.br", theme: "t3",
    title: "Balneário Valentim",
    desc: "Turismo e natureza no Maranhão, com vídeos, avaliações do Google, mapa e valores.",
    chips: ["Vídeos", "Avaliações", "Mapa", "FAQ"],
    screen: (
      <>
        <div className="hero2"><div className="mn" style={{ padding: "0 0 14px" }}>BALNEÁRIO VALENTIM</div><h4>Seu refúgio perfeito<br />em meio à natureza.</h4><p>Águas cristalinas em Açailândia, Maranhão.</p><span className="pill">PLANEJAR MINHA VISITA</span></div>
        <Cs items={[["Passar o dia", "R$ 25"], ["Camping", "R$ 75"], ["Avaliações", "4,5 ★"]]} />
        <Cs items={[["Restaurante", "No local"], ["Como chegar", "Mapa"], ["FAQ", "Dúvidas"]]} />
      </>
    ),
  },
  {
    href: "https://eletricadanasa.vercel.app/", host: "eletricadanasa.vercel.app", theme: "t4",
    title: "Eletricista da NASA",
    desc: "Biblioteca técnica com catálogo por montadora, prévia dos materiais e compra por Pix.",
    chips: ["Catálogo", "Filtros", "Pix", "Minha biblioteca"],
    screen: (
      <>
        <div className="mn">ELETRICISTA DA NASA<span>Biblioteca · Como funciona</span></div>
        <div className="hr"><h4>CONHECIMENTO TÉCNICO<br />PARA IR MAIS LONGE.</h4><p>Biblioteca digital de esquemas elétricos e diagramas de autoelétrica.</p><span className="pill">EXPLORAR A BIBLIOTECA</span></div>
        <Cs items={[["Volkswagen", "16 materiais"], ["MAN", "1 material"], ["13 marcas", "Acervo"]]} />
        <div className="lib">
          {["ELE-01|VW 8.120", "ELE-05|Meteor", "PNE-01|Meteor", "ELE-02|Delivery", "PNE-06|Worker", "LOG-01|Unid. Lógica"].map((t) => {
            const [a, b] = t.split("|");
            return <div key={a}>{a}<br />{b}</div>;
          })}
        </div>
      </>
    ),
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="sec">
      <div className="wrap">
        <h2 className="h2 rv">Projetos que <span className="g">já entreguei</span></h2>
        <p className="sub rv">Sites reais, no ar. Passe o mouse (ou toque) na miniatura para ver a página rolando e clique para visitar.</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="shot rv">
              <div className="bar"><u /><u /><u /><em>{p.host}</em></div>
              <div className={`scr ${p.theme}`}><div className="pg">{p.screen}</div></div>
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
