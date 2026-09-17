# Histórico slide a slide: os ajustes do Iago e o princípio que cada um virou

Revisão retroativa da conversa de 16 e 17/09/2026 (proposta AYRA OS). Para cada slide: o que ele pediu, o que corrigiu, e a regra geral que sai dali. Ler quando for fazer um slide parecido, ou para entender de onde veio uma regra do `metodo.md`.

## Antes dos slides: a proposta em texto

- "Não é pra montar sozinho. Vamos discutindo cada parte sem slide visual ainda, depois montamos tudo." Discutir seção por seção no chat; só escrever o arquivo quando ele mandar ("entra, agora escreva").
- "O slide cheio de texto é ruim. O slide é só pra apresentação, e um PDF nosso com a proposta em si." Dois artefatos: o PDF carrega o detalhe; o slide conta a história.
- Texto Feynman e `/human-text` sempre; sem travessão; parênteses só para explicar rápido ("vendido, faturado, recebido: explique entre parênteses").
- Quando um parágrafo fica "embolado": "pode ir pulando linha, ter tópicos". Listas com negrito no início.
- Estrutura veio dele (capa, resumo, Ayra e Netza, problemas, sistema, 3 meses, modelo e investimento). O resumo se escreve por último.
- Modelo comercial: um número só (célula), assinatura mensal, sem "manutenção", sem escopo fechado, sem preço pós-90 dias, infra nunca ao lado do fee. Ver memória `ayra-modelo-comercial`.

## Infra do deck (tema, fontes, engine)

- "Só a infra inicial: tema, cores, fontes." Nada de páginas antes de aprovar a base.
- Paleta vem do site do cliente (netzaeco.com.br): mint, branco, preto, bordas bem arredondadas. "Não tem nada de marrom."
- Fontes: testar pareamentos, mostrar em imagem, ele escolhe (Familjen Grotesk, Wix Madefor Display, Azeret Mono, DIN Next).
- Visualização em tempo real (dev server aberto para ele acompanhar).
- Reload pela URL tem que cair no "estado inicial" do slide (depois do check e do ícone), porque a animação de chegada é o fim do anterior.
- Texto antes de código: "agora vamos pensar como montar os slides, texto antes de código".

## Slide 1: capa

Pedidos, na ordem: só as duas marcas; foco em "AYRA OS"; subtítulo "proposta de desenvolvimento, ciclo de 90 dias"; logos dentro de um retângulo branco arredondado, pretas; a data no canto esquerdo; a bolinha da seta só aparece quando clica, e a pílula estende.

A transição virou o padrão do deck, descrita por ele quadro a quadro: o braço da pílula estica até sumir na borda direita; o slide inteiro arrasta para a esquerda com um retângulo extra de borda arredondada; o novo entra pela direita trazido pela seta invertida; a pílula encolhe tapando as logos (mascarando, não ficando por baixo); dá o check; estica de novo enquanto "AYRA OS" aparece letra por letra; o check morfa no ícone do slide; termina compacta. "Ajusta a volta": o caminho inverso igual, como voltar no tempo.

Regras: a cor da pílula muda com o fundo no momento do check (fundo mint → pílula preta; branco → mint; preto → branca). Tudo que ele descreve em tempos vira uma sequência com durações nomeadas.

## Slide 2: lugares

- Título: "Hoje o negócio vive em quatro lugares" e ", principalmente" entra depois, empurrando o ponto. Testou parênteses, voltou para vírgula porque quebrava linha.
- Espaço branco embaixo vira uma história em cenas: orçamento → decisões → sem sistema → só descobre no final. À esquerda um ícone por cena, num quadradinho fixo que só troca o glifo (com animação), e o texto troca junto, suave.
- Indicador de margem à direita: barra preta (orçamento) com parte verde (margem) que diminui; alinhada com a borda do último card; surge do chão com bounce; número contando; sem vermelho, só uma pulsada quando baixa.
- "Não está animando pra aparecer, a barrinha" → era o `AnimatePresence initial={false}` do Deck engolindo `initial`. Animar imperativo ou por estado.

