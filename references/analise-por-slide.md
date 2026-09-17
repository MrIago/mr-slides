# Análise por slide: dado o código final, como eu deveria ter pensado desde o início

Para cada slide do deck AYRA OS: o que o Iago pediu (resumido), o que o código final faz, e as três perguntas que importam: **como pensar desde o início** para sair assim, **pontos de atenção** no raciocínio, e **conferências só no código** (sem print) que teriam evitado as rodadas. No fim, o que se generaliza para o pré-voo do `SKILL.md`.

Índice: 1 capa · 2 lugares · 3 telefone · 4 clientes · 5 fatia · 6 eixos · 7 decisões · 8 problemas · 9 sistema · síntese.

---

## 1. Capa e a transição do deck

**Código final.** Slide mint com data no canto, "AYRA OS" a 220px, subtítulo em `Step at={1}`. A pílula, as logos e toda a transição moram no engine (`Deck`, `Bar`), não no slide.

**Como pensar desde o início.** A capa não é um slide, é a apresentação do sistema de navegação. O que se desenha ali (pílula que estica, bolinha, check, título letra a letra, ícone do slide) vai se repetir em todas as transições, então a primeira pergunta é: "o que dessa capa é do engine e o que é do slide?". Tudo que reaparece em outros slides vai para o engine com fases nomeadas e durações constantes.

**Pontos de atenção.**
- Ele descreve transições em tempos ("aí a faixa estica, aí o conteúdo arrasta, aí a seta volta trazendo…"). Transcrever cada "aí" para uma fase com nome e duração antes de codar; a lista de fases é o plano.
- A volta tem que ser o inverso exato. Se a ida tem N fases, a volta tem as mesmas N em ordem contrária. Projetar as duas juntas.
- O estado inicial de um slide é "depois do check e do ícone". Recarregar a URL cai nesse estado, não na animação de chegada.

**Conferências no código.**
- Existe uma constante por duração (`ARM`, `DRAG`, `CHECK`, `TITLE`), e a soma bate com o que foi descrito.
- `beforeSlideChange(from, to, dir)` trata `dir === -1` com fases próprias; nenhuma fase da ida é reusada "ao contrário" na base do improviso.
- O tom da pílula é função do tema do slide de destino, trocado no instante do check, e o modo `logos` só existe no índice 0.
- Reload: o estado inicial do deck lê o hash e monta com `phase = short`, `mode = title` e o ícone do slide.

## 2. Lugares (cards + história da margem)

**Código final.** Título com ", principalmente" entrando por largura; quatro cards em `Step`; embaixo, `Historia` com cenas (ícone fixo que troca o glifo, texto com blur, barra que surge do chão com bounce e um contador). Barra animada imperativamente.

**Como pensar desde o início.** O espaço vazio embaixo dos cards é o palco de uma história, com cenas que trocam no mesmo lugar. Antes de codar, escrever a tabela de cenas: ícone, frase, valor. Depois decidir o que é fixo (o quadradinho do ícone, a posição da barra) e o que troca (glifo, texto, altura da barra, número). Elementos fixos animam uma vez; elementos que trocam usam `AnimatePresence mode="wait"` com `key` da cena.

**Pontos de atenção.**
- Alinhar o indicador com algo já existente (a borda do último card), não flutuar no espaço.
- "Surgir" não é "estar lá": a barra nasce do chão (altura 0 → h com bounce), o número conta, o texto entra com fade e deslocamento.
- Sem vermelho: alerta é uma pulsada, não cor.
- Detalhe de título: um complemento que entra ("principalmente") empurra o que já existe; testar se cabe na linha antes de escolher vírgula ou parênteses.

**Conferências no código.**
- Todo elemento que aparece depois da montagem do slide usa estado ou `animate()` imperativo, nunca só `initial`, porque o `AnimatePresence initial={false}` do Deck ignora `initial` (pegadinha registrada em `engine.md`). Grep: `initial={{` num componente que monta em passo > 0 é suspeito.
- O número de passos do `Slide` é `cards + cenas`, e `Historia from={5}` bate com esse total.
- A barra tem `overflow: hidden` e a parte verde é `bottom: 0` em porcentagem do valor; o mesmo valor alimenta o contador (uma fonte de verdade por cena).

## 3. Telefone (Netza integra fornecedores; AYRA integra unidades)

**Código final.** Sem quadro preto: placas pretas com o nome escrito, 20 tiles com 20 ícones distintos → linha → círculo com telefone; na cena da AYRA, o inverso (quadrado grande à esquerda → linha → 9 tiles nomeados). Fechamento com dois cards.

