document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

  const setMenuA11y = (open) => {
    if (menuToggle) menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
  };

  const toggleMenu = () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    const isOpen = mobileMenu.classList.contains('active');

    // Change toggle button appearance
    const spans = menuToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    }

    setMenuA11y(isOpen);
  };

  if (menuToggle) menuToggle.addEventListener('click', toggleMenu);

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // 2. FAQ Accordion (only one open at a time)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const q = otherItem.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      } else {
        question.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 3. Sticky CTA Visibility on Scroll (Mobile Only)
  const stickyCta = document.querySelector('.sticky-cta');

  const updateSticky = () => {
    if (!stickyCta) return;
    if (window.innerWidth <= 768 && window.scrollY > 500) {
      stickyCta.classList.add('visible');
    } else {
      stickyCta.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', updateSticky, { passive: true });
  window.addEventListener('resize', updateSticky);
  updateSticky();

  // 4. Ensure External Links have rel="noopener noreferrer"
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // 5. Smooth Scroll Adjust for Fixed Header
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  });
});
