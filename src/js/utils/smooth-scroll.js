import { gsap, ScrollSmoother, ScrollTrigger, registerPlugins } from './lib-loader.js';

/**
 * ScrollSmoother の初期化。
 * #smooth-wrapper > #smooth-content の構造が必要。
 * GSAPが読み込まれていない場合はスキップ。
 */
export function initSmoothScroll(options = {}) {
  if (!gsap || !ScrollSmoother || !ScrollTrigger) {
    console.warn('[smooth-scroll] GSAP ScrollSmoother not available.');
    return null;
  }

  registerPlugins(ScrollTrigger, ScrollSmoother);

  return ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2,
    effects: true,
    ...options,
  });
}