**Como pensar desde o início.** Quando o slide é uma comparação ("um telefone em vez de trinta"), a cena tem que mostrar a quantidade: vinte coisas viram uma. E a segunda cena é o espelho da primeira, porque o texto diz "a Netza integra fornecedores, a AYRA integra unidades": mesmo desenho, sentido invertido. Ler o parágrafo da proposta e procurar a estrutura (comparação, inversão, sequência) antes de desenhar.

**Pontos de atenção.**
- Ícones têm significado: vinte fornecedores são vinte ícones diferentes e plausíveis (som, luz, comida, transporte); "mala" não é unidade; orquestração é rede.
- Um ícone grande ao lado de tiles pequenos precisa estar centralizado com o bloco dos tiles, não com o texto que fica embaixo.
- Nome escrito em placa preta lê melhor que logo pequena sobre cor.

**Conferências no código.**
- A lista de ícones tem o mesmo tamanho da quantidade dita no texto (20) e não repete nenhum.
- Os dois grids (cena 1 e cena 2) usam a mesma altura de linha e `alignItems: center` para o ícone grande ficar no centro do bloco.

## 4. Clientes (narrado: texto digitado guia a cena)

**Código final.** `Corpo` com `typed` e `hint` disparados pelo `Typewriter` (segmento sublinhado → `hint`; ponto final → `typed`). Três cenas: roleta que desacelera e para, linha com bounce, cliente pop; cliente pop no sublinhado e três negócios no ponto final; card verde que expande em três tempos e cards que brotam.

**Como pensar desde o início.** O texto é a partitura. Cada frase tem dois momentos naturais: o trecho que importa (sublinhado) e o ponto final. A cena reage a esses dois, e só a eles. Ao escrever a frase, já marcar qual trecho é o sublinhado e o que acontece nele; e o que acontece no ponto final. Nada acontece "no meio" sem gatilho.

**Pontos de atenção.**
- "Muita coisa de uma vez" é o erro mais comum: cada gatilho dispara uma coisa. O ponto final pode disparar uma cadeia curta (roleta → linha → pop), mas em série, cada uma esperando a anterior.
- Roleta desacelera: intervalos crescentes, para no item certo.
- Linha com bounce só na primeira vez que aparece; na cena seguinte, "só estica".
- Card que "expande em tempos": largura `auto` com `overflow: hidden` por pedaço, um pedaço por tempo.

**Conferências no código.**
- `segs` de cada cena tem exatamente um segmento `u: true`, e o `onSegmentStart` só liga `hint` nele.
- A cadeia do ponto final é uma lista de timeouts com tempos crescentes, todos limpos no cleanup.
- Nenhuma cena usa `initial` para elementos que montam depois (mesma pegadinha do Deck).

## 5. Fatia (quem vê o quê)

**Código final.** Seis cardzinhos de "coisas visíveis" à esquerda; pessoa com crachá à direita; por persona, acende (mint) o que ela vê e apaga o resto; descrição embaixo; crachá aparece uma vez e só o conteúdo troca; cordão cresce com o primeiro crachá. Fechamento: o título troca e o corpo vira cinco cards de persona com os seis ícones acesos ou apagados.

**Como pensar desde o início.** Quando a proposta lista "X vê A, Y vê B", o slide é uma matriz: linhas são as coisas, colunas são as personas. Mostrar a matriz uma coluna por vez (a persona), com as linhas acendendo. O fechamento é a matriz inteira de uma vez, visual. E o título de cima não pode competir com uma frase final: se há frase final, ela vira o título.

**Pontos de atenção.**
- Paleta: nada de degradê; acender e apagar é mint contra cinza escuro.
- Elementos que aparecem uma vez ficam parados; só o conteúdo interno troca (crachá, quadradinho do ícone).
- O cordão que liga é parte da entrada do crachá: nasce junto, não está lá antes.
- Descrição entra junto com o cargo, com atraso mínimo.

**Conferências no código.**
- O crachá é um `motion.div` com `key` fixo; o `AnimatePresence` com `key` variável está só no conteúdo interno.
- O fechamento não renderiza um segundo bloco de texto grande: o título é `key`ado pelo estado final e o corpo troca.
- O passo máximo do slide = 1 (abertura) + personas + 1 (fechamento); nenhum índice de persona colide com o fechamento (bug real: `step - 2` contra `step - 1`).

## 6. Eixos (trilhas de estados)