## Slide 3: telefone

- "Começa vazio, sem o retângulo preto, sem as duas logos. Só o título." A animação acontece no espaço, não dentro de uma caixa.
- Placas pretas com o nome escrito (Netza&Co, AYRA One), não a logo.
- 20 fornecedores com 20 ícones distintos (evento, comida, som...), não o mesmo repetido.
- AYRA é o inverso: quadrado grande à esquerda (ícone de orquestração), tiles pequenos à direita nomeados (unidade 1, parceiro 2, freelancer 3). Ícone tem que fazer sentido: "uma mala é de viagem".
- Alinhar o ícone grande com os pequenos (o texto embaixo desalinhava).
- Fragmentos saem recolhendo para a esquerda junto com o slide.

## Slide 4: clientes

Padrão "narrado": texto digitado com trecho sublinhado; a cena reage a dois gatilhos (começo do sublinhado = `hint`, ponto final = `typed`).

- Cena 1: pílulas de origem aparecem suaves quando começa o "porque"; no ponto final, roleta desacelerando até parar em "parceiro"; a linha estica devagar, acelera e para com bounce; o cliente dá pop.
- "Ficou muita coisa de uma vez": primeiro escreve, depois cada coisa no seu gatilho.
- Cena 2: mesmo princípio; a linha "só tinha que esticar" (não trocar por outra estática).
- Cena 3: card verde só com ícone e "Cliente" no sublinhado; no ponto final expande em três tempos (3 negócios, R$ 1,2 mi, margem 19%), depois brotam os cardzinhos um por vez.

## Slide 5: fatia (participantes)

- Degradê branco→verde rejeitado: "essas cores fogem da paleta".
- Ideia dele: cada coisa visível é um cardzinho à esquerda; pessoa à direita com crachá; por persona, acende o que ela vê e apaga o resto; texto explicando embaixo; no fim, tudo some e um texto fecha.
- Ajustes: o crachá aparece uma vez e fica parado; só o conteúdo interno troca; o cordão cresce junto com o primeiro crachá; a descrição entra junto com o cargo.
- "O título de cima conflita com o texto final": no fechamento, troca o título e faz o corpo visual (cinco cards de persona com os seis ícones acesos ou apagados). Sem segundo texto grande.
- "A saída do slide tem que ser a última visão": o painel que sai congela o passo (engine). E "confere nos anteriores também".
- Transição errada de claro para escuro: o painel claro herdava o fundo do palco → classe `theme-light` explícita.

## Slide 6: eixos

- "Eu não entendi porcaria nenhuma": cada eixo é uma linha com as pílulas dos estados, como estava na versão alinhada. Reler a proposta e resumir cada estado em uma frase curta.
- Pílula, linha, pílula: a pílula aparece, a linha sai de dentro dela e corre, a próxima só aparece quando a linha chega.
- Frase flutuante numa coluna fixa à direita, troca a cada estado, desce virando "…" ao mudar de eixo.
- "O controle tá ruim": um clique por pílula, por rótulo, por decisão. Estado derivado do passo; avançar rápido completa a linha anterior.
- Decisões gradual: uma frase por decisão, e a frase final "cada uma mexe no orçamento; o problema é não saber, na hora, o impacto na margem".
- Fechamento: nada de cards soltos nem travessão. Mudo por cor (não por opacidade, que deixa a linha aparecer por baixo); destaque é a cor normal, sem anel; separador vertical animado e blocos de texto ao lado; centralizado com as três trilhas; respiro.

## Slide 7: decisões e informação

- Quatro cenas narradas: promessa que já custou; a montagem descobre; anotada é decisão, não anotada é surpresa; o núcleo do sistema (registro linha a linha e margem atualizando).
- "O indicador da margem surge antes das outras coisas, do nada": ordem certa (montagem, etiqueta, depois o indicador subindo suave), e a etiqueta só cai depois que o indicador terminou de subir.

