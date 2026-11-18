const services = [
  ["01", "Feita para converter", "Cada bloco tem uma função: despertar interesse, provar e levar ao contato. O que não ajuda a vender fica de fora."],
  ["02", "Impacto na primeira tela", "Em segundos o visitante decide se fica. A primeira dobra mostra o que você faz e por que confiar em você."],
  ["03", "Pensada para o celular", "Quem chega pelo Instagram chega pelo celular. Eu projeto começando por ele e depois adapto para tablet e desktop."],
  ["04", "Contato em um toque", "O botão leva direto ao WhatsApp, com a mensagem pronta. Menos etapas no caminho, mais conversas começando."],
];

export default function Services() {
  return (
    <section id="servicos" className="sec acc-y bg-bg2">
      <div className="wrap">
        <h2 className="h2" data-split>Por que a sua marca <span className="g">precisa</span> de uma landing page?</h2>
        <p className="sub rv">Quem clica no seu perfil decide em segundos. Uma página focada guia o visitante até a ação que importa: o contato, o orçamento, a venda.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([n, t, d]) => (
            <div key={t} className="card rv">
              <span className="svc-n">{n}</span>
              <h3 className="mb-2 text-xl font-bold">{t}</h3>
              <p className="text-[15px] text-mut">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
