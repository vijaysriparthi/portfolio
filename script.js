// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== LOADING SCREEN =====
  const loadingScreen = document.getElementById('loadingScreen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 800);
  });

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');
  function createParticles() {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('.section, .hero');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinksAll.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('mobile-open');
    });
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-moon';
    } else {
      themeIcon.className = 'fas fa-sun';
    }
  }

  // ===== TYPEWRITER EFFECT =====
  const typewriterEl = document.getElementById('typewriterText');
  const phrases = [
    'Embedded Systems Engineer',
    'Firmware Developer',
    'Robotics Systems Engineer',
    'RTOS & IoT Specialist',
    'Defence Automation Expert'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing new phrase
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.hero-stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      function updateCounter() {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      }
      updateCounter();
    });
  }

  // Trigger counters when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('home');
  if (heroSection) heroObserver.observe(heroSection);

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  // ===== SKILL BARS ANIMATION =====
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ===== TILT EFFECT ON PROJECT CARDS =====
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== MAGNETIC BUTTON EFFECT =====
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ===== SMOOTH SCROLL FOR NAV LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn-primary');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== PARALLAX ON HERO ELEMENTS =====
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImg = document.querySelector('.hero-image-container');
    const heroGrid = document.querySelector('.hero-grid-bg');
    if (heroImg && scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
    if (heroGrid && scrollY < window.innerHeight) {
      heroGrid.style.transform = `translate(${scrollY * 0.02}px, ${scrollY * 0.02}px)`;
    }
  });

  // ===== SKILL TAG HOVER RIPPLE =====
  document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = (index * 0.05) + 's';
  });

  // ===== CONSOLE EASTER EGG =====
  console.log(
    '%c🚀 Sai Prudhvi Bodempudi — Portfolio',
    'color: #8b5cf6; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cData Scientist | AI Engineer | Building the future with AI',
    'color: #06b6d4; font-size: 14px;'
  );

});
