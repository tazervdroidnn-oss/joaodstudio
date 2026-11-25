export default function Numbers() {
  return (
    <section id="numeros" className="sec acc-c bg-bg2">
      <div className="wrap grid items-center gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="rv">
          <div className="g font-display text-[clamp(80px,16vw,170px)] font-extrabold leading-none">
            <span data-count="45">0</span>
            <small className="text-[.4em]">+</small>
          </div>
          <h2 data-split className="text-[clamp(24px,4vw,36px)] font-extrabold">projetos entregues</h2>
          <p className="mt-4 max-w-[620px] text-mut">
            Pesca esportiva, pousadas, turismo e joias: negócios reais que já ganharam uma presença digital profissional.
          </p>
          <div className="mt-5 flex flex-wrap gap-8">
            <div className="g font-display text-3xl font-extrabold">100%<span className="block font-sans text-sm font-normal text-mut" style={{ WebkitTextFillColor: "var(--mut)" }}>Responsivos</span></div>
            <div className="g font-display text-3xl font-extrabold">Mobile first<span className="block font-sans text-sm font-normal text-mut" style={{ WebkitTextFillColor: "var(--mut)" }}>Feito para o Instagram</span></div>
          </div>
        </div>

        <div className="chart rv rounded-3xl border bg-card p-5" data-chart>
          <h3 className="mb-2 text-base font-semibold text-mut">Crescimento de projetos entregues</h3>
          <svg viewBox="0 0 520 260" className="block h-auto w-full" role="img" aria-label="Gráfico de crescimento até 45 projetos entregues">
            <defs>
              <linearGradient id="lg" x1="0" x2="1"><stop offset="0" stopColor="#00d4ff" /><stop offset="1" stopColor="#7c5cff" /></linearGradient>
              <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2b6cff" stopOpacity=".4" /><stop offset="1" stopColor="#2b6cff" stopOpacity="0" /></linearGradient>
            </defs>
            <g stroke="rgba(120,160,255,.15)">
              <line x1="40" x2="500" y1="40" y2="40" /><line x1="40" x2="500" y1="110" y2="110" />
              <line x1="40" x2="500" y1="180" y2="180" /><line x1="40" x2="500" y1="220" y2="220" />
            </g>
            <path className="ar" fill="url(#fg)" d="M40 220 C120 214 170 200 230 170 S350 100 420 70 S480 40 500 36 L500 220Z" />
            <path className="ln" pathLength="1000" fill="none" stroke="url(#lg)" strokeWidth="5" strokeLinecap="round" d="M40 220 C120 214 170 200 230 170 S350 100 420 70 S480 40 500 36" />
            <circle className="ar" cx="500" cy="36" r="8" fill="#00d4ff" />
            <text className="ar" x="440" y="26" style={{ fill: "#00d4ff", fontWeight: 700, fontSize: 16 }}>45 projetos</text>
            <text x="40" y="244">Início</text><text x="460" y="244">Hoje</text>
            <text x="8" y="44">45</text><text x="8" y="224">0</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
