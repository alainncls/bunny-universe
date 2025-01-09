document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const nav = document.querySelector('.nav');
  const body = document.body;

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  const navLinks = nav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
}); 