**Código final.** Três trilhas com rótulo à esquerda, pílulas dos estados, linha que corre entre elas, coluna fixa à direita com uma frase que troca e desce como "…"; decisões caem uma por clique com frase própria; fechamento em três fases de foco (prevista, real, distância) com tudo mudo por cor e separador vertical. Lista `ACOES` mapeia cada clique a uma ação.

**Como pensar desde o início.** Quando o conteúdo é "N eixos, cada um com M estados, cada estado com uma frase", o desenho é uma tabela animada: uma linha por eixo, uma célula por estado, uma frase por célula. O controle é um clique por célula. Antes de codar, escrever a lista de ações na ordem (rótulo do eixo, estado 1, estado 2…), porque essa lista é ao mesmo tempo o roteiro e o estado do slide.

**Pontos de atenção.**
- Frases vêm da proposta, uma linha por estado, com os mesmos nomes.
- "Pílula, linha, pílula": a linha sai de dentro da pílula anterior e a próxima só aparece quando ela chega.
- Uma frase flutuante só, que se move; não uma frase por linha.
- Mudo por cor, não por opacidade (opacidade deixa ver o que está atrás). Destaque é a cor normal, sem anel, sem escala.
- Fechamento com respiro e centralizado com o que ele comenta (as três trilhas, não as decisões).

**Conferências no código.**
- Existe `ACOES` e `steps={ACOES.length}`; o estado é derivado de `step` num único `useEffect`; ao entrar num passo, as trilhas anteriores recebem o valor final (avanço rápido não deixa buraco).
- Nenhuma cor de mudo usa `opacity`; usa hexadecimais (`#ededed`, `#e4ffe7`, `#9a9a9a`).
- A largura da coluna da frase é fixa (340) e a frase é a única com `position: absolute` movendo em `y = linha × PITCH`.

## 7. Decisões e informação (narrado, quatro cenas)

**Código final.** Mesmo padrão do 4. Cena da montagem: bloco, "?!", etiqueta, e só depois o indicador da margem surgindo suave, subindo até 22%; no ponto final, a etiqueta cai, a barra recua a 19% e "absorvido". Cena 4: registro linha a linha e a margem prevista indo a 19% "se absorver" e voltando a 22% "repassado".

**Como pensar desde o início.** A ordem de aparição é a ordem causal do texto: primeiro o que a pessoa vê (a montagem), depois o que descobre (a etiqueta), depois a consequência (a margem). Um indicador nunca aparece antes da coisa que ele mede. E "suave" é a regra padrão: tudo que entra tem uma entrada.

**Pontos de atenção.**
- Um indicador tem três partes que animam juntas: rótulo, número contando, barra enchendo.
- Se o texto é curto, o ponto final chega antes da cena terminar; atrasar a reação do ponto final até a cena anterior assentar.
- Lógica do exemplo tem que fechar: se a decisão foi "repassado ao cliente", a margem volta; se "absorvido", cai.

**Conferências no código.**
- A ordem dos `setTimeout` da cena bate com a ordem causal (montagem < etiqueta < indicador).
- O `typed` dispara com um atraso que cobre o tempo da sequência do `hint`.
- Os números da cena são consistentes entre si (22 → 19 = custo de R$ 8 mil sobre o exemplo) e marcados como ilustrativos nas notas.

## 8. Problemas (foco em dois cards + dezesseis vinhetas)

**Código final.** Abertura automática (título, cardzinhos, "E o que o sistema faz." com a fileira descendo, primeiro acende ao pousar); `ACOES` com dor, solução (uma ou mais fases) por problema, e a grade final com a frase honesta; vinhetas em arquivo próprio com `useTicks` e `useTicks2` (dois ritmos), helpers `Pop`, `pill`, `parabola`; alguns problemas com um componente só e `modo` (dor/sis).

**Como pensar desde o início.** Oito problemas com solução é um padrão repetido oito vezes: o esqueleto (card, vinheta, card verde, trilha) se escreve uma vez, e o trabalho vira dezesseis mini-histórias. Cada vinheta se planeja como uma cena de 640×300 com centro nomeado, uma lista de ticks (o que aparece em cada um) e posições por quadrante com largura calculada. Se dor e solução compartilham personagens, é um componente com `modo`. Antes de desenhar, perguntar: "esse problema é sobre o quê que o anterior não é?" (o 1 é tempo, o 2 é dinheiro), para não repetir a mesma imagem.

