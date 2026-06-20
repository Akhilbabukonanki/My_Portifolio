/* ─────────────────────────────────────────────────────────────
   AKHIL BABU KONANKI — PORTFOLIO JAVASCRIPT
   ───────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ──────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── HAMBURGER MENU ─────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    const isOpen = navLinks.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = navLinks.querySelectorAll('a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allNavLinks.forEach(a => a.classList.remove('active'));
        const active = navLinks.querySelector(`a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* Inject active style */
  const styleEl = document.createElement('style');
  styleEl.textContent = `.nav-links a.active { color: var(--accent) !important; background: var(--accent-light) !important; }`;
  document.head.appendChild(styleEl);

  /* ── SCROLL REVEAL (AOS-like) ───────────────────────────── */
  const animatedEls = document.querySelectorAll('[data-aos]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || '0', 10);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedEls.forEach(el => revealObserver.observe(el));

  /* ── HERO BADGE STAGGER ─────────────────────────────────── */
  const badges = document.querySelectorAll('.avatar-badge');
  badges.forEach((badge, i) => {
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    setTimeout(() => {
      badge.style.transition = 'all 0.4s ease';
      badge.style.opacity = '1';
      badge.style.transform = 'scale(1)';
    }, 600 + i * 150);
  });

  /* ── COUNTER ANIMATION ──────────────────────────────────── */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const numMatch = text.match(/[\d.]+/);
      if (!numMatch) return;
      const target = parseFloat(numMatch[0]);
      const suffix = text.replace(numMatch[0], '');
      const isDecimal = text.includes('.');
      let start = 0;
      const duration = 1200;
      const step = 16;
      const steps = duration / step;
      let current = 0;

      const timer = setInterval(() => {
        current++;
        const value = (target * current / steps);
        el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if (current >= steps) {
          el.textContent = text;
          clearInterval(timer);
        }
      }, step);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── CONTACT FORM ───────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBtn.disabled = true;
      sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...`;

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
        success.style.display = 'block';
        form.reset();
        setTimeout(() => { success.style.display = 'none'; }, 5000);
      }, 1800);
    });
  }

  /* Spin keyframe */
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(spinStyle);

  /* ── RESUME BUTTON ──────────────────────────────────────── */
  const resumeBtn = document.getElementById('resumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Replace with actual resume URL when available
      alert('📄 Resume download will be available soon!\nFor now, reach out at akhilbabukonanki@gmail.com');
    });
  }

  /* ── SMOOTH SCROLL for anchor links ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── SKILL TAGS hover ripple ─────────────────────────────── */
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
    });
  });

  /* ── PROGRESS BARS animate on view ──────────────────────── */
  const progressFills = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetW = el.style.width;
        el.style.width = '0';
        setTimeout(() => { el.style.width = targetW; }, 200);
        progressObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  progressFills.forEach(el => progressObserver.observe(el));

  /* ── CONTRIBUTION CELLS stagger animation ─────────────── */
  const cells = document.querySelectorAll('.contrib-cell');
  const cellObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cells.forEach((cell, i) => {
          setTimeout(() => {
            cell.style.transform = 'scale(1)';
            cell.style.opacity = '1';
          }, i * 30);
        });
        cellObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const ghSection = document.querySelector('.gh-contrib-visual');
  if (ghSection) cellObserver.observe(ghSection);

  /* ── TYPING EFFECT for hero subtitle ────────────────────── */
  const subtitle = document.querySelector('.hero-subtitle');
  if (subtitle) {
    const texts = [
      'Aspiring Java Full Stack Developer · Software Engineer · AI Enthusiast',
      'Building Scalable Web Apps with Java & Spring Boot',
      'Creating AI-Powered Solutions with React & MongoDB',
    ];
    let current = 0;
    let charIdx = 0;
    let deleting = false;

    function typeWriter() {
      const text = texts[current];
      if (!deleting) {
        charIdx++;
        subtitle.textContent = text.slice(0, charIdx);
        if (charIdx === text.length) {
          deleting = true;
          setTimeout(typeWriter, 2500);
          return;
        }
      } else {
        charIdx--;
        subtitle.textContent = text.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          current = (current + 1) % texts.length;
        }
      }
      setTimeout(typeWriter, deleting ? 35 : 55);
    }

    setTimeout(typeWriter, 1200);
  }

  console.log('✅ Akhil Babu Konanki Portfolio loaded successfully!');
  console.log('☕ Built with Java enthusiasm & React creativity.');
});
