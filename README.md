# Desafio Unvoid Chess Game

Este projeto é a implementação de um desafio front-end que consiste em criar um jogo de tabuleiro semelhante a xadrez, com peças e regras personalizadas. Escolhi a opção de realizar em React.

**Repositório:** [https://github.com/ytonykaku/unvoid_challenge](https://github.com/ytonykaku/unvoid_challenge)

## Funcionalidades Implementadas

* **Tabuleiro Dinâmico e Responsivo:** O tabuleiro pode ser redimensionado pelos jogadores, suportando dimensões de 6x6 a 12x12, incluindo formatos irregulares como 6x7, e adapta-se a diferentes tamanhos de ecrã.
* **Peças com Regras Únicas:** Foram implementadas as três peças do jogo (Developer, Designer, Product Owner) com as suas regras de movimento (que ficou quebrado rs).
* **Jogabilidade Interativa Completa:**
    * Sistema de turnos entre;
    * Seleção de peças com feedback visual.
    * Destaque das casas de destino possíveis para a peça selecionada.
    * Lógica de movimento e captura de peças adversárias.
* **Componentes de Alta Fidelidade (utilizando plugin do Figma para extrair detalhes):**
    * Peças renderizadas a partir de assets, correspondendo ao protótipo.

## O Processo de Desenvolvimento

O projeto foi construído de forma iterativa e organizada, seguindo boas práticas de desenvolvimento front-end.

* **Arquitetura de Componentes:** A interface foi dividida em componentes reutilizáveis (Board, Tile, Piece, Button, SizeSelector), cada um com a sua responsabilidade.
* **Desenvolvimento Orientado a Funcionalidades (Feature Branching):** Cada nova funcionalidade foi desenvolvida na sua própria branch, garantindo que a branch main estivesse sempre estável.
* **Implementação Incremental:**
    * UI estática -> gestão de estado e lógica de interatividade -> refinar UI ->  funcionalidades avançadas
* **Problemas durante o desenvolvimento:** "Hydration Errors", o que necessitou a separação de funcionalidades de maneira mais adequada

## Como Executar o Projeto

```bash
git clone [https://github.com/ytonykaku/unvoid_challenge.git](https://github.com/ytonykaku/unvoid_challenge.git)
cd unvoid_challenge
npm install
npm run dev