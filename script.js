const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn ? menuBtn.querySelector("i") : null;

if (menuBtn && navLinks && menuBtnIcon) {
  menuBtn.addEventListener("click", (e) => {
    navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");
    menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  navLinks.addEventListener("click", (e) => {
    navLinks.classList.remove("open");
    menuBtnIcon.setAttribute("class", "ri-menu-line");
  });
}

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

const banner = document.querySelector(".banner__container");
if (banner) {
  const originalItems = Array.from(banner.children);
  const duplicateRounds = 2; // duplicate to increase quantity (original + 2x clones)
  for (let r = 0; r < duplicateRounds; r += 1) {
    originalItems.forEach((item) => {
      const duplicateNode = item.cloneNode(true);
      duplicateNode.setAttribute("aria-hidden", true);
      banner.appendChild(duplicateNode);
    });
  }
}

ScrollReveal().reveal(".arrival__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".sale__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".sale__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".sale__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__content h4", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".sale__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".favourite__card", {
  ...scrollRevealOption,
  interval: 500,
});

// Simple per-card carousel (three images per card)
document.querySelectorAll('[data-carousel="inner"]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel__track');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = carousel.querySelector('.carousel__btn--prev');
  const nextBtn = carousel.querySelector('.carousel__btn--next');
  const dotsContainer = carousel.querySelector('.carousel__dots');
  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  // Build dots if container exists
  let dots = [];
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); goTo(i); });
      dotsContainer.appendChild(dot);
    });
    dots = Array.from(dotsContainer.children);
  }

  let index = 0;
  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const step = slideWidth + gap;
    track.style.transform = `translateX(-${index * step}px)`;
    if (dots.length) dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    goTo(index - 1);
  });
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    goTo(index + 1);
  });

  window.addEventListener('resize', update);
  update();
});

// Full-width outer carousel for product cards
// Outer products carousel removed (reverted to grid)