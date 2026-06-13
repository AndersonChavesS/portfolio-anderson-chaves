# 🚀 Portfólio Anderson Chaves

<div align="center">

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

Portfólio pessoal moderno e responsivo, construído com **React + TypeScript + Vite**, com efeito de partículas interativo inspirado no Antigravity, suporte a temas claro/escuro/sistema e formulário de contato funcional.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AndersonChavesS)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/developer-anderson-chaves/)

</div>

---

## 📋 Sobre o Projeto

Este é meu portfólio pessoal desenvolvido como parte do programa **Alpha edtech - Turma 7 Selene**, apresentando minha trajetória como aspirante a desenvolvedor full-stack. O projeto passou por uma migração completa de HTML/CSS/JS estático para uma aplicação React moderna.

**Destaques da versão atual:**

- 🎆 Efeito de partículas interativo com rastreamento do mouse (Canvas API)
- 🌙 Três modos de tema: **Claro**, **Escuro** e **Sistema** (segue o OS)
- 📬 Formulário de contato funcional com validação completa e envio real via **Formspree**
- 🔒 Segurança aplicada: CSP, sanitização de inputs, rate limiting e honeypot anti-bot
- ✨ Glassmorphism, micro-animações e scroll reveal

---

## 🎯 Funcionalidades

### 🎨 Design & Experiência Visual

- Efeito de **partículas Antigravity** — partículas que fogem do cursor com física orgânica e se conectam por linhas
- **Glassmorphism** em cards com backdrop-filter e bordas semi-transparentes
- **Avatar animado** na Hero com anel giratório de gradiente cônico
- **Scroll reveal** — elementos animam ao entrar no viewport
- **Título com gradiente animado** e badge de disponibilidade pulsante
- Tipografia premium: **Inter** + **Space Grotesk** (Google Fonts)

### 🌙 Sistema de Temas

| Modo | Comportamento |
|------|--------------|
| **Claro** | Fundo branco, partículas escuras |
| **Escuro** | Fundo quase-preto, partículas neon púrpura |
| **Sistema** | Segue automaticamente `prefers-color-scheme` do OS |

Preferência salva no `localStorage` e persistida entre sessões.

### 📬 Formulário de Contato

- Validação campo a campo com feedback visual em tempo real (`onBlur`)
- Ícones de ✅ sucesso / ❌ erro dentro de cada campo
- Contador de caracteres na mensagem (alerta ao aproximar de 2000)
- Estados do botão: Enviar → ⏳ Enviando... → ✅ Mensagem enviada!
- Alerta de erro de rede com botão de fechar
- Envio real via **Formspree** para o e-mail do autor

### 🔒 Segurança

- **Honeypot** — campo oculto que captura bots silenciosamente
- **Rate Limiting** — máx. 1 envio/30s e 3 envios/hora (via `localStorage`)
- **Sanitização de inputs** — remove HTML, scripts e chars perigosos antes do envio
- **Content Security Policy (CSP)** — bloqueia scripts/conexões de origens não autorizadas
- **Referrer-Policy: strict-origin-when-cross-origin** — previne vazamento de URL
- **X-Content-Type-Options: nosniff** — previne ataques de MIME sniffing
- `maxLength` em todos os inputs como segunda camada de defesa

### 📱 Responsividade

- Layout **Mobile First** com grid adaptativo
- Menu hambúrguer com animação para telas menores que 900px
- Seções Hero, About e Contact recolhem para coluna única no mobile

---

## 🛠️ Tecnologias

