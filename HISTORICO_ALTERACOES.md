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


## 17/11/2026 — commit 8c0363a (branch feat/hero-retrato-capturas, NÃO está na main)
feat: hero com retrato, capturas reais nos projetos e na secao responsiva, metadados OG e favicon
- Trabalho encontrado sem commit e sem registro no disco (feito na sessão anterior, 01:31 a 01:41); recuperado e commitado sem alterar o código.
- Hero: Intro "JOÃO D" removida; retrato do João com halo, anel e chips; inclinação com o mouse e entrada mais rápida (Motion.js).
- Nav e Footer (CTA): avatar joao-d-256.jpg.
- layout.js: metadados Open Graph e Twitter, metadataBase e themeColor. Favicon em app/icon.jpg.
- Projects: mockups em código trocados por capturas reais (public/sites/<id>-laptop.jpg).
- Responsive: celular, tablet e notebook mostram capturas reais (1440, 820 e 390 px); removidos SiteView e ResizeObserver; pré-carregamento ao passar o mouse nas abas.
- Imagens novas: public/joao-d.jpg, public/joao-d-256.jpg e 12 capturas em public/sites/.
- npm.cmd run build: passou sem erros (Next.js 15.5.29, rota / com 51,8 kB).
- Status: só local. Sem push e sem merge na main (main segue em cea08e9, igual ao origin/main).

## 17/11/2026 — nova sessão (retomada pelo roteiro de CONTEXTO_PROJETO.md)
- Lidos os três arquivos de memória; git status mostrou 9 arquivos modificados e itens novos sem commit.
- Branch feat/hero-retrato-capturas criada a partir da main (cea08e9). Memória atualizada.

## 17/11/2026 — publicação do hero com retrato e capturas reais (autorizada pelo João)
- A branch feat/hero-retrato-capturas foi enviada ao GitHub; a Vercel gerou a prévia e o João a conferiu e aprovou.
- Merge na main em fast-forward (cea08e9 → 36427a8), com os commits 8c0363a e 36427a8. As entradas acima que dizem "só local" ou "fora da main" ficaram superadas por esta.
- npm.cmd run build na main: passou sem erros (Next.js 15.5.29, rota / com 51,8 kB).
- Push da main enviado ao GitHub, disparando o deploy de produção na Vercel.
