// ── GSAP Core ──
export const gsap = window.gsap;

// ── GSAP Plugins（すべて無料） ──
// スクロール系
export const ScrollTrigger = window.ScrollTrigger;
export const ScrollSmoother = window.ScrollSmoother;
export const Observer = window.Observer;
export const ScrollToPlugin = window.ScrollToPlugin;

// テキスト系
export const SplitText = window.SplitText;
export const ScrambleTextPlugin = window.ScrambleTextPlugin;
export const TextPlugin = window.TextPlugin;

// SVG系
export const MorphSVGPlugin = window.MorphSVGPlugin;
export const DrawSVGPlugin = window.DrawSVGPlugin;
export const MotionPathPlugin = window.MotionPathPlugin;

// レイアウト・インタラクション系
export const Flip = window.Flip;
export const Draggable = window.Draggable;
export const InertiaPlugin = window.InertiaPlugin;

// 物理演算系
export const Physics2DPlugin = window.Physics2DPlugin;

// イージング系
export const CustomEase = window.CustomEase;
export const EasePack = window.EasePack;

// ── ヘルパー ──
export function requireGsap() {
  if (!window.gsap) {
    console.warn('[lib-loader] gsap is not loaded. Check CDN script tags.');
    return null;
  }
  return window.gsap;
}

export function registerPlugins(...plugins) {
  const g = requireGsap();
  if (!g) return;
  const valid = plugins.filter(Boolean);
  if (valid.length) g.registerPlugin(...valid);
}
