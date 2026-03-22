# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ポートフォリオ掲載用3Dサイトのコンポーネントライブラリ。66パターン・17カテゴリのコンポーネントを独立管理し、組み合わせて完成サイトを構築する。最終組み込み先はWordPress。

## Tech Stack

- **Build**: Vite (ES Modules)
- **CSS**: SCSS / FLOCSS (`c-`, `p-`, `l-`, `u-` プレフィックス) + BEM
- **JS**: Vanilla JS (ES Modules) — フレームワークなし（静的HTML）
- **3D**: Three.js (npm import, tree-shaking)
- **Animation**: GSAP + 全プラグイン (CDN, `window` 経由) + ScrollTrigger
- **Smooth Scroll**: ScrollSmoother or Lenis（択一）

## Build & Dev Commands

```bash
npm install
npm run dev          # Vite dev server
npm run build        # dist/ へビルド
```

## Architecture

### Library Loading Strategy

- **GSAP系**: CDN読み込み → `window` 経由で参照。バンドルに含めない（WP `wp_enqueue_script` 前提）
- **Three.js**: npm import でバンドルに含める（tree-shaking効果大）
- **ラッパー**: `src/js/utils/lib-loader.js` が `window.gsap` 等をES Module exportとして再公開。コンポーネントはここからimport

### Directory Structure (Key Points)

```
src/
  styles/           # SCSS: foundation/ → layout/ → utility/ → style.scss (entry)
  js/
    app.js           # JS entry point
    utils/           # scroll-observer, smooth-scroll, mouse-tracker, resize-handler, lib-loader
    three/           # scene-manager, lights, post-processing
  components/
    {category}/{id}/ # 各コンポーネント = html + _c-{id}.scss + {id}.js
pages/               # 個別プレビューページ (preview-{id}.html)
index.html           # カタログ（全コンポーネント一覧）
```

### Component File Pattern

各コンポーネントは3ファイル構成:
- `{id}.html` — HTMLスニペット（`data-reveal`, `data-component`, `data-three` 属性使用）
- `_c-{id}.scss` — FLOCSS Component スタイル
- `{id}.js` — ES Module class。`lib-loader.js` からGSAP/プラグインをimport、`registerPlugins()` で使用分だけ登録

### Animation Pattern: 外枠/内枠

```
.c-{component}                → 外枠（JSが .is-visible 付与）
  .c-{component}__inner       → 内枠（実スタイル＋トランジション）
```

`data-delay="N"` で stagger制御。`data-gsap="pin|scrub"` でScrollTrigger連携。

## FLOCSS Naming

| Prefix | Usage | Example |
|--------|-------|---------|
| `c-` | Component | `c-hero-a`, `c-service-card` |
| `p-` | Project (page-specific) | `p-home` |
| `l-` | Layout | `l-container`, `l-grid` |
| `u-` | Utility | `u-sr-only`, `u-mt-40` |

State classes: `.is-visible`, `.is-active`, `.is-loaded`, `.is-open`, `.is-hover`

## Design Rules (MUST follow)

### Forbidden Patterns (AI Slop)

- **Fonts**: Inter, Roboto, Arial, Open Sans は使用禁止
- **Colors**: 紫→青グラデーション禁止、ネオン多用禁止、純白`#fff`/純黒`#000`背景禁止
- **Layout**: Card-in-Card禁止、均等3カラムの連続禁止、全角丸同一値禁止
- **Animation**: 全要素同じfadeIn+translateY禁止、意味のないパーティクル禁止、hover scale(1.05)だけ禁止
- **Decoration**: 無意味なグラスモーフィズム禁止、ストックアイコン禁止

### Required Standards

- カラー比率: ドミナント70% + サブ25% + アクセント5%
- コントラスト: WCAG 2.2 AA準拠 (通常テキスト 4.5:1、大テキスト 3:1)
- タップターゲット: 44×44px以上
- 本文: 16px以上、line-height 1.6〜1.8、max-width 65〜75文字
- 見出し: line-height 0.9〜1.15、letter-spacing -0.02〜-0.04em
- `prefers-reduced-motion: reduce` 対応必須
- フォントファミリーは最大2つ（Display + Body）、推奨リストから選択（spec.md参照）

### Performance Targets

- LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1
- 3Dモデル: glTF + Draco圧縮、初期ロード500KB以下
- 画像: WebP/AVIF優先
- フォント: WOFF2, Variable Font推奨
- モバイル3D: パーティクル数1/3、シャドウ無効、pixelRatio上限1.5

## SCSS @use ルール

各SCSSファイルでは変数・mixinを使う場合、明示的に `@use` する（`additionalData` は使っていない）:
- foundation内: `@use 'variables' as *;` `@use 'mixins' as *;`
- layout/utility/component: `@use '../foundation/variables' as *;` `@use '../foundation/mixins' as *;`

## Key References

- 詳細仕様・全コンポーネント一覧・デザインガイドライン → `spec.md`
- 制作進捗管理 → `task.md`
