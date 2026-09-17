# A engine do deck (React + Vite + framer-motion) e as pegadinhas

Referência técnica do deck feito para a AYRA (`slide/` no repo do projeto). Ler quando for criar um deck novo do zero ou mexer no motor.

## Estrutura

- `src/engine/`: `Deck.tsx` (máquina de fases da pílula, painel que entra e sai, overlay da volta), `Bar.tsx` (a pílula "AYRA OS" com bolinha, check, título letra a letra, ícone do slide), `useNav.ts` (hash `#/id`, teclado, swipe, `beforeSlideChange`), `Step.tsx` (fragmento por passo), `Slide.tsx`, `Typewriter.tsx` (segmentos com sublinhado, `onDone`, `onSegmentStart`), `ui.tsx` (Label, Title, Card, Row, Big, Muted), `Presenter.tsx` (`?notes`), `context.tsx`.
- `src/slides/NN-nome.tsx`: um arquivo por slide refinado; `all.tsx` guarda os que ainda estão na primeira versão. `index.ts` define a ordem.
- `src/theme/tokens.css` (paleta e temas `light`, `mint`, `dark`, com `--bg`, `--fg`, `--muted`, `--surface`), `fonts.css`, `base.css` (palco 1920×1080 escalado, `.slide` com padding 96/120/232, `.panel` com o retângulo extra de borda arredondada, `.bar`, regras de impressão).
- `tools/pdf.mjs` gera o PDF via Chromium com `?print`. `tools/font.sh` converte fontes.

## Contrato de um slide

```ts
export const nome: SlideDef = { id, theme: "light" | "mint" | "dark", icon: <Icone size={28} />, notes: "...", render: () => <Slide steps={N}>...</Slide> };
```

- `useDeck()` dá `step`; o slide deriva tudo do passo. Para "um clique por ação" com ações heterogêneas, montar uma lista `ACOES` e mapear `step` para ela (ver `06-eixos.tsx`, `08-problemas.tsx`).
- `steps` é o número de cliques dentro do slide. A pílula fica larga com a seta quando `step >= steps` e existe próximo slide.
- Notas do apresentador no campo `notes`; números ilustrativos avisados ali.

## A pílula (transição do deck)

Fases: `short | wide | arm | drag | check | title | untitle | undrag | unarm`; modos `logos | title`; tons por fundo (mint → pílula preta; light → mint; dark → branca), trocados no instante do check. Durações nomeadas em `Deck.tsx` (`ARM`, `DRAG`, `CHECK`, `TITLE`). A volta usa um overlay do slide anterior entrando pela esquerda por cima, e troca o índice sem animação.

## Pegadinhas que custaram rodadas

- **`AnimatePresence initial={false}` do Deck engole o `initial` de tudo que monta depois.** Elementos que nascem no meio do slide não animam a entrada com `initial`. Solução: animar por estado (`useState` + `useEffect` com timeout) ou imperativo (`animate(ref.current, ...)`). Componente `Revela` em `08-problemas.tsx`.
- **Painel que sai voltava ao passo 0** porque lia o contexto do deck, já apontando para o próximo slide. `Frozen` congela o passo no painel que sai e expõe `leaving` para os `Step` recolherem para a esquerda.
- **Tema claro sem classe própria**: um painel claro dentro de um palco escuro herdava o fundo preto na transição. Todo tema tem classe (`.theme-light` inclusive).
- **Timers e avanço rápido**: sequências por `setTimeout` ficam pela metade se o usuário avança antes. Ao mudar de passo, completar a ação anterior na hora; limpar timers no cleanup.
- **`pathLength` do framer usa `stroke-dasharray`**: uma linha tracejada perde o tracejado se animar `pathLength`. Para tracejado, animar só `opacity`.
- **Rotação CSS**: `rotate` negativo leva a ponta esquerda para baixo (sentido anti-horário). Tampa que levanta pela esquerda com dobradiça à direita é `rotate: +30`, `transformOrigin: "100% 100%"`.
- **`transform` inline some** quando o elemento é `motion.div` (o framer escreve o transform). Escala fixa vai num `div` interno.
- **Marcadores SVG** (`markerEnd`) funcionam com `pathLength` animado; definir `<marker>` uma vez por cor.
- **Abertura automática** de um slide começa 1,3 s depois da montagem, porque o painel monta antes da transição terminar.
- **Nomes de ícone** do lucide podem colidir com identificadores (`X`): importar com alias.
- **Etiquetas por tom de card**: dentro de um card preto, `--muted` vira mint; num card mint, preto. O `Card` de `ui.tsx` já faz isso.

## Conferir

- `npx tsc -b` sempre antes de capturar.
- `scripts/capture.mjs` desta skill captura quadros do dev server em 1:1 (recorte opcional). Olhar três momentos por cena: primeiro elemento, mais cheio, final. Montar uma folha de contato com PIL só para ter visão geral; sobreposição pequena só aparece no 1:1.
- Chegada do deck: para ver a abertura automática, navegar a partir do slide anterior e avançar, não abrir o hash direto.
