# CONTEXTO DO PROJETO — João D Studio

Última atualização: 17/11/2026

## Resumo
Site/portfólio de landing pages do João. Foco em design moderno, animações cinematográficas e conversão pelo WhatsApp.

## Links
- GitHub: https://github.com/tazervdroidnn-oss/joaodstudio (privado)
- Vercel: https://vercel.com/joao-0be3/joaodstudio
- Site: https://joaodstudio.vercel.app
- Branch principal: main (cada push na main publica na Vercel)

## Stack
Next.js 15 (App Router), React 19, Tailwind CSS 3.4, GSAP 3 (ScrollTrigger). JavaScript (sem TypeScript).

## Pastas no computador do João (Windows, PowerShell)
- Projeto: C:\sites\joaodstudio
- Comandos úteis: C:\sites\comandos-joaodstudio (repositório separado, só documentação)
- Rascunho antigo em HTML: C:\Users\joaoc\OneDrive\Desktop\sitesjoaodstudio\joaodstudio.html
- No PowerShell use npm.cmd se o npm for bloqueado.

## Estrutura do código
- app/layout.js: fontes Sora, Inter, Montserrat; metadata pt-BR
- app/page.js: ordem das seções (a Intro "JOÃO D" foi removida): Nav, Hero, Numbers, Projects, Responsive, Services, Process, Cta, Footer, Motion
- app/globals.css: estilos globais, variáveis CSS (--bg, --v...), keyframes
- components/: Nav, Hero (com retrato do João; sem Intro), Numbers, Projects, Responsive, Services, Process, Footer (com Cta), Motion, WaIcon, config
- components/config.js: WA_LINK (WhatsApp) e INSTAGRAM
- Imagens: public/joao-d.jpg (retrato, também usado no Open Graph), public/joao-d-256.jpg (avatar na Nav e no CTA), public/sites/<id>-<laptop|tablet|phone>.jpg (capturas reais dos 4 projetos) e app/icon.jpg (favicon).

## Animações (GSAP)
- Motion.js: entrada do hero (sem Intro), retrato que inclina com o mouse, parallax, reveal ao rolar (classe .rv), contador e gráfico em #numeros, orbes que seguem o mouse. Respeita prefers-reduced-motion.
- Responsive.js: cena fixa (pin) no desktop com celular 390px, tablet 820px e notebook 1440px entrando pela rolagem; no mobile/tablet entram em sequência. Cada aparelho mostra uma captura REAL do site (em vez de mockup em código). Abas trocam o projeto: Brasa Fish, Meteoro Joias, Balneário Valentim, Eletricista da NASA.

## Regras de trabalho
- Não recriar o projeto nem sobrescrever código existente.
- Não salvar tokens, senhas ou chaves em nenhum arquivo ou repositório.
- Rodar `npm.cmd run build` antes de publicar.
- Não exibir preços na seção Responsive.
- Alterar a main só com confirmação do João (publica na Vercel).
- Sempre usar o Desktop Commander para salvar onde paramos (TAREFAS_PENDENTES.md e HISTORICO_ALTERACOES.md) a cada etapa concluída.

## Como retomar em uma conta nova
1. Usar o Desktop Commander e abrir C:\sites\joaodstudio.
2. Ler CONTEXTO_PROJETO.md, HISTORICO_ALTERACOES.md e TAREFAS_PENDENTES.md.
3. Rodar git status -sb e git log --oneline -10.
4. Continuar a partir de TAREFAS_PENDENTES.md, sem repetir o que está no histórico.
