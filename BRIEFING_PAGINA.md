# BRIEFING DA PÁGINA — João D Studio

## Objetivo
Levar o visitante do Instagram até o WhatsApp. A página precisa provar três coisas, nesta ordem: o método funciona, o resultado está no ar, o próximo passo é simples.

## Público
Donos de negócio e prestadores que chegam pelo celular, decidem em segundos e querem ver resultado real antes de chamar.

## Tom
Direto, confiante, cinematográfico. Frases curtas. Uma ideia por tela.

## Narrativa (cada seção responde a uma dúvida e a ponte de texto liga com a próxima)
| # | Seção | Dúvida do visitante | Cor |
|---|-------|---------------------|-----|
| - | Hero | O que ele faz por mim? | ciano → violeta |
| 01 | Prova (Numbers) | Funciona mesmo? | ciano → azul |
| 02 | No ar (Projects) | Posso ver sites reais? | magenta → laranja |
| 03 | Todas as telas (Responsive) | Funciona no meu celular? | violeta (cor própria de cada projeto) |
| - | Por quê (Services) | Por que eu preciso disso? | âmbar → laranja |
| 04 | Como (Process) | Como é o processo? | verde → ciano |
| 05 | Sua vez (CTA) | Qual é o próximo passo? | azul → violeta |

## Paleta (tokens em design/figma-tokens.json)
- Base escura: #050a1a, #0a1330, cartão #0e1a3f. Texto #eaf1ff, apoio #9fb0d6.
- Vívidas: ciano #22b8e6, azul #2b6cff, violeta #7c5cff, magenta #f0457f, âmbar #f0a500, verde #1fd08f.
- Regra: uma cor vívida dominante por seção; o degradê só entra nas palavras em destaque.
- Modo claro: as cores sólidas escurecem um pouco para manter o contraste do texto.

## Tipografia
- Títulos: Sora 800, tracking -0.02em, tamanho fluido clamp(30px, 5vw, 52px). Hero até 64px.
- Texto: Inter. Rótulos: Inter 700 em caixa alta, tracking 0.14em.
- Pontes de texto: Sora 800, clamp(26px, 4.8vw, 58px).

## Textos em destaque
- Palavra-chave do título em degradê curto, sem animação (classe .g), uma por título.
- Nas pontes: palavra na cor da seção com sublinhado fino que desenha ao rolar (tag <em className="hl">). Sem sombra de brilho.

## Movimento (GSAP)
- Título do hero: letras sobem de uma máscara em cascata curta, sem desfoque e sem brilho.
- Títulos das seções: mesmo efeito, disparado ao rolar.
- Pontes: palavras acendem conforme a rolagem; um fio fino desce e liga à próxima seção.
- Acabamento entre divisões: linha fina no topo de cada seção, barra de progresso de 2px e borda do card na cor da seção. Sem faixa de palavras, sem holofote, sem grão.
- Respeita prefers-reduced-motion (tudo aparece estático).

## Regras
- Sem preço na seção Responsive.
- Mobile first: testar em 390, 820 e 1440 px.
- Nenhuma mudança vai para a main sem confirmação do João.

## Figma
Importar design/figma-tokens.json (plugin Tokens Studio) para criar as variáveis de cor, tipografia e movimento. Com o conector do Figma ligado, o Claude lê os frames e ajusta o código.
