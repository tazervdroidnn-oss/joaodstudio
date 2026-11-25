"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import WaIcon from "./WaIcon";
import { waLink } from "./config";
import { use3D } from "./use3D";
import { KEYWORDS } from "./Seo";

// ------------------------------------------------------------
// Perguntas do briefing. Cada resposta soma pontos para um formato:
// L = landing page, P = portfólio, V = vitrine digital.
// ------------------------------------------------------------
const QUESTIONS = [
  {
    id: "nicho",
    title: "Qual é o seu negócio?",
    options: [
      { v: "servico", label: "Presto serviços", hint: "Eletricista, clínica, consultoria, estética", pts: { L: 2 } },
      { v: "loja", label: "Vendo produtos", hint: "Joias, moda, artesanato, comida", pts: { V: 2 } },
      { v: "turismo", label: "Turismo e experiências", hint: "Pousada, passeio, balneário, eventos", pts: { L: 2 } },
      { v: "criativo", label: "Trabalho criativo ou autoral", hint: "Fotografia, arquitetura, design, música", pts: { P: 3 } },
      { v: "digital", label: "Produto digital", hint: "Curso, e-book, mentoria, material técnico", pts: { L: 1, V: 1 } },
    ],
  },
  {
    id: "acao",
    title: "Quando o cliente entra no site, o que ele precisa fazer?",
    options: [
      { v: "chamar", label: "Chamar no WhatsApp ou pedir orçamento", pts: { L: 3 } },
      { v: "reservar", label: "Reservar ou agendar", pts: { L: 3 } },
      { v: "confiar", label: "Ver meus trabalhos e confiar em mim", pts: { P: 3 } },
      { v: "escolher", label: "Ver os produtos e escolher", pts: { V: 3 } },
      { v: "comprar", label: "Comprar direto", pts: { V: 2, L: 1 } },
    ],
  },
  {
    id: "itens",
    title: "Quantos produtos ou serviços você quer mostrar?",
    options: [
      { v: "poucos", label: "De 1 a 3", hint: "Uma oferta principal", pts: { L: 2 } },
      { v: "medio", label: "De 4 a 15", hint: "Algumas opções para comparar", pts: { P: 1, V: 1 } },
      { v: "muitos", label: "Mais de 15", hint: "Um catálogo de verdade", pts: { V: 3 } },
    ],
  },
  {
    id: "hoje",
    title: "Como os clientes chegam até você hoje?",
    options: [
      { v: "insta", label: "Pelo Instagram e pelo WhatsApp", pts: {} },
      { v: "site", label: "Tenho site, mas ele não traz contatos", pts: {} },
      { v: "indicacao", label: "Principalmente por indicação", pts: { P: 1 } },
      { v: "anuncio", label: "Por anúncios pagos", pts: { L: 1 } },
      { v: "zero", label: "Ainda estou começando", pts: {} },
    ],
  },
];

const FORMATS = {
  L: {
    name: "Landing page", color: "#ff8a3d",
    why: "Uma página única, com um só objetivo, leva o visitante direto até a conversa. Sem menus que distraem e sem caminhos que dispersam.",
  },
  P: {
    name: "Portfólio", color: "#6d8bff",
    why: "O seu cliente compra confiança. Ele precisa ver trabalhos reais, entender o seu processo e reconhecer a sua assinatura antes de pedir orçamento.",
  },
  V: {
    name: "Vitrine digital", color: "#f0457f",
    why: "Com vários produtos, o cliente precisa comparar e escolher sozinho. O catálogo organiza a escolha e o pedido já chega pronto no WhatsApp.",
  },
};

// Estrutura sugerida (ordem das seções)
const STRUCTURE = {
  L: {
    base: ["Primeira tela com a promessa e o botão do WhatsApp", "Provas reais: fotos, números e depoimentos", "Como funciona, em três passos", "Perguntas frequentes que tiram as objeções", "Chamada final com mensagem pronta"],
    turismo: ["Primeira tela com vídeo do lugar e botão de reserva", "Galeria e o que a experiência inclui", "Avaliações do Google", "Valores, horários e mapa de como chegar", "Perguntas frequentes e reserva pelo WhatsApp"],
    servico: ["Primeira tela com o serviço, a região atendida e o botão de orçamento", "Fotos de trabalhos feitos e depoimentos", "Serviços em cards curtos", "Como funciona o atendimento", "Perguntas frequentes e orçamento pelo WhatsApp"],
    digital: ["Primeira tela com a transformação que o material entrega", "O que a pessoa recebe, item por item", "Prévia do conteúdo", "Quem está por trás e por que confiar", "Garantia, pagamento por Pix e acesso"],
  },
  P: {
    base: ["Apresentação com foto e a sua especialidade em uma frase", "Projetos selecionados, com contexto e resultado", "O seu processo de trabalho", "Depoimentos de clientes", "Contato para orçamento pelo WhatsApp"],
  },
  V: {
    base: ["Destaques e lançamentos na primeira tela", "Catálogo com filtros por categoria", "Produto com fotos grandes e detalhes", "Carrinho com pedido pronto no WhatsApp", "Entrega, trocas e formas de pagamento"],
    digital: ["Destaques na primeira tela", "Catálogo com busca e filtros", "Prévia de cada material", "Compra por Pix com acesso imediato", "Área com os materiais já comprados"],
  },
};

