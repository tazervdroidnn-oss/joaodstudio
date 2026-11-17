const services = [
  ["🎯", "Foco em conversão", "Estrutura persuasiva com títulos, provas e chamadas claras para a ação."],
  ["🎬", "Visual cinematográfico", "Animações suaves e identidade forte que causam impacto na primeira dobra."],
  ["📱", "Responsiva de verdade", "Perfeita no celular, tablet e desktop, onde seu público realmente está."],
  ["💬", "Direto no WhatsApp", "Botões que levam o cliente à conversa, com mensagem pronta para o pedido."],
];

export default function Services() {
  return (
    <section id="servicos" className="sec bg-bg2">
      <div className="wrap">
        <h2 className="h2 rv">Por que a sua marca <span className="g">precisa</span> de uma landing page?</h2>
        <p className="sub rv">Quem clica no seu perfil decide em segundos. Uma página focada guia o visitante até a ação que importa: o contato, o orçamento, a venda.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([icon, t, d]) => (
            <div key={t} className="card rv">
              <span className="mb-3.5 block text-3xl">{icon}</span>
              <h3 className="mb-2 text-xl font-bold">{t}</h3>
              <p className="text-[15px] text-mut">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