## Slide 8: problemas

- Abertura: título "Oito problemas.", os oito cardzinhos entram em sequência; ao clicar, "E o que o sistema faz." aparece junto com a fileira descendo; quando pousa, o primeiro cardzinho enche de preto de baixo para cima (ícone enchendo de verde) e o card preto sobe junto com a vinheta. Tudo num clique só, mas nessa ordem.
- Foco: card preto do problema à esquerda, vinheta da dor à direita; no clique, o card some, a vinheta da solução entra no lugar dele e o card verde à direita.
- Vinheta 1: "lucro: ?" alinhado com o primeiro card desde a primeira nota; na última nota o "?" morfa no número, que cresce, viaja até o canto direito e fica verde. Sem seta.
- Solução 1: número da margem e barrinha preta com preenchimento verde, animando juntos a cada versão.
- Problema 2: "não tá redundante?" → reler a proposta: o 1 é sobre o tempo, o 2 é sobre o dinheiro (R$ 500 mil, 110 contra 45, os 65 que saíram). Solução 2: alerta e bloqueio como notas discretas empilhadas, não pílulas que tomam a coluna.
- Problema 3: unidade A, cliente, linha; unidade B, linha; só então o "?" . Solução 3 em duas fases: parceiro X e unidade Y; cliente; seta do parceiro ao cliente; negócio 1 nasce; setas saem do negócio para parceiro e cliente; depois para a unidade; fase 2: rastro fraco, unidade chama o cliente, negócio 2 nasce e se liga ao cliente e à unidade. "Essas animações importam": uma seta por vez, na ordem.
- Problema 4: "vários lugares" com reticências (o slide 2 diz quatro). Solução: caixa AYRA OS é o mesmo card; a tampa é a faixa de cima presa no canto direito, abre 30° para cima; pílulas no chão entram uma por vez em meia parábola, encolhendo, por baixo da tampa, somem atrás do corpo; tampa fecha e a caixa centraliza.
- Problema 5: comercial faz as etapas (abordagem, briefing, solução, orçamento, proposta, negociação, contrato), empacota num ícone de informação (só ele, sem "cliente + mais"); na dor duas coisas ficam de fora; na solução a produção devolve com alerta, o comercial completa, cadeado abre. Nuvens rápidas e flutuando; depois ritmo normal. Nuvem compacta, dentro da coluna.
- Problema 6: três parceiros com balões diferentes e a pergunta "quanto tenho a receber?"; portal e ranking por dado.
- Problema 7: resultados como joinha, neutro, joinha para baixo (ícones, nunca emoji); bolinha numerada que desce de um portal; a etapa só marca quando a bolinha chega; labels centralizadas sob os círculos; notas empilhadas e centralizadas com ícone.
- Problema 8: pessoa no centro; nuvem compila num cérebro acima que entra nela; porta pequena à direita com os motivos; entra na porta; pessoa nova no centro com as perguntas. Solução: o cérebro vai para o histórico da AYRA; a pessoa nova recebe a recomendação.
- "Toda hora errando o respiro": posicionar por quadrantes com largura calculada; conferir 1:1. Virou a memória `slides-layout-vinhetas` e a seção 5 do método.

## Slide 9: sistema

- O slide "dia a dia" que eu criei era resumo do 8 → removido; a frase honesta ("essas dores são a nossa leitura, vale conferir uma a uma") foi para a grade final do 8. Regra: se um slide resume outro, ele vira o último passo do outro.
- Sem print do Excalidraw: diagrama montado peça a peça, um clique por peça.
- Primeira versão espalhada, com cotovelos, rótulos em cima das linhas: "refaz, muito espalhado". Organizar em faixas (canais de acesso, núcleo, infraestrutura) com setas verticais curtas, como as lanes do Excalidraw.
- "As pílulas grudadas no título do card": respiro interno igual ao padding das bordas; card com duas fileiras de chips precisa de altura para a margem de baixo. "Isso é coisa clássica, olhando a imagem você tinha que sacar."
