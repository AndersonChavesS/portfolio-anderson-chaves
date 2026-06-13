/* =========================================
   MENU SANDUÍCHE (Mobile-First)
   PRD: Garante que o nav-menu cubra a viewport
        corretamente e feche ao clicar em um link
   ========================================= */
const menuToggle = document.getElementById('menu-toggle');
const navMenu   = document.querySelector('.nav-menu');

/**
 * Fecha o menu mobile e restaura o scroll do body.
 */
function closeMenu() {
  menuToggle.checked = false;
  document.body.style.overflow = '';
}

/* Fecha ao clicar em qualquer nav-link */
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* Trava/libera scroll do body conforme estado do menu */
menuToggle.addEventListener('change', () => {
  document.body.style.overflow = menuToggle.checked ? 'hidden' : '';
});

/* Fecha ao clicar fora do menu (no overlay escuro) */
document.addEventListener('click', (e) => {
  if (
    menuToggle.checked &&
    !navMenu.contains(e.target) &&
    !e.target.closest('.menu-icon') &&
    !e.target.closest('#menu-toggle')
  ) {
    closeMenu();
  }
});

/* =========================================
   SISTEMA DE TEMAS DARK / LIGHT
   Fluxo conforme PRD:
   1. Init  → lê localStorage e aplica classe
   2. UI    → atualiza ícone do botão
   3. Toggle → alterna classe e persiste estado
   ========================================= */

const THEME_KEY  = 'portfolio-theme';
const LIGHT_CLASS = 'light-theme';

const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = themeToggle.querySelector('.theme-icon');

/** Atualiza o ícone e o label de acessibilidade conforme o tema ativo */
function updateToggleUI(isLight) {
  themeIcon.textContent = isLight ? '🌙' : '☀️';
  themeToggle.setAttribute(
    'aria-label',
    isLight ? 'Alternar para tema escuro' : 'Alternar para tema claro'
  );
}

/* ----- 1. INIT: aplica o tema salvo ao carregar a página ----- */
(function initTheme() {
  const saved   = localStorage.getItem(THEME_KEY);
  const isLight = saved === LIGHT_CLASS;

  if (isLight) {
    document.body.classList.add(LIGHT_CLASS);
  }

  updateToggleUI(isLight);
})();

/* ----- 3. TOGGLE EVENT: alterna tema e persiste no localStorage ----- */
themeToggle.addEventListener('click', () => {
  const isNowLight = document.body.classList.toggle(LIGHT_CLASS);

  localStorage.setItem(THEME_KEY, isNowLight ? LIGHT_CLASS : 'dark-theme');

  updateToggleUI(isNowLight);
});