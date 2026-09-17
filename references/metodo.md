# Método dos slides AYRA OS

Destilado de toda a conversa com o Iago (16 e 17/09/2026), da proposta em texto até o slide 8. É o que eu sigo sozinho daqui em diante, e a base da skill Mr. Slides. Cada regra veio de uma correção real; a ordem é a ordem de trabalho.

## 1. Processo

1. **Texto antes de código.** Reler a seção do `proposta.md` que o slide cobre antes de desenhar. O slide é apresentação; a proposta em PDF é o documento. Nada no slide contradiz o texto (números, nomes de estados, "quatro lugares" contra "cinco lugares").
2. **Um slide por vez.** O anterior aprovado antes de começar o próximo. Planejar em texto (cenas, passos, o que aparece em cada clique), depois codar.
3. **Um clique, uma ação.** Rótulo, pílula, etapa, persona, fase de solução: cada uma é um passo do teclado. Sequência automática só dentro de uma ação (ex.: a linha corre e a pílula aparece), nunca uma cadeia longa sem controle. Exceção aprovada: a abertura de um slide pode rodar sozinha (título, cardzinhos entrando), começando 1,3 s depois da montagem para não colidir com a transição do deck.
4. **Estado derivado do passo.** Tudo que depende de clique se calcula a partir de `step` (lista de ações, como no eixos e no problemas). Avançar rápido completa a ação anterior na hora; voltar funciona. Timers só para micro-sequências, e sempre limpos.
5. **Saída do slide é a última visão.** O engine congela o passo no painel que sai (`Frozen`). Nunca deixar a cena voltar ao início durante o arrasto.
6. **Verificar antes de entregar.** `tsc` limpo, captura 1:1 do painel em três momentos (primeiro elemento, momento mais cheio, estado final) e conferir sobreposição, corte pela borda, ordem narrativa. Depois commit com mensagem curta.

## 2. Anatomia de um slide de conteúdo

- **Label** da seção (Azeret, caixa alta) e **Title** de uma linha (72px). Quando o fechamento precisa de outra frase, o título troca (AnimatePresence, sobe/desce); nunca empilhar um segundo texto grande embaixo do título.
- **Corpo** em uma de duas formas aprovadas:
  - **Narrada.** Coluna esquerda 560px com quadradinho preto fixo (ícone da cena, troca com rotação) e texto digitado (Typewriter, 30px). Trechos sublinhados disparam `hint`; o ponto final dispara `typed`. Cena à direita, 420px de altura, uma por clique.
  - **Trilhas.** Rótulo à esquerda (200px, ícone + Azeret), conteúdo 1fr, coluna fixa à direita (340px) com uma única frase flutuante que troca de conteúdo e desce como "…" ao mudar de linha.
- **Fechamento** visual, não textual: cards por persona, grade em xadrez, foco com o resto apagado por cor, separador vertical com blocos curtos. Uma frase só.
- **Foco em dois cards** (dor/solução): card preto à esquerda com número, ícone, título e a dor em uma frase; vinheta animada à direita. No clique seguinte o card preto some, a vinheta da solução entra no lugar dele e o card mint entra à direita. Trilha de progresso embaixo.

## 3. Vocabulário de animação (aprovado)

| Nome | Como é |
|---|---|
| Pop | spring 320/18, scale 0,7 para 1, y 10 para 0 |
| Pílula, linha, pílula | pílula dá pop; a linha sai de dentro dela (scaleX, origem esquerda, 0,46 s); a próxima só aparece quando a linha chega |
| Contador | número conta de 0 ao valor com ease; barra preta com preenchimento verde na mesma proporção; os dois mudam juntos |
| Morfo | o "?" se desfaz (blur 10px, scale 1,5, opacity 0) e o número nasce no mesmo lugar, conta, e viaja para o canto de destino |
| Roleta | fundo mint passando pelas opções com intervalos crescentes até parar na certa |
| Linha com bounce | scaleX keyframes [0, 1,06, 0,98, 1,01, 1]; só na primeira vez; depois "estica" simples |
| Nuvens | pílulas soltas flutuam (y ±4, x ±3, 2,4 s mais k×0,4, repeat); param ao compilar |
| Compilar | itens voam para um ponto (scale 0,2, opacity 0) e nasce um ícone (cérebro, info) acima do personagem, que depois entra nele ou no card destino |
| Crachá | aparece uma vez com cordão crescendo; fica parado; só o conteúdo interno troca (slide vertical) |
| Mudo | por cor, nunca por opacidade: preto vira #ededed, mint vira #e4ffe7, texto #9a9a9a; destaque é a cor normal, sem anel |
| Foco | apaga o resto por cor, separador vertical mint cresce, blocos de texto entram ao lado |
| Portal | fenda escura acima; a bolinha desce de trás de uma janela recortada |
| Caixa | tampa é a faixa de cima do mesmo card, presa no canto direito, gira +30°; itens sobem em meia parábola, encolhem no caminho, passam por baixo da tampa e somem atrás do corpo; tampa fecha e a caixa centraliza |
| Setas | uma por vez, com marker; a fase seguinte deixa o rastro anterior fraco |
| Dois ritmos | listas a 0,42 s por item; ações a 0,85 s |
| Fileira de progresso | ativo enche de preto de baixo para cima com o ícone enchendo de verde; feitos ficam mint |
| Título que cresce | a parte nova entra com fade e x junto com outra ação (ex.: fileira descendo) |
| Suavidade | nada aparece do nada: tudo tem entrada (pop, fade com deslocamento, crescer do chão) |

