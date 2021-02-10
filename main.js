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
  const target = e.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  menus.classList.remove('nabar__menu--visible');
  navbar.classList.remove('navbar-bg');
  link && scrollInto(link);
});

//======== Scrolling to a contact section ========

const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
  scrollInto('#contact');
});

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
    scrollInto('#home');
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

// =======Active navbar menu item ===============
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const sectionIds = [
  '#home',
  '#about',
  '#skills',
  '#project',
  '#demo',
  '#contact',
];
const sections = sectionIds.map((sectionId) =>
  document.querySelector(sectionId)
);
const navbarMenus = sectionIds.map((sectionId) =>
  document.querySelector(`[data-link="${sectionId}"]`)
);

let navbarMenuIndex = 0;
let selectedNavbarMenu = navbarMenus[0];

function selectMenu(selectedMenuItem) {
  selectedNavbarMenu.classList.remove('navbar__menu__item--active');
  selectedNavbarMenu = selectedMenuItem;
  selectedNavbarMenu.classList.add('navbar__menu__item--active');
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const findIndex = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        navbarMenuIndex = findIndex + 1;
      } else {
        navbarMenuIndex = findIndex - 1;
      }
    }
  });
}, options);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY === 10) {
    navbarMenuIndex = 0;
  } else if (
    window.scrollY + window.innerHeight >=
    document.body.clientHeight
  ) {
    navbarMenuIndex = navbarMenus.length - 1;
  }
  selectMenu(navbarMenus[navbarMenuIndex]);
});

//======= Scrolling helper function ==========

function scrollInto(targetLink) {
  const scroll = document.querySelector(targetLink);
  targetLink && scroll.scrollIntoView({ behavior: 'smooth' });
  selectMenu(navbarMenus[sectionIds.indexOf(targetLink)]);
}

//=======modal & play da video=============================
const videoList = document.querySelector('.demo__videos');
const modal = document.querySelector('.demo__video__modal');
const modalStyle = document.querySelector('.demo__video__style');
const closeBtn = document.querySelector('.demo__video__close');
const playVideo = document.getElementById('ytplayer');

function myFunction(videoId) {
  playVideo.src = `https://www.youtube.com/embed/${videoId}`;
  modal.style.display = 'block';
}

window.onclick = function (event) {
  if (event.target == modal || event.target == modalStyle) {
    playVideo.src = '';
    modal.style.display = 'none';
  }
};

closeBtn.addEventListener('click', () => {
  playVideo.src = '';
  modal.style.display = 'none';
});
