'use strict';

//============ Navbar background color ===============
const navbar = document.getElementById('navbar');

const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--visible');
  } else {
    navbar.classList.remove('navbar--visible');
  }
});

//============ Scrolling to a correct section =========

const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (e) => {
  scrollInto(e);
});

//======== Scrolling to a contact section ========

const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', (e) => {
  scrollInto(e);
});

//======= Scrolling helper function ==========

function scrollInto(e) {
  const targetLink = e.target.dataset.link;
  const scroll = document.querySelector(targetLink);
  targetLink && scroll.scrollIntoView({ behavior: 'smooth' });
}

// ===== Fading Home section ====

const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  if (window.scrollY < homeHeight) {
    home.style.opacity = 1 - window.scrollY / homeHeight;
  }
});

// ============ move up =============

const upArrow = document.querySelector('.up-arrow');

document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    upArrow.classList.add('up-arrow--visible');
  } else {
    upArrow.classList.remove('up-arrow--visible');
  }
});

upArrow &&
  upArrow.addEventListener('click', () => {
    home.scrollIntoView({ behavior: 'smooth' });
  });