// Paleta pela psicologia das cores, por tipo de negócio
const PALETTES = {
  servico: { colors: ["#1d4ed8", "#facc15", "#0b1220"], text: "Azul transmite confiança e competência. O amarelo, usado só no botão, chama o olhar para o pedido de orçamento." },
  loja: { colors: ["#111111", "#c9a24a", "#7f1d3a"], text: "Preto e dourado comunicam valor e exclusividade. O vinho desperta desejo sem parecer promoção." },
  turismo: { colors: ["#15803d", "#0891b2", "#efe4cf"], text: "Verde e azul lembram natureza, água e descanso. O tom areia traz acolhimento e deixa as fotos respirarem." },
  criativo: { colors: ["#111111", "#f5f2ea", "#e4572e"], text: "Fundo neutro deixa o seu trabalho ser o protagonista. Uma única cor de assinatura marca a sua identidade." },
  digital: { colors: ["#6d28d9", "#f97316", "#0f0a1f"], text: "Violeta comunica conhecimento e transformação. O laranja dá energia e urgência ao botão de compra." },
};

const ATTENTION = {
  insta: "Hoje o cliente decide no direct. A página precisa responder às dúvidas antes da conversa, para o WhatsApp receber pedidos e não perguntas.",
  site: "Quando um site não traz contatos, o problema costuma estar na primeira tela e no caminho até o botão. É por aí que vamos começar.",
  indicacao: "Indicação traz confiança, mas não escala. A página vira o lugar para onde você manda quem ouviu falar de você, e ela precisa confirmar essa boa impressão.",
  anuncio: "Com anúncio, cada clique custa. A página precisa ter um único objetivo e carregar rápido para não desperdiçar verba.",
  zero: "Começar com uma página bem estruturada evita refazer depois. O foco é o essencial que já gera contato.",
};

const ACTION_CTA = {
  chamar: "Botão principal: WhatsApp com mensagem pronta",
  reservar: "Botão principal: reservar pelo WhatsApp com data",
  confiar: "Botão principal: pedir orçamento",
  escolher: "Botão principal: adicionar ao pedido",
  comprar: "Botão principal: comprar agora",
};

const WANT = {
  chamar: "chame no WhatsApp ou peça um orçamento",
  reservar: "reserve ou agende",
  confiar: "veja os seus trabalhos e confie em você",
  escolher: "veja os produtos e escolha",
  comprar: "compre direto",
};
const ITEMS = { poucos: "uma oferta principal (de 1 a 3 itens)", medio: "de 4 a 15 itens", muitos: "mais de 15 itens" };

const opt = (qid, v) => QUESTIONS.find((q) => q.id === qid).options.find((o) => o.v === v);

function diagnose(a) {
  const score = { L: 0, P: 0, V: 0 };
  QUESTIONS.forEach((q) => {
    const pts = opt(q.id, a[q.id])?.pts || {};
    Object.entries(pts).forEach(([k, n]) => { score[k] += n; });
  });
  // Empate: vale o que o cliente precisa fazer (pergunta 2)
  const pref = { chamar: "L", reservar: "L", confiar: "P", escolher: "V", comprar: "V" }[a.acao];
  const key = Object.keys(score).sort((x, y) => score[y] - score[x] || (y === pref) - (x === pref))[0];
  const s = STRUCTURE[key];
  return {
    key, format: FORMATS[key],
    structure: s[a.nicho] || s.base,
    palette: PALETTES[a.nicho],
    attention: ATTENTION[a.hoje],
    cta: ACTION_CTA[a.acao],
    summary: `Você quer que o cliente ${WANT[a.acao]} e vai mostrar ${ITEMS[a.itens]}.`,
  };
}

