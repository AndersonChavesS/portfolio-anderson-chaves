 document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          document.getElementById('menu-toggle').checked = false;
        });
      });