---
name: mr-slides
description: Cria e refina apresentações animadas em HTML (React + Vite + framer-motion) a partir de uma proposta ou documento em texto, no jeito do Iago - um slide por vez, storytelling em cenas controladas por clique, layout com respiro, paleta fechada, e autocrítica com captura antes de mostrar. Usar quando o Iago pedir para montar, converter, refinar ou "fazer a arte" de slides, deck, apresentação, pitch ou proposta visual, mesmo que ele só diga "agora o próximo slide", "ajusta essa animação" ou "isso está feio". Também cobre escrever a proposta em texto antes dos slides (seção por seção no chat) e o engine do deck.
argument-hint: "[slide ou seção] [o que fazer]"
allowed-tools: Bash, Read, Write, Edit
---

# Mr. Slides

Skill nascida do deck da proposta AYRA OS (setembro de 2026): 9 slides, cada um com 5 a 15 rodadas de ajuste até o Iago aprovar. As rodadas eram sempre os mesmos tipos de erro. Esta skill é o pré-voo que evita repeti-los, mais o método e o vocabulário de animação que ele aprovou.

## Antes de tudo

- `references/metodo.md`: processo, anatomia de um slide, vocabulário de animação (tabela), paleta, regras de layout, conteúdo, checklist de autocrítica. Ler inteiro na primeira vez na sessão.
- `references/analise-por-slide.md`: para cada slide já feito, como pensar desde o início, pontos de atenção e conferências só no código. Ler o slide parecido com o que vai fazer.
- `references/historico-slides.md`: os pedidos e correções dele, slide a slide, em ordem. Ler quando quiser saber "por que essa regra existe".
- `references/engine.md`: a estrutura do deck e as pegadinhas técnicas. Ler ao criar um deck novo ou mexer no motor.
- `scripts/capture.mjs`: captura quadros do dev server em 1:1 para conferir.

## O fluxo, por slide

1. **Reler a seção do texto-fonte** (a proposta) que o slide cobre. Perguntar: esse slide resume outro? Se sim, ele vira o último passo do outro, não um slide.
2. **Nomear a estrutura do conteúdo**: comparação, matriz (coisas × personas), tabela (eixos × estados), sequência causal, lista, diagrama em camadas. O desenho segue a estrutura, e a tabela do `metodo.md` (seção 2) diz qual anatomia usar.
3. **Escrever a partitura em texto**, antes de código: a lista de ações na ordem (um clique por ação), o que cada gatilho dispara (clique, sublinhado, ponto final, chegada da linha), e a ordem causal (primeiro existe, depois se conecta; quem age manda a seta; o que mede aparece depois do medido). Se o Iago pediu para discutir antes, mostrar essa partitura e esperar.
4. **Geometria no papel**: caixa de cena com centro nomeado, quem coexiste em cada tick, larguras de texto estimadas (0,55 × fonte por caractere + padding), quadrantes com 40px de folga, respiro interno igual ao padding, altura de card pela conta do conteúdo, setas só verticais entre cards alinhados. Anotar as contas em comentário no código.
5. **Codar** com estado derivado do passo (`ACOES` + `steps={ACOES.length}`), entradas por estado ou imperativas (o `initial` é ignorado pelo Deck), timers limpos, avanço rápido completando o anterior.
6. **Conferir no código** (lista abaixo), depois `npx tsc -b`, depois captura 1:1 em três momentos (primeiro elemento, mais cheio, final), ida e volta, saída do slide.
7. **Autocrítica na pele dele** (seção 7 do `metodo.md`): harmônico? grudado? muita coisa de uma vez? ordem faz sentido? suave? repete outro slide? título conflita com texto final? paleta, travessão, emoji, ícone sem sentido? Corrigir e capturar de novo antes de mostrar.
8. **Commit** com mensagem curta. Mostrar ao Iago com o que mudou em uma lista, e a URL do slide.
9. **Depois de cada correção dele**, extrair a regra geral e atualizar `metodo.md` (regra) e `historico-slides.md` (o caso). A skill cresce a cada slide.

## Conferências só no código (sem print)

- Um `steps` igual ao tamanho da lista de ações; estado derivado de `step`; nenhum índice de fase colide com o fechamento.
- Nenhum elemento que monta no meio do slide depende de `initial`; usa estado ou `animate()`.
- Cada `setTimeout` está num `useEffect` com cleanup; ao mudar de passo, o anterior recebe o valor final.
- Posições absolutas: para cada par simultâneo, `x2 >= x1 + largura1 + 24`; nada com `marginLeft` negativo; legenda em `bottom: 0` com 24px de folga acima.
- Card: altura = padding + cabeçalho + gap + fileiras × altura da fileira + padding; anotado.
- Mudo é cor (`#ededed`, `#e4ffe7`, `#9a9a9a`), nunca `opacity`; destaque é a cor normal.
- Cores usadas: só mint, branco, preto e os dois cinzas; sem vermelho, marrom, degradê.
- Texto: sem travessão, sem "→", sem emoji, sem "não X, é Y"; frases de 4 a 9 palavras; nomes iguais aos do texto-fonte.
- Ícones lucide com sentido semântico; `X` importado com alias.
- Linha tracejada anima `opacity`, não `pathLength`; tampa que levanta pela esquerda com dobradiça à direita é `rotate: +30`.
- Sequência automática de abertura começa 1,3 s depois da montagem.
- Notas do apresentador preenchidas, números de exemplo marcados como ilustrativos.

## O que ele valoriza (para decidir sem perguntar)

- Um slide por vez, atenção total, mostrar só depois da autocrítica.
- Storytelling em cenas, não texto; o PDF carrega o detalhe.
- Controle fino: cada mini-coisa é um clique; sequência automática só dentro de uma ação.
- Suavidade e ordem causal; "essas animações importam".
- Harmonia: respiro, alinhamento, nada grudado, nada cortado pela borda.
- Honestidade no conteúdo: sem inventar equipe, ferramenta, promessa ou número que não está no texto-fonte.
