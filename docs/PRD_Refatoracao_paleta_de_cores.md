# PRD: Refatoração de Paleta Híbrida (Slate & Indigo Professional)
1. Objetivo do Documento
Implementar uma paleta de cores consistente e elegante que se adapte perfeitamente aos modos Dark e Light, utilizando tons de ardósia (Slate) e índigo para criar uma hierarquia visual clara.

2. Especificação Técnica (Mapeamento de Variáveis)
As cores abaixo foram escolhidas para garantir que o contraste de texto e componentes seja mantido em ambos os temas.

2.1. Tema Escuro (Default)
- --bg-primary: #0F172A (Azul ardósia profundo).

- --bg-secondary: #1E293B (Destaque sutil para cards).

- --text-primary: #F8FAFC (Branco acinzentado).

- --primary-color: #6366F1 (Índigo vibrante para botões e ícones).

- --accent-color: #818CF8 (Índigo claro para hovers).

2.2. Tema Claro (Light Mode)
Ao ativar a classe .light-theme, o agente deve remapear as variáveis para:

- --bg-primary: #F8FAFC (Fundo extremamente limpo).

- --bg-secondary: #FFFFFF (Cards brancos puros para criar elevação com sombra).

- --text-primary: #0F172A (Texto em azul ardósia profundo para máximo contraste).

- --primary-color: #4F46E5 (Índigo mais denso para manter a legibilidade no fundo claro).

- --accent-color: #4338CA (Tom mais escuro para hovers no modo claro).

3. Fluxo de Execução (Step-by-Step para o Agente)
    1 - Refatoração do :root: Atualizar o arquivo style.css com o novo bloco de variáveis acima.

    2 - Lógica de Elevação (Sombras):

    - No modo Dark, os cards devem ter uma borda sutil: border: 1px solid #334155.

    - No modo Light, os cards devem ganhar uma sombra suave em vez de borda: box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1).

    3 - Botões e Interatividade:

    - Implementar transição suave de 0.3s para todas as mudanças de cor.

    - Garantir que o botão de toggle de tema mude de ícone (Lua para Sol) e cor conforme o estado.

    4 - Ajuste de Transparência:

    - Elementos secundários no modo claro devem usar opacidade menor (ex: #64748B para --text-secondary).

4. Regras de Negócio e Restrições
    1 - Consistência de Marca: O índigo (--primary-color) deve ser a única cor de destaque para manter o portfólio minimalista e profissional.

    2 - Acessibilidade: O agente deve validar se o contraste entre o texto e o fundo em ambos os modos segue o padrão WCAG AA.

    3 - Isolamento: Não alterar margens, paddings ou fontes; a tarefa é puramente cromática e de estilo de superfície.