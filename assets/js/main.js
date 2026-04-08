/* ============================================
   MAIN.JS — Interazioni sito
   Dott.ssa Federica Rota · Allergologia Roma
   v2.0
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Header scroll shadow ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger / mobile nav ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Chiudi cliccando fuori
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Chiudi con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        hamburger.focus();
      }
    });
  }

  /* ── FAQ Accordion ── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Chiudi tutti
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      // Apri questo se era chiuso
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Apri il primo item di default (se presente)
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('is-open');
    firstFaq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
  }

  /* ── Smooth scroll per ancore interne ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (header?.offsetHeight || 0) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Fade-up on scroll (IntersectionObserver) ── */
  const fadeEls = document.querySelectorAll('[data-fade]');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── Form CTA (EmailJS) ── */
  const ctaForm   = document.getElementById('cta-form');
  const formStatus = document.getElementById('form-status');

  if (ctaForm && typeof emailjs !== 'undefined') {
    ctaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = ctaForm.querySelector('[name="nome"]');
      if (nome && !nome.value.trim()) {
        showStatus('error', 'Il campo Nome e cognome è obbligatorio.');
        nome.focus();
        return;
      }

      const telefono = ctaForm.querySelector('[name="telefono"]');
      if (telefono && !telefono.value.trim()) {
        showStatus('error', 'Il campo Telefono è obbligatorio.');
        telefono.focus();
        return;
      }

      const gdpr = ctaForm.querySelector('[name="gdpr"]');
      if (gdpr && !gdpr.checked) {
        showStatus('error', 'Devi accettare la Privacy Policy per inviare il modulo.');
        return;
      }

      const submitBtn = ctaForm.querySelector('[type="submit"]');
      const original  = submitBtn.textContent;
      submitBtn.textContent = 'Invio in corso\u2026';
      submitBtn.disabled = true;

      try {
        await emailjs.send(
          'service_834y28s',
          'template_bovgj6n',
          {
            nome:      ctaForm.querySelector('[name="nome"]').value.trim(),
            telefono:  ctaForm.querySelector('[name="telefono"]').value.trim(),
            email:     ctaForm.querySelector('[name="email"]').value.trim(),
            messaggio: (ctaForm.querySelector('[name="messaggio"]').value || '')
                         .replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
          }
        );

        showStatus('success', 'Messaggio inviato. Ti ricontatter\u00f2 entro 24 ore.');
        ctaForm.reset();
      } catch {
        showStatus('error', 'Errore nell\'invio. Riprova o chiama direttamente.');
      } finally {
        submitBtn.textContent = original;
        submitBtn.disabled = false;
      }
    });
  }

  function showStatus(type, message) {
    if (!formStatus) return;
    formStatus.textContent   = message;
    formStatus.className     = `form-status form-status--${type}`;
    formStatus.style.display = 'block';
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { formStatus.style.display = 'none'; }, 6000);
  }

});
