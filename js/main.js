/**
 * CRISTAL CLARO — Main JavaScript
 * Handles: navigation, form validation, scroll animations, cookie consent
 */

'use strict';

/* ── Utilities ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initActiveNavLink();
  initContactForm();
  initCookieBanner();
  initFooterYear();
  initSmoothScrollCTAs();
});

/* ── 1. Navigation ────────────────────────────────────────────
   Mobile hamburger toggle + close on link click / outside click
   ─────────────────────────────────────────────────────────── */
function initNavigation() {
  const toggle = $('#nav-toggle');
  const menu   = $('#nav-menu');
  const header = $('.site-header');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Header scroll shadow
  const handleScroll = () => {
    if (window.scrollY > 12) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ── 2. Active nav link on scroll ────────────────────────────── */
function initActiveNavLink() {
  const sections = $$('section[id], header[id]');
  const navLinks = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(sec => observer.observe(sec));
}

/* ── 3. Scroll animations (Intersection Observer) ─────────────── */
function initScrollAnimations() {
  // Skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('[data-animate]').forEach(el => el.classList.add('visible'));
    return;
  }

  const elements = $$('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ── 4. Contact Form ──────────────────────────────────────────── */
function initContactForm() {
  const form        = $('#contact-form');
  const submitBtn   = $('#submit-btn');
  const successMsg  = $('#form-success');
  const errorMsg    = $('#form-error-msg');

  if (!form) return;

  /* Validation rules */
  const rules = {
    'field-name': {
      required: true,
      minLength: 2,
      label: 'El nombre',
    },
    'field-contact': {
      required: true,
      custom: (value) => {
        const trimmed = value.trim();
        const isPhone = /^[\d\s\+\-\(\)]{7,}$/.test(trimmed);
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        return isPhone || isEmail
          ? null
          : 'Introduce un teléfono o correo electrónico válido.';
      },
    },
    'field-service': {
      required: true,
      label: 'El tipo de servicio',
    },
    'field-message': {
      required: true,
      minLength: 10,
      label: 'La descripción',
    },
    'field-privacy': {
      required: true,
      isCheckbox: true,
      errorMsg: 'Debes aceptar la política de privacidad para continuar.',
    },
  };

  function getError(id, el) {
    const rule = rules[id];
    if (!rule) return null;

    if (rule.isCheckbox) {
      return el.checked ? null : (rule.errorMsg || 'Campo obligatorio.');
    }

    const value = el.value.trim();

    if (rule.required && !value) {
      return `${rule.label || 'Este campo'} es obligatorio.`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return `${rule.label || 'Este campo'} debe tener al menos ${rule.minLength} caracteres.`;
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  }

  function showFieldError(el, errorSpan, message) {
    el.classList.add('invalid');
    el.classList.remove('valid');
    if (errorSpan) errorSpan.textContent = message;
  }

  function clearFieldError(el, errorSpan) {
    el.classList.remove('invalid');
    el.classList.add('valid');
    if (errorSpan) errorSpan.textContent = '';
  }

  /* Live validation on blur */
  Object.keys(rules).forEach(id => {
    const el        = $(`#${id}`);
    const errorSpan = $(`#error-${id.replace('field-', '')}`);
    if (!el) return;

    el.addEventListener('blur', () => {
      const err = getError(id, el);
      err
        ? showFieldError(el, errorSpan, err)
        : clearFieldError(el, errorSpan);
    });

    // Clear error on change
    el.addEventListener('input', () => {
      if (el.classList.contains('invalid')) {
        const err = getError(id, el);
        if (!err) clearFieldError(el, errorSpan);
      }
    });

    if (rules[id].isCheckbox) {
      el.addEventListener('change', () => {
        const err = getError(id, el);
        err
          ? showFieldError(el, errorSpan, err)
          : clearFieldError(el, errorSpan);
      });
    }
  });

  /* Form submit */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all
    let isValid = true;
    Object.keys(rules).forEach(id => {
      const el        = $(`#${id}`);
      const errorSpan = $(`#error-${id.replace('field-', '')}`);
      if (!el) return;
      const err = getError(id, el);
      if (err) {
        showFieldError(el, errorSpan, err);
        isValid = false;
      } else {
        clearFieldError(el, errorSpan);
      }
    });

    if (!isValid) {
      // Focus first invalid
      const firstInvalid = form.querySelector('.invalid');
      firstInvalid?.focus();
      return;
    }

    // Show loading state
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';

    // Hide previous feedback
    successMsg.hidden = true;
    errorMsg.hidden   = true;

    try {
      /*
       * ──────────────────────────────────────────────────────────
       * INTEGRATION POINT — Formspree or custom backend
       *
       * Option A (Formspree — recommended for quick setup):
       *   1. Create a free account at https://formspree.io
       *   2. Create a new form and copy your endpoint ID
       *   3. Replace 'YOUR_FORM_ID' below with your real ID
       *
       * Option B: Replace the fetch below with your own API call.
       * ──────────────────────────────────────────────────────────
       */
      const FORMSPREE_ID = 'YOUR_FORM_ID'; // ← Replace with your Formspree ID

      if (FORMSPREE_ID === 'YOUR_FORM_ID') {
        // Demo mode: simulate delay then show success (no real send)
        await new Promise(resolve => setTimeout(resolve, 1200));
        successMsg.hidden = false;
        form.reset();
        $$('.form-input, .form-select, .form-textarea', form).forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      const formData = new FormData(form);
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        successMsg.hidden = false;
        form.reset();
        $$('.form-input, .form-select, .form-textarea', form).forEach(el => {
          el.classList.remove('valid', 'invalid');
        });
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      errorMsg.hidden = false;
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
      submitBtn.disabled = false;
      btnText.style.display    = '';
      btnLoading.style.display = 'none';
    }
  });
}

/* ── 5. Cookie Banner ─────────────────────────────────────────── */
function initCookieBanner() {
  const banner = $('#cookie-banner');
  const acceptBtn = $('#cookie-accept');

  if (!banner || !acceptBtn) return;

  // Check if already accepted
  if (localStorage.getItem('cc_cookies_accepted')) return;

  // Show banner with a short delay
  setTimeout(() => { banner.hidden = false; }, 1200);

  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cc_cookies_accepted', '1');
    banner.style.animation = 'none';
    banner.style.transition = 'opacity 0.3s, transform 0.3s';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(20px)';
    setTimeout(() => { banner.hidden = true; }, 300);
  });
}

/* ── 6. Footer Year ───────────────────────────────────────────── */
function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── 7. Smooth scroll for CTA buttons that target an anchor ───── */
function initSmoothScrollCTAs() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without jump
      history.pushState(null, '', targetId);
    });
  });
}