## 4. Paleta, tipografia, ícones

- Só mint #7ffb89, branco e preto #171717. Cinzas de apoio: #ededed (paper-2) e #9a9a9a (texto mudo). Sem vermelho, sem marrom, sem degradê.
- Card: preto ou mint. Branco só como fundo, ou como pílula sobre fundo preto/mint.
- Mint como texto só em tamanho grande e negrito, ou sobre preto.
- Títulos Familjen Grotesk, texto Wix Madefor Display, rótulos Azeret Mono (14 a 18px, caixa alta, espaçamento 0,08em).
- Ícones lucide, nunca emoji. O ícone tem que fazer sentido semântico (mala não é unidade; sino não é resultado ruim; joinha para cima e para baixo funcionam).
- Sem travessão em lugar nenhum. Sinal de menos é o ícone Minus. Seta é ícone ou marker SVG, nunca "→" em texto.

## 5. Layout (regras que vieram de erro)

1. Toda vinheta tem uma caixa de cena de tamanho fixo (640×300) e um centro nomeado (CX, CY). Tudo se posiciona a partir dele.
2. Estimar a largura de cada texto antes de posicionar: 0,55 × fontSize por caractere, mais o padding. Anotar no código. Duas caixas só ficam lado a lado se `x2 >= x1 + largura1 + 24`.
3. Elementos ao redor de uma figura central vão em quadrantes (topo-esquerda, topo-direita, baixo-direita), com folga mínima de 40px do círculo. Nada no mesmo eixo vertical do centro.
4. Legenda de rodapé em `bottom: 0`, centralizada; o conteúdo acima termina 24px antes.
5. Dor e solução com o mesmo esqueleto quando compartilham cena: um componente, um `modo`.
6. Elementos simultâneos não dividem lugar; elementos em tempos diferentes podem. Listar quem coexiste em cada tick antes de posicionar.
7. Labels de etapas centralizadas sob os seus círculos (grid de colunas iguais, não flex com gap chutado).
8. Uma frase por elemento de texto. Frases curtas (4 a 9 palavras). Nada de "texto miudinho" em card lateral.
9. Dentro de um card, o respiro entre cabeçalho e conteúdo é igual ao padding das bordas, e a altura vem da conta do conteúdo (duas fileiras de chips pedem mais altura). Nada encosta na borda de baixo.
10. Diagrama se organiza em faixas (camadas) com rótulo à esquerda e cards alinhados em colunas; setas só verticais e curtas, rótulo ao lado do trecho vertical. Se precisa de cotovelo, o layout está errado.
11. Slide que resume outro não existe: vira o último passo do outro.
12. Itens homólogos em colunas (o "ganho" de cada mês, o card de cada persona) têm o mesmo tamanho: largura da coluna e altura fixa que caiba o maior texto, conteúdo centrado na vertical. Três iguais e um menor incomoda quem tem olho.

## 6. Conteúdo

- Frases do slide são resumos de uma linha do texto da proposta, na mesma ordem e com os mesmos nomes (Oportunidade, Job, Relacionamento; Possível, Vendido, Faturado, Recebido; Orçado, Comprometido, Realizado).
- Números de exemplo (R$ 8 mil, 22%, 19%, R$ 500 mil) são ilustrativos e ficam marcados como tal nas notas do apresentador.
- Nunca inventar equipe, template, WhatsApp, Microsoft, "manutenção", preço pós-90 dias, infra ao lado do fee.
- Sem "não X, é Y". Sem emoji. Sem hype.
- Perguntas de deixa ("qual dessas dói mais hoje?") vão para o último passo e para as notas.

## 7. Ciclo de autocrítica (entrar no personagem do Iago)

Antes de dar um slide por pronto, olhar cada passo da animação e responder, como ele responderia:

- Está harmônico ou tem algo grudado, cortado pela borda, desalinhado, sem respiro?
- Apareceu muita coisa de uma vez? Dá para quebrar em cliques ou em tempos?
- A ordem narrativa faz sentido? Primeiro aparece, depois conecta; a seta sai de quem age; o check só marca quando a bolinha chega.
- Algo apareceu do nada, sem suavidade?
- Está repetindo outro slide (a barra 22 para 9 já existe no slide 2 e no problema 2)?
- O título de cima conflita com um texto final?
- Alguma cor fora da paleta, travessão, seta em texto, emoji, ícone sem sentido?
- Funciona ao voltar? A saída do slide é a última visão?
- O texto tem a mesma informação da proposta, com os mesmos nomes?

Se qualquer resposta for ruim, corrigir e capturar de novo antes de mostrar.