**Pontos de atenção.**
- Ordem causal em cada vinheta: a coisa aparece, depois se conecta; a seta sai de quem age; o check só marca quando a bolinha chegou; a etiqueta cai depois do indicador subir.
- Uma seta por vez quando a ordem importa ("essas animações importam").
- Nuvens soltas flutuam; param quando compilam.
- Ritmos: listas rápidas, ações no ritmo normal.
- Ícones com sentido (joinha, traço, joinha para baixo) e nunca emoji; sem seta em texto.
- Respiro: nada encosta em borda; legenda de rodapé com 24px de folga; balões em quadrantes.
- Abertura automática só depois da transição do deck (1,3 s).

**Conferências no código.**
- Cada `Pop`/entrada tem transição só na entrada (`on ? spring : fade curto`), para a saída não ficar atrasada.
- Larguras de texto anotadas em comentário; posições absolutas somam `x + largura + 24 <= próximo x` para elementos simultâneos; nenhum `marginLeft` negativo.
- `useTicks` com cleanup; timers de fase (`fase === 2`) reiniciam a fase quando volta a 1.
- Quem coexiste em cada tick está listado no comentário do topo do componente.
- Elementos que "somem atrás" (caixa) têm `zIndex` explícito em ordem: tampa < item < corpo.
- Nenhum `transform` inline num `motion.div`; escala fixa vai em `div` interno.
- Linhas tracejadas não animam `pathLength`.

## 9. Sistema (diagrama em faixas)

**Código final.** Três faixas cinza (canais de acesso, núcleo, infraestrutura) com rótulo à esquerda; cards alinhados em colunas; setas verticais curtas com rótulo ao lado; um clique por peça; regra "nada pula o núcleo" com atalho tracejado contornando pelo corredor e X; fechamento com selos "conta da AYRA".

**Como pensar desde o início.** Diagrama de arquitetura se organiza em camadas antes de qualquer coordenada: quais são as faixas, o que mora em cada uma, quem fala com quem. Só depois escolher posições, e a regra é setas verticais entre cards alinhados; se uma seta precisa de cotovelo, o layout está errado. Cada card tem respiro interno igual ao padding das bordas, e a altura vem do conteúdo (duas fileiras de chips = altura maior), não de um número redondo.

**Pontos de atenção.**
- Um slide-resumo de outro slide não existe: vira o último passo do outro.
- Nomes técnicos ficam pequenos e cinza; o que fala alto é a função (Drive, Banco, Serviços, Núcleo).
- Rótulos de setas ao lado do trecho vertical, alinhados ao início, nunca sobre a linha nem cruzando outra.
- O "proibido" é preto com X, não vermelho; o atalho contorna, não atravessa cards.

**Conferências no código.**
- Todas as setas são `M x y V y2` (só verticais) e `x` é o centro do card de origem, que é também o centro do card de destino.
- Altura de card = padding + cabeçalho + gap + fileiras de chips × altura + padding; comentário com a conta.
- Rótulo de faixa cabe na coluna de 160px em duas linhas no máximo.
- Nenhuma coordenada de rótulo coincide com um `x` de seta.

---

## Síntese: o que vira pré-voo

As perguntas que, feitas antes de codar, teriam evitado quase todas as rodadas:

1. **Estrutura do conteúdo.** O parágrafo da proposta é uma comparação, uma matriz, uma tabela, uma sequência causal, uma lista? O desenho segue a estrutura.
2. **O que é fixo e o que troca.** Fixo anima uma vez e fica; o que troca usa `key`. Nada aparece do nada.
3. **A partitura.** Quais são os gatilhos (clique, sublinhado, ponto final, chegada de uma linha) e o que cada um dispara? Uma coisa por gatilho.
4. **A ordem causal.** O que existe antes de se conectar? Quem age manda a seta? O que mede aparece depois do que é medido?
5. **A lista de ações.** Um clique por ação; o estado deriva do passo; avanço rápido completa o anterior.
6. **A geometria.** Caixa de cena, centro nomeado, larguras calculadas, quadrantes, respiro interno igual ao externo, altura de card pela conta do conteúdo, setas verticais.
7. **A paleta e os símbolos.** Mint, branco, preto e dois cinzas; mudo por cor; ícones com sentido; sem emoji, seta em texto ou travessão.
8. **Redundância.** Esse slide resume outro? Então é o último passo do outro.
9. **Pegadinhas do engine.** `initial` ignorado; painel que sai; timers; tracejado; rotação; `transform`.
10. **Conferência.** `tsc`, captura 1:1 em três momentos, ida e volta, saída do slide.
