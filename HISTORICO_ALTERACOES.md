# HISTÓRICO DE ALTERAÇÕES — João D Studio

Registro em ordem cronológica. Acrescentar novas entradas no fim, sem apagar as antigas.

## 17/11/2026 — commit 295e858 (main)
feat: site João D Studio (Next.js + Tailwind + GSAP)
- Site inicial publicado: Intro, Nav, Hero, Numbers, Projects, Services, Process, Cta, Footer.
- Animações em Motion.js (hero, parallax, reveal, contador, orbes).

## 17/11/2026 — commit 2367e20 (branch feat/secao-responsiva)
feat: seção responsiva cinematográfica com mockups de celular, tablet e notebook
- Novo components/Responsive.js (279 linhas).
- Alterados app/globals.css (+155 linhas), app/layout.js e app/page.js (inclui a seção entre Projects e Services).
- Status: enviada ao GitHub (origin/feat/secao-responsiva). AINDA NÃO mesclada na main, portanto provavelmente não está no site publicado.

## 17/11/2026 — repositório comandos-joaodstudio, commit 7c23a7b
docs: comandos do projeto Joao D Studio (COMANDOS.md e README.md). Sincronizado com o GitHub.

## 17/11/2026 — nova sessão/conta do Claude (sem alteração de código)
- Localizado o projeto em C:\sites\joaodstudio.
- Git verificado: branch feat/secao-responsiva limpa e igual ao remoto; main em 295e858; sem stash.
- Não existiam arquivos de memória; foram criados CONTEXTO_PROJETO.md, HISTORICO_ALTERACOES.md e TAREFAS_PENDENTES.md.
- Nenhum arquivo de código foi modificado. Build (npm.cmd run build) NÃO foi executado nesta sessão.

## Observação
Conversas anteriores (outra conta) não ficaram registradas em arquivo. Se houve trabalho além dos dois commits acima, ele não está salvo no disco nem no Git.

## 17/11/2026 — publicação da seção responsiva (autorizada pelo João)
- Confirmado que joaodstudio.vercel.app estava na versão da main (295e858), sem a seção nova. O link de prévia da branch já tinha a seção: a Vercel só publica produção a partir da main.
- npm.cmd run build na feat/secao-responsiva: passou sem erros (Next.js 15.5.29, rota / com 53.6 kB).
- Arquivos de memória commitados na feat/secao-responsiva.
- feat/secao-responsiva mesclada na main (fast-forward) e enviada ao GitHub, disparando o deploy de produção na Vercel.
