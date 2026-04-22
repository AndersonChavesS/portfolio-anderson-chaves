## PRD: Sistema de Alternância de Temas (Dark/Light)
1. Objetivo do Documento
Implementar um sistema de temas dinâmico (Dark/Light) com persistência de estado via navegador, utilizando exclusivamente CSS Vanilla e JavaScript puro.

2. Especificação Técnica (Arquitetura)
- CSS Variable Mapping:

   - Extrair todos os hexadecimais de style.css para o seletor :root.

   - Variáveis obrigatórias: --bg-primary, --bg-secondary, --text-primary, --text-secondary, --border-color.

- Theme Switcher Logic:

    - Criar classe .light-theme que sobrescreva as variáveis acima com valores de alto contraste (fundo claro, texto escuro).

- Persistência (State Management):

    - Utilizar localStorage com a chave portfolio-theme para armazenar o estado atual.

3. Fluxo de Execução (Step-by-Step)

  1. Init: Ao carregar a página, verificar se existe valor em localStorage. Se sim, aplicar a classe ao body.

  2. UI Inject: Inserir um botão de toggle no HTML (dentro da .nav).

  3. Toggle Event: Ao clicar, alternar a classe .light-theme e atualizar o localStorage.