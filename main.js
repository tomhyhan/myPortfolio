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
  menus.classList.remove('nabar__menu--visible');
  navbar.classList.remove('navbar-bg');
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

// ======= filtering skills =============

const projectCategory = document.querySelector('.project__category');
const projects = document.querySelectorAll('.project');
const projectContainer = document.querySelector('.projects');

projectCategory.addEventListener('click', (e) => {
  const category =
    e.target.dataset.category || e.target.parentNode.dataset.category;

  //===== update active state ======

  const active = document.querySelector('.category__btn.active');
  active.classList.remove('active');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('active');

  //======== add animation to filter ================

  projectContainer.classList.add('animation-delay');

  setTimeout(() => {
    projects.forEach((project) => {
      if (category === 'all' || project.dataset.category === category) {
        project.classList.remove('project--visibility');
      } else {
        project.classList.add('project--visibility');
      }
    });
    projectContainer.classList.remove('animation-delay');
  }, 300);
});

//=========== manage URLs============

const blogUrl = document.querySelector('.blog-url');

blogUrl.addEventListener('click', () => {
  window.open('https://project-myblog.herokuapp.com/');
});

// =======Navbar toggle =================

const bars = document.querySelector('.navbar__bars');
const menus = document.querySelector('.navbar__menu');

bars.addEventListener('click', () => {
  menus.classList.toggle('nabar__menu--visible');
  navbar.classList.toggle('navbar-bg');
});
