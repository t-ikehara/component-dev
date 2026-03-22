/**
 * IntersectionObserver で要素に .is-visible を付与する汎用モジュール。
 * data-delay="N" による transition-delay の stagger とセットで使う。
 */
export function initScrollObserver(selector = '[data-reveal]', options = {}) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, ...options },
  );

  els.forEach((el) => observer.observe(el));
  return observer;
}
