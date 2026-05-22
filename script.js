// --- 1. Dynamic Year in Footer ---
document.getElementById('year').textContent = new Date().getFullYear();


// --- 2. Nav: Shrink on Scroll ---
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });


// --- 3. Mobile Nav Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// --- 4. Scroll-Triggered Reveal (.reveal elements) ---
const revealElements = document.querySelectorAll(
  '.about-grid, .contact-inner, .footer, .project-item, .section-label, .section h2'
);

// Add reveal class to these elements
revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));


// --- 5. Skill Cards: Staggered Reveal ---
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

skillCards.forEach(card => skillObserver.observe(card));


// --- 6. Active Nav Link Highlight on Scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--ink)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));


// --- 7. Project Items: Hover Lift ---
const projectItems = document.querySelectorAll('.project-item');

projectItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.paddingLeft = '0.75rem';
    item.style.transition = 'padding 0.2s ease';
  });
  item.addEventListener('mouseleave', () => {
    item.style.paddingLeft = '0';
  });
});


// --- 8. Smooth Scroll Polyfill for older browsers ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
