# PRD: Background Dinâmico (Animated Mesh Gradient)
1. Objetivo do Documento
Implementar um plano de fundo dinâmico composto por um gradiente de 3 cores em movimento circular contínuo, posicionado atrás de todo o conteúdo do portfólio.

2. Especificação Técnica (Camada de Estilo)
- Elemento de Interface: Criar uma div com classe .bg-dynamic-container logo após a abertura da tag <body>.

- Configuração de Cores (3 Cores):
  - Cor A: #3b82f6 (Azul Primário do projeto).
  - Cor B: #1e40af (Azul Escuro para profundidade).
  - Cor C: #60a5fa (Azul Claro para brilho).

- Efeito de Movimento (Animation Logic):
  - Utilizar filter: blur(80px) para suavizar a transição entre as cores.
  - Criar 3 esferas de gradiente radial que se movem em órbitas diferentes usando @keyframes.

3. Fluxo de Execução (Step-by-Step para o Agente)
- HTML Injection: Adicionar <div class="bg-wrapper"><div class="blob color-1"></div><div class="blob color-2"></div><div class="blob color-3"></div></div> no início do arquivo.

- CSS Layout: * Definir .bg-wrapper como position: fixed, top: 0, left: 0, width: 100%, height: 100%, z-index: -1 e overflow: hidden.

- Aplicar background-color: var(--dark-bg) como base para manter a integridade do tema.

- Animation Design:
  - Criar @keyframes rotate para mover cada "blob" de cor de forma independente (uma em sentido horário, outra anti-horária e a terceira em elipse).
  - Garantir que a opacidade de cada cor seja baixa (ex: 0.4) para não prejudicar a leitura do texto.

4. Regras de Negócio e Restrições
- Interferência Zero: O container de background deve ter pointer-events: none para não bloquear cliques em links ou botões.
- Performance: Não utilizar bibliotecas de terceiros (como Three.js ou PixiJS); a tarefa deve ser resolvida apenas com CSS puro para garantir carregamento instantâneo.
- Persistência de Tema: No modo Light, o agente deve reduzir a opacidade das cores ou usar tons pastéis para manter o contraste do texto escuro.