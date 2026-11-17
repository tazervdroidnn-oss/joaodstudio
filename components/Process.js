const steps = [
  ["Conversa", "Entendo seu negócio, público e objetivo."],
  ["Design", "Crio a identidade visual com as cores e o estilo da sua marca."],
  ["Desenvolvimento", "Construo com animações, responsividade e velocidade."],
  ["Publicação", "Sua página vai ao ar pronta para receber tráfego."],
];

export default function Process() {
  return (
    <section id="processo" className="sec">
      <div className="wrap">
        <h2 className="h2 rv">Como <span className="g">funciona</span></h2>
        <p className="sub rv">Um processo simples, do primeiro contato até a página no ar.</p>
        <div className="steps grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d]) => (
            <div key={t} className="card rv">
              <h3 className="mb-2 text-xl font-bold">{t}</h3>
              <p className="text-[15px] text-mut">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
