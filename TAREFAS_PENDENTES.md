# TAREFAS PENDENTES — João D Studio

Última atualização: 18/11/2026

## Em andamento
► CHECKPOINT 17/11/2026 23:30 — branch feat/cinematico criada a partir da main (e2ccfd2), ainda sem commits. Pedido do João: efeitos cinematográficos, textos conectados entre seções, acabamento profissional nas divisões, letras animadas (GSAP), cores vívidas, textos em destaque, responsivo, algo que combine com Figma.
  Plano: Cinema.js (letras por caractere, ponte de texto com scroll, fios entre seções, barra de progresso), Bridge.js, Marquee.js, CSS com cor vívida por seção (acc-*), BRIEFING_PAGINA.md e design/figma-tokens.json.
  Estado 23:55: implementado e com build OK na branch feat/cinematico (Cinema.js, Bridge.js, Marquee.js, CSS cinematográfico, BRIEFING_PAGINA.md, design/figma-tokens.json). Não testado visualmente (sem navegador): o João precisa conferir a prévia da Vercel no celular e no desktop.
  Figma: conector sugerido, ainda não conectado; tokens prontos para importar.
  ► 17/11 23:55 — FEITO o pedido do João: faixa de palavras (Marquee) removida, brilho das letras tirado, acabamento editorial sem cara de IA (sem holofote, sem grão, sem desfoque, sem emojis), textos mais persuasivos. Build OK na branch feat/cinematico; falta o João conferir a prévia no celular e no desktop.
  ► 17/11 23:40 — NOVO PEDIDO do João: na seção "Uma página. Todas as telas." (Responsive.js), deixar mais elegante e profissional, brilho laranja menos estourado, efeito cinematográfico em 3D. Em andamento na branch feat/cinematico. Ele quer que o progresso seja salvo com frequência (ele pediu salvar ao chegar perto do limite; não consigo ver o medidor de uso, então salvo a cada etapa).
  ► 17/11 (retomada) — FEITO e commitado (686970d, push na feat/cinematico, build OK): seção "Uma página. Todas as telas." com cores de texto na cor da seção, brilho laranja contido, sombra de chão, molduras em titânio escuro e profundidade 3D (aparelhos girados, inclinação com o mouse via GSAP quickTo, só em dispositivos com hover). Falta o João conferir a prévia da Vercel.
  ► 18/11 00:05 — FEITO e commitado (46605fc, feat/cinematico, build OK, testado em 390 px com navegador de teste): seção responsiva no celular com aparelhos fixos na rolagem (celular abre grande e encolhe, depois tablet e laptop), trilho Mobile/Tablet/Desktop clicável, abas de projeto, capturas reais por projeto (public/sites/*.webp). Ajuste final: mais espaço embaixo para o botão flutuante do WhatsApp não cobrir a aba NASA e mais respiro entre o laptop e o cabeçalho. Sem rolagem lateral. Falta o João conferir a prévia da Vercel no celular e no desktop.
   24/11 22:40 - FEITO (1df1559, feat/cinematico, SÓ LOCAL, sem push): seção Projects com entrada cinematográfica GSAP (stagger, clip-path mask reveal, escala) e microinterações no hover. Build OK, testado em 1440 px e 375 px. Aguardando o João autorizar o push para gerar a prévia da Vercel.
   24/11 - feat/cinematico PUBLICADA na main (9861e66), autorizado pelo João.
  ► 24/11 23:30 - NOVA branch feat/briefing (só local): hero com landing/portfólio/vitrine, Formatos em faixa clara, Briefing com diagnóstico (#diagnostico), Process 3D, CTA claro, pontes reescritas. Build OK. Aguardando o João ver em localhost:3123 e autorizar push/merge.
  Próximo: o João confere; ajustar o que pedir; só então mesclar na main (com confirmação).
  Se cair a sessão: git switch feat/briefing, ler este bloco. Não mexer na main sem confirmação do João.
- Nenhuma tarefa de código em andamento. Seção responsiva publicada na main.
- Hero com retrato e capturas reais publicados na main (aguardando conferência do João no site oficial).

## Próxima ação sugerida
► Conferir joaodstudio.vercel.app (hero com retrato e capturas reais) e perguntar ao João qual é a próxima melhoria.
(Os itens numerados abaixo são da seção responsiva já publicada.)
1. Conferir joaodstudio.vercel.app (desktop, tablet e celular) e validar a seção "Uma página. Todas as telas.".
2. Perguntar ao João qual é a próxima melhoria do site.

## Pendentes (a confirmar com o João)
- [ ] Revisar textos, cores e animações da seção Responsive após ver no ar.
- [ ] (A seção Projects agora usa capturas reais dos sites; conferir se ainda aparecem preços nas imagens.) Decidir se os preços exibidos na seção Projects devem continuar visíveis (a seção Responsive não exibe preços de propósito).
- [ ] Preencher aqui as próximas melhorias do site.

## Concluído
- [x] Hero com retrato, capturas reais (Projects e Responsive), metadados Open Graph e favicon publicados na main (commits 8c0363a e 36427a8, build validado, 17/11/2026)
- [x] Site inicial (commit 295e858)
- [x] Seção responsiva com mockups (commit 2367e20), agora na main
- [x] Arquivos de memória criados e commitados (17/11/2026)
- [x] Build validado e merge na main publicado (17/11/2026)

## Como manter
Ao terminar qualquer tarefa: mover o item para Concluído, registrar em HISTORICO_ALTERACOES.md com o hash do commit e atualizar a data acima.
