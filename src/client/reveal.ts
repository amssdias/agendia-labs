import { prefersReducedMotion } from './env.ts';

/** Fades sections in as they scroll into view. Content already on screen is left alone. */
export function initReveal() {
  if (prefersReducedMotion()) return;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add('is-pending');
    observer.observe(el);
  });
}