### Core

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [React](https://react.dev) | 19 | Biblioteca UI principal |
| [TypeScript](https://www.typescriptlang.org) | 5.7 | Tipagem estática |
| [Vite](https://vitejs.dev) | 6 | Build tool e dev server |

### Bibliotecas & Serviços

| Nome | Uso |
|------|-----|
| [Formspree](https://formspree.io) | Envio de e-mails do formulário de contato |
| [Font Awesome 6](https://fontawesome.com) | Ícones via CDN |
| [Google Fonts](https://fonts.google.com) | Inter + Space Grotesk |

### APIs Web Nativas

- **Canvas API** — efeito de partículas
- **IntersectionObserver** — scroll reveal e active nav link
- **localStorage** — persistência de tema e rate limiting
- **matchMedia** — detecção do tema do sistema

---

## 📁 Estrutura do Projeto

```
portfolio-anderson-chaves/
│
├── public/
│   └── images/                      # Imagens estáticas servidas pelo Vite
│
├── src/
│   ├── components/
│   │   ├── ParticleCanvas.tsx        # Efeito de partículas (Canvas + mouse)
│   │   ├── Navbar.tsx                # Navbar com tema dropdown e menu mobile
│   │   ├── Hero.tsx                  # Seção Hero com avatar animado
│   │   ├── About.tsx                 # Seção Sobre com stats e timeline
│   │   ├── Skills.tsx                # Seção Habilidades com cards
│   │   ├── Projects.tsx              # Seção Projetos com cards e links
│   │   ├── Contact.tsx               # Formulário de contato completo
│   │   └── Footer.tsx                # Rodapé
│   │
│   ├── hooks/
│   │   ├── useTheme.tsx              # Context + provider para dark/light/system
│   │   ├── useContactForm.ts         # Lógica completa do formulário
│   │   └── useScrollReveal.ts        # IntersectionObserver para animações
│   │
│   ├── utils/
│   │   ├── sanitize.ts               # Sanitização de inputs (anti-XSS)
│   │   └── rateLimit.ts              # Rate limiting via localStorage
│   │
│   ├── App.tsx                       # Composição da aplicação
│   ├── main.tsx                      # Entry point React
│   └── index.css                     # Design system completo (tokens + temas)
│
├── docs/                             # Backup da versão estática original
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env.example                      # Template de variáveis de ambiente
├── .gitignore
├── index.html                        # Entry point HTML (com headers de segurança)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) **v18+**
- npm (incluído com o Node.js)
- Git

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/AndersonChavesS/portfolio-anderson-chaves.git

# 2. Entre na pasta
cd portfolio-anderson-chaves

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** no navegador.

### Scripts disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento com HMR
npm run build    # Gera build de produção em /dist
npm run preview  # Pré-visualiza o build de produção
```

---

## 🔧 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha com seus valores:

```bash
cp .env.example .env
```

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/SEU_ID_AQUI
```

> O endpoint do **Formspree** é necessário para que o formulário de contato envie e-mails. Crie uma conta gratuita em [formspree.io](https://formspree.io) para obter o seu.

---

## 📚 Projetos em Destaque

1. **HTML e CSS Explorer sem limites**
   - Estudo aprofundado de HTML5, CSS3 e JavaScript com layouts responsivos
   - [Ver Projeto →](https://andersonchavess.github.io/HTML-e-CSS-Explorer-sem-limites/)

2. **Alpha Learning — Projeto Markdown**
   - Documentação de aprendizados do programa Alpha edtech em Markdown
   - [Ver Projeto →](https://andersonchavess.github.io/Alpha-Learning/)

3. **Business Trader — Alta Performance**
   - Website institucional fictício para empresa de consultoria em trading Forex
   - [Ver Projeto →](https://andersonchavess.github.io/business-trader-versao-estudo/)

---

## 📌 Histórico de Versões

| Versão | Descrição |
|--------|-----------|
| **v2.0** | Migração para React 19 + TypeScript + Vite. Efeito Antigravity, temas dark/light/system, formulário funcional e segurança |
| **v1.0** | Versão estática em HTML5, CSS3 e JavaScript puro (disponível em `/docs`) |

---

## 👨‍💻 Autor

**Anderson Chaves**
Aspirante a Desenvolvedor Full-Stack | Alpha edtech — Turma 7 Selene

📧 `andersonmaiconchaves@gmail.com`
📍 Itaituba, PA — Brasil

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AndersonChavesS)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/developer-anderson-chaves/)

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um **Fork** do projeto
2. Crie uma branch: `git checkout -b feature/minha-feature`
3. Commit seguindo Conventional Commits: `git commit -m "feat: adicionar X"`
4. Push: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

### ⭐ Se você gostou deste projeto, considere dar uma estrela!

**Feito com 💜 e muito ☕ por Anderson Chaves**

</div>
