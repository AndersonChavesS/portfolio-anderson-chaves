## PRD: Otimização de Responsividade (Mobile-First)
1. Objetivo do Documento
Refatorar a folha de estilo para garantir que o layout seja adaptável em quatro breakpoints principais, garantindo que nenhum elemento ultrapasse 100vw.

2. Especificação de Design (Breakpoints)
- Mobile (< 768px): Menu sanduíche ativo, Hero section em coluna, botões ocupando 100% da largura do container.

- Tablet (768px - 1024px): Projetos em grid de 2 colunas, navegação horizontal básica.

- Desktop (> 1024px): Layout original preservado com ajuste de max-width: 1200px.

3. Requisitos de Implementação
- Overflow Check: Identificar e remover width fixos em elementos como .hero-content e .projeto-card.

- Flex/Grid Logic: Utilizar display: flex com flex-wrap: wrap em seções de conteúdo para evitar quebras abruptas.

- Menu Mobile: Garantir que o nav-menu cubra a viewport corretamente e feche ao clicar em um link.