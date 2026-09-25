'use strict';

/* ================================================================
   VERTICAL FIRE — main.js
   Comportamentos: header scroll, menu mobile, FAQ accordion,
   scroll spy nav, animações entrada, formulário, year
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Ano no footer ──────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Header: scroll state ───────────────────────────────────
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ── Menu mobile ────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('nav');

  function openMenu() {
    nav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Fechar ao clicar em link
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao clicar fora
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // ── Scroll spy (nav ativa) ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => spy.observe(s));

  // ── FAQ Accordion ──────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Fechar todos
      faqItems.forEach(other => {
        const otherBtn    = other.querySelector('.faq__question');
        const otherAnswer = other.querySelector('.faq__answer');
        if (otherBtn && otherAnswer) {
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.hidden = true;
        }
      });

      // Abrir o clicado
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });
  });

  // ── Animações de entrada (IntersectionObserver) ────────────
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Adicionar classes fade-up aos elementos
    const animTargets = [
      '.nr-card',
      '.servico-card',
      '.diferencial-item',
      '.processo__step',
      '.segmento-tag',
      '.galeria__item',
      '.pillar',
      '.trust-item',
      '.contato-item',
    ];

    animTargets.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('fade-up');
      });
    });

    // Hero já visível
    document.querySelectorAll('.hero__content > *').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        el.style.opacity = '';
        el.style.transform = '';
      }));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .fade-in').forEach(el => observer.observe(el));
  }

  // ── Formulário: envio via WhatsApp ─────────────────────────
  const form = document.getElementById('form-contato');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome        = form.nome?.value.trim();
      const empresa     = form.empresa?.value.trim();
      const email       = form.email?.value.trim();
      const telefone    = form.telefone?.value.trim();
      const treinamento = form.treinamento?.value;
      const mensagem    = form.mensagem?.value.trim();

      // Validação básica
      if (!nome || !empresa || !email || !telefone) {
        showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      // Compor mensagem WhatsApp
      let msg = `Olá! Sou *${nome}* da empresa *${empresa}*.\n`;
      if (treinamento) msg += `Tenho interesse no treinamento: *${treinamento}*.\n`;
      if (mensagem)    msg += `\n${mensagem}\n`;
      msg += `\nContato:\nE-mail: ${email}\nTelefone: ${telefone}`;

      const url = `https://wa.me/5511968886837?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener');
      showToast('Redirecionando para o WhatsApp…', 'success');
      form.reset();
    });
  }

  // ── Toast simples ──────────────────────────────────────────
  function showToast(msg, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = msg;

    Object.assign(toast.style, {
      position:      'fixed',
      bottom:        '90px',
      right:         '24px',
      zIndex:        '9999',
      padding:       '14px 20px',
      borderRadius:  '10px',
      fontSize:      '14px',
      fontWeight:    '500',
      color:         '#fff',
      background:    type === 'success' ? '#22C55E' : type === 'error' ? '#EF4444' : '#1E3355',
      boxShadow:     '0 4px 20px rgba(0,0,0,.4)',
      maxWidth:      '320px',
      lineHeight:    '1.5',
      opacity:       '0',
      transform:     'translateY(8px)',
      transition:    'all 250ms ease',
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      toast.style.opacity  = '1';
      toast.style.transform = 'translateY(0)';
    }));

    setTimeout(() => {
      toast.style.opacity  = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ── Smooth scroll para âncoras ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
