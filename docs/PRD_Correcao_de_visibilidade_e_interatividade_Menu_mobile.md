# PRD: Correção de Visibilidade e Interatividade do Menu Mobile
1. Objetivo do Documento
Corrigir o erro de renderização onde o menu de navegação (modal/sidebar) não aparece ou fica invisível em dispositivos móveis (< 768px), garantindo total funcionalidade do sistema de temas.

2. Especificação Técnica (Debugging)
- Z-Index Layering: O .nav-menu deve possuir um z-index superior a todos os outros elementos, incluindo o novo background dinâmico e o cabeçalho fixo.

- Visibilidade de Estado: A propriedade left: -100% combinada com o seletor :checked deve ser validada para garantir que o menu deslize corretamente para left: 0.

- Contraste de Tema no Mobile: As cores dos links no menu mobile devem seguir as variáveis --text-primary do tema ativo para evitar que o texto fique invisível contra o fundo.

3. Fluxo de Correção (Step-by-Step)
    1 - CSS Fix - Posicionamento:

        - Definir .nav-menu com z-index: 1001 (acima da .header que está em 1000).
        - Garantir que o background-color do menu mobile use var(--bg-primary) de forma sólida, sem transparência excessiva.

    2 - JS Fix - Event Listener:

        - Verificar se ao clicar em um link .nav-link, o checkbox #menu-toggle é desmarcado (checked = false) para fechar o menu automaticamente.

    3 - UI/UX Mobile:

        - Inserir o botão de toggle de tema visível mesmo com o menu aberto, ou dentro do próprio menu mobile para facilitar o acesso.

4. Restrições e Testes
    - No-Scroll: Ao abrir o menu, o body deve receber temporariamente overflow: hidden via JavaScript para evitar que a página role por trás do menu.

    Touch Target: Garantir que o ícone do menu sanduíche (.menu-icon) tenha uma área de clique de no mínimo 44px x 44px.