export default function Briefing() {
  const root = useRef(null);
  const stage = useRef(null);
  const dir = useRef(1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [name, setName] = useState("");

  use3D(root, ".dg-panel", { rotationX: 38, z: -260, y: 90, origin: "50% 0%", tilt: false });

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];
  const result = useMemo(() => (done ? diagnose(answers) : null), [done, answers]);

  // Troca de pergunta: a nova entra girando de leve no eixo Y
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const title = el.querySelector("[data-focus]");
    if (title && step > 0) title.focus({ preventScroll: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (done) {
      gsap.fromTo(el.querySelectorAll(".dg-r"), { opacity: 0, y: 28, rotationX: -24, transformPerspective: 900 },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: "power3.out", stagger: 0.09 });
    } else if (step > 0 || dir.current < 0) {
      gsap.fromTo(el, { opacity: 0, x: 46 * dir.current, rotationY: 14 * dir.current, transformPerspective: 1100 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.7, ease: "power3.out" });
    }
  }, [step, done]);

  const go = (d) => { dir.current = d; setStep((s) => Math.max(0, s + d)); };
  const restart = () => { dir.current = -1; setAnswers({}); setStep(0); };

  const message = result ? [
    "Olá João! Fiz o diagnóstico no seu site.",
    `Negócio: ${name.trim() || "(não informado)"} · ${opt("nicho", answers.nicho).label}`,
    `Objetivo: ${opt("acao", answers.acao).label}`,
    `Produtos ou serviços: ${opt("itens", answers.itens).label}`,
    `Hoje: ${opt("hoje", answers.hoje).label}`,
    `Formato indicado: ${result.format.name}`,
    "Quero conversar sobre o meu site.",
  ].join("\n") : "";

  return (
    <section id="diagnostico" className="sec acc-v" ref={root}>
      <div className="wrap">
        <div className="dg-head">
          <span className="kicker rv">Briefing e diagnóstico</span>
          <h2 className="h2" data-split>Descubra o site que o seu negócio <span className="g">precisa</span></h2>
          <p className="sub rv">Quatro perguntas, menos de um minuto. Você recebe o formato indicado, a estrutura da página, as cores e as palavras-chave para o Google.</p>
        </div>

        <div className="dg-panel">
          <div className="dg-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.min(step, QUESTIONS.length) / QUESTIONS.length})` }} /></div>

          <div ref={stage} className="dg-stage">
            {!done ? (
              <fieldset key={q.id} className="dg-q">
                <legend>
                  <span className="dg-count">Pergunta {step + 1} de {QUESTIONS.length}</span>
                  <h3 className="dg-title" tabIndex={-1} data-focus>{q.title}</h3>
                </legend>
                <div className="dg-opts">
                  {q.options.map((o) => (
                    <label key={o.v} className="dg-opt">
                      <input
                        type="radio" name={q.id} value={o.v}
                        checked={answers[q.id] === o.v}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.v }))}
                      />
                      <span className="dg-dot" aria-hidden="true" />
                      <span className="dg-txt"><b>{o.label}</b>{o.hint && <small>{o.hint}</small>}</span>
                    </label>
                  ))}
                </div>
                <div className="dg-nav">
                  <button type="button" className="dg-back" onClick={() => go(-1)} disabled={step === 0}>Voltar</button>
                  <button type="button" className="btn" onClick={() => go(1)} disabled={!answers[q.id]}>
                    {step === QUESTIONS.length - 1 ? "Ver meu diagnóstico" : "Próxima"}
                  </button>
                </div>
              </fieldset>
            ) : (
              <div className="dg-result" style={{ "--fc": result.format.color }}>
                <div className="dg-r dg-verdict">
                  <span className="dg-count">Seu diagnóstico</span>
                  <h3 className="dg-title" tabIndex={-1} data-focus>Formato indicado: <span className="dg-format">{result.format.name}</span></h3>
                  <p className="text-mut">{result.summary} {result.format.why}</p>
                </div>

                <div className="dg-cols">
                  <div className="dg-r dg-box">
                    <h4>Estrutura da página</h4>
                    <ol className="dg-list">{result.structure.map((s) => <li key={s}>{s}</li>)}</ol>
                    <p className="dg-cta">{result.cta}</p>
                  </div>
                  <div className="dg-r dg-box">
                    <h4>Cores que combinam com o seu público</h4>
                    <div className="dg-swatches" aria-hidden="true">
                      {result.palette.colors.map((c) => <span key={c} style={{ background: c }} />)}
                    </div>
                    <p className="text-mut">{result.palette.text}</p>
                    <h4 className="mt-5">Primeiro ponto de atenção</h4>
                    <p className="text-mut">{result.attention}</p>
                    <h4 className="mt-5">Palavras-chave para começar no Google</h4>
                    <ul className="dg-kw">{KEYWORDS[answers.nicho].map((w) => <li key={w}>{w}</li>)}</ul>
                  </div>
                </div>

                <div className="dg-r dg-send">
                  <label className="dg-name">
                    <span>Nome do seu negócio (opcional)</span>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Studio Ana Lima" maxLength={60} autoComplete="organization" />
                  </label>
                  <div className="dg-nav">
                    <button type="button" className="dg-back" onClick={restart}>Refazer</button>
                    <a className="btn btn-w" href={waLink(message)} target="_blank" rel="noopener noreferrer">
                      <WaIcon /> Enviar diagnóstico no WhatsApp
                    </a>
                  </div>
                  <small className="dg-note">Você revisa a mensagem antes de enviar. Nada é salvo neste site.</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
