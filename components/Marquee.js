const words = [
  "Landing pages", "Conversão", "Animação cinematográfica", "100% responsivo",
  "WhatsApp", "Mobile first", "Design moderno", "Feito para o Instagram",
];

// Faixa de palavras em movimento: acabamento entre o hero e a primeira seção
export default function Marquee() {
  const row = (k) => words.map((w) => <span key={`${w}-${k}`} className="mq-i"><b />{w}</span>);
  return (
    <div className="mq" aria-hidden="true">
      <div className="mq-track">{row("a")}{row("b")}</div>
    </div>
  );
}
