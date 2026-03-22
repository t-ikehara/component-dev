import '@/styles/style.scss';
import { initScrollObserver } from './utils/scroll-observer.js';
import { initSmoothScroll } from './utils/smooth-scroll.js';

/**
 * Application entry point.
 * コンポーネントの初期化はここで行う。
 */
function init() {
  // Smooth scroll (ScrollSmoother or Lenis)
  initSmoothScroll();

  // data-reveal 要素にスクロール連動で .is-visible を付与
  initScrollObserver();

  // ── Components ──
  // 各コンポーネント制作時にここで初期化を追加
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
