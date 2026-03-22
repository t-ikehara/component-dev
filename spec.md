# 3D Site Component Library — 設計仕様書

## 概要

ポートフォリオ掲載用の3Dサイトを複数制作するためのコンポーネントライブラリ。
各コンポーネントを独立管理し、組み合わせ＋カスタマイズで完成サイトを構築する。

### 対象ジャンル

- コーポレート / 企業サイト
- ブランド / プロダクト紹介
- LP / キャンペーン
- スタジオ / エージェンシー

---

## 技術スタック

| 項目 | 選定 |
|---|---|
| ビルドツール | Vite（ES Modules） |
| CSS設計 | SCSS / FLOCSS（`c-`, `p-`, `u-`, `l-`） |
| JavaScript | Vanilla JS（ES Modules） |
| 3D | Three.js（CDN or npm） |
| アニメーション | GSAP + ScrollTrigger |
| フレームワーク | なし（静的HTML） |
| 最終組み込み先 | WordPress（テーマ化前提） |

---

## ライブラリ管理方針

### GSAP — 全プラグイン無料化について（重要）

2025年4月、WebflowによるGSAP買収に伴い **GSAP v3.13 で全プラグインが100%無料**（商用利用含む）となった。
これまで有料（Club GreenSock限定）だった SplitText, MorphSVG, DrawSVG, ScrollSmoother, Flip, Inertia, Physics2D 等がすべて無償利用可能。npm の `gsap` パッケージに全プラグインが含まれている（`gsap-trial` は廃止）。

**ライセンス上の唯一の制限**: Webflowのビジュアルアニメーションビルダーと競合するノーコードツールへの組み込みは禁止。通常のWebサイト・Webアプリ・WordPressテーマでの使用は **完全に自由**。

参照: https://gsap.com/standard-license/

### GSAP 全プラグイン一覧（すべて無料・すべて使用可能）

#### スクロール系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **ScrollTrigger** | スクロール連動アニメーション（pin, scrub, snap） | ほぼ全コンポーネント |
| **ScrollSmoother** | スムーススクロール（Lenisの代替として使用可） | サイト全体 |
| **Observer** | スクロール・タッチ・ホイールイベントの統合監視 | フルスクリーンスナップ系 |
| **ScrollToPlugin** | スムーズスクロール移動 | ナビゲーションリンク |

#### テキスト系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **SplitText** ★ | テキストを行・単語・文字に分割してアニメーション。v3.13で完全リライト（50%軽量化、autoSplit対応） | hero, about, cta, 見出し全般 |
| **ScrambleText** | テキストをランダム文字でスクランブルしながら変化 | loader, hero, 数字カウント |
| **TextPlugin** | テキスト内容をアニメーション的に書き換え | タイプライター演出 |

#### SVG系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **MorphSVG** ★ | SVGシェイプ間のモーフィング | アイコン変化、ローダー、セクション遷移 |
| **DrawSVG** ★ | SVGパスの描画アニメーション（線が伸びる） | process, feature-j, ロゴ描画 |
| **MotionPath** | SVGパスに沿ったオブジェクト移動 | service-j（フローチャート）, 装飾 |
| **MotionPathHelper** | MotionPathのデバッグ用ビジュアルエディタ | 開発時のみ |

#### レイアウト・インタラクション系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **Flip** ★ | レイアウト変更をスムーズにアニメーション（FLIPテクニック） | works-b（フィルタ切替）, タブ切替 |
| **Draggable** | ドラッグ操作の実装 | works-d（横スクロール）, スライダー |
| **Inertia** | 慣性スクロール・慣性ドラッグ | Draggableとの組合せ |

#### 物理演算系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **Physics2D** | 2D物理演算（重力、速度、角度） | インタラクティブ演出、パーティクル |
| **PhysicsProps** | プロパティベースの物理演算 | バネアニメーション |

#### イージング・デバッグ系

| プラグイン | 用途 | 主な使用コンポーネント |
|---|---|---|
| **CustomEase** | カスタムイージングカーブの作成 | 全コンポーネント（ブランド固有のイージング定義） |
| **CustomBounce** | バウンスイージングのカスタム | ボタン、通知 |
| **CustomWiggle** | ウィグル（振動）イージング | アテンション演出 |
| **EasePack** | rough, slow, expoScale イージング | テキスト、UI遷移 |
| **GSDevTools** | タイムラインのビジュアルデバッグ | 開発時のみ |

★ = 旧Club GreenSock限定だったプラグイン（現在は無料）

### プラグイン活用によるコンポーネント強化マップ

旧有料プラグインが使えることで、各コンポーネントのアニメーションが大幅に強化できる。

| コンポーネント | 基本（CSS + gsap.to） | プラグイン活用で可能になる演出 |
|---|---|---|
| **hero-a** | fadeIn + translateY | **SplitText** で文字単位のスタガーリビール + **CustomEase** でブランド固有のイージング |
| **hero-c** | 背景フェード | **ScrollSmoother** でパララックスに滑らかさ追加 |
| **about-a** | opacity変化 | **SplitText** + **ScrollTrigger scrub** で1文字ずつスクロール連動リビール |
| **service-h** | マウス追従画像 | **Inertia** で慣性付きの滑らかな画像追従 |
| **service-j** | 線が伸びる | **DrawSVG** でSVGパス描画 + **MotionPath** で線上のドット移動 |
| **feature-a** | pin + フェード切替 | **Flip** でレイアウト変更をスムーズに補間 |
| **feature-j** | SVGグラフ表示 | **DrawSVG** で線グラフの描画アニメーション + **MorphSVG** でグラフ形状の切替 |
| **works-b** | フィルタ切替 | **Flip** でグリッドの並び替えを滑らかにアニメーション |
| **works-c** | スライド切替 | **MorphSVG** でシェイプ遷移マスク |
| **process-a** | ステップ表示 | **DrawSVG** で接続線の描画 + **SplitText** でラベル出現 |
| **cta-a** | テキスト表示 | **SplitText** で巨大テキストの文字単位アニメーション |
| **loader** | カウント表示 | **ScrambleText** で数字のスクランブル演出 |
| **nav-b** | メニュー開閉 | **Flip** でメニュー項目のレイアウト遷移 + **SplitText** でテキストリビール |
| **transition** | ページ遷移 | **MorphSVG** でシェイプによるカーテントランジション |
| **marquee** | CSS横スクロール | **Draggable** + **Inertia** でドラッグ可能＋慣性付きマーキー |

### グローバル（window）で使うライブラリ

WordPress CDN読み込みを前提。バンドルに含めず `window` 経由で参照。
GSAP は全プラグインが npm にも含まれているが、WP組み込み時は CDN が管理しやすい。

| ライブラリ | 方式 | 理由 |
|---|---|---|
| GSAP Core | `window.gsap` | WP `wp_enqueue_script` でCDN管理 |
| ScrollTrigger | `window.ScrollTrigger` | GSAPに準拠 |
| ScrollSmoother | `window.ScrollSmoother` | GSAPに準拠 |
| SplitText | `window.SplitText` | GSAPに準拠 |
| Flip | `window.Flip` | GSAPに準拠 |
| DrawSVGPlugin | `window.DrawSVGPlugin` | GSAPに準拠 |
| MorphSVGPlugin | `window.MorphSVGPlugin` | GSAPに準拠 |
| その他GSAPプラグイン | `window.{PluginName}` | 使用するプラグインに応じてCDN追加 |

### ES Modules importで使うライブラリ

Tree-shaking / サブモジュールimportが必須のライブラリ。バンドルに含める。

| ライブラリ | 方式 | 理由 |
|---|---|---|
| Three.js | `import * from 'three'` | Tree-shaking効果大。サブモジュール必須 |
| GLTFLoader等 | `import from 'three/examples/jsm/...'` | Three.jsに準拠 |
| Lenis | `import` or `window` | 軽量。ScrollSmootherと択一で判断 |

### ラッパーモジュール（lib-loader.js）

```js
// src/js/utils/lib-loader.js

// ── GSAP Core ──
export const gsap = window.gsap;

// ── GSAP Plugins（すべて無料） ──
// スクロール系
export const ScrollTrigger = window.ScrollTrigger;
export const ScrollSmoother = window.ScrollSmoother;
export const Observer = window.Observer;

// テキスト系
export const SplitText = window.SplitText;
export const ScrambleTextPlugin = window.ScrambleTextPlugin;

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

// ── ヘルパー ──
export function requireGsap() {
  if (!window.gsap) {
    console.warn('[lib-loader] gsap is not loaded. Check CDN script tags.');
    return null;
  }
  return window.gsap;
}

// プラグイン登録ヘルパー（使用するプラグインだけ登録）
export function registerPlugins(...plugins) {
  const g = requireGsap();
  if (!g) return;
  const valid = plugins.filter(Boolean);
  if (valid.length) g.registerPlugin(...valid);
}
```

```js
// コンポーネント側の使用例
import * as THREE from 'three';  // バンドル
import {
  gsap, ScrollTrigger, SplitText, Flip, registerPlugins
} from '../../utils/lib-loader.js';

// 使用するプラグインを登録
registerPlugins(ScrollTrigger, SplitText, Flip);

export class HeroA {
  constructor(el) {
    if (!gsap) return;
    // SplitText で見出しを文字分割
    this.split = SplitText.create(el.querySelector('.c-hero-a__title'), {
      type: 'lines, words, chars',
      mask: 'lines',
      autoSplit: true,
      onSplit: () => this.animateTitle()
    });
  }

  animateTitle() {
    gsap.from('.c-hero-a__title .char', {
      yPercent: 110,
      duration: 0.8,
      stagger: 0.02,
      ease: 'power4.out'
    });
  }
}
```

```html
<!-- HTML側（開発時 / WordPress header.php） -->
<!-- GSAP Core -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>

<!-- 使用するプラグインのみ読み込む -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollSmoother.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Flip.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/DrawSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MorphSVGPlugin.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomEase.min.js"></script>

<!-- 必要に応じて追加 -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Draggable.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/InertiaPlugin.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Physics2DPlugin.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrambleTextPlugin.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/MotionPathPlugin.min.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Observer.min.js"></script> -->

<!-- アプリケーション -->
<script type="module" src="/src/js/app.js"></script>
```

---

## デザインガイドライン

このセクションはコンポーネント制作時に **必ず参照する**。
AI生成コードの「AIっぽさ」を排除し、Awwwardsレベルのデザイン品質を担保するためのルール集。

---

### 1. Awwwards 評価基準

Awwwardsは以下4軸で審査される（配点比率付き）。コンポーネント制作時もこの観点でセルフチェックを行う。

| 軸 | 配点 | 問うていること |
|---|---|---|
| **Design** | 40% | ビジュアルの質、タイポグラフィ、カラー、レイアウトの一貫性と美しさ |
| **Usability** | 30% | ナビゲーション、レスポンシブ、パフォーマンス、アクセシビリティ |
| **Creativity** | 20% | 独自性、インタラクション、驚き、記憶に残る演出 |
| **Content** | 10% | 情報設計、コピーライティング、コンテンツの質 |

**Design + Usability で70%** であることに注意。見た目が良くても使いにくければ評価されない。

---

### 2. AI生成デザイン NG集（禁止パターン）

以下のパターンはAI生成UIに頻出する「スロップ（slop）」であり、**すべて禁止**。

#### 2-1. タイポグラフィ NG

| NG | 理由 | 代替 |
|---|---|---|
| Inter, Roboto, Arial, Open Sans をメインフォントに使用 | AI出力のデフォルトフォント。思考停止の象徴 | 個性のあるフォントを選ぶ（後述の推奨リスト参照） |
| 見出しと本文が同じフォントファミリー | 階層が生まれない | Display系 + Body系の2ファミリー構成 |
| font-weight の差だけで階層を作る | 弱い階層。AIの典型 | サイズ差 + ファミリー差 + スペーシング差を併用 |
| 全要素の letter-spacing が同じ | 単調 | 見出しは詰め（-0.02〜-0.04em）、キャプション/タグは広げ（0.1〜0.25em） |
| line-height を考慮しない | AIは 1.5〜1.6 で統一しがち | 見出し: 0.9〜1.1、本文: 1.6〜1.8、キャプション: 1.4 |

#### 2-2. カラー NG

| NG | 理由 | 代替 |
|---|---|---|
| 紫→青グラデーション＋白背景 | AI生成UIの最頻出パターン | サイトごとにムードから決定する |
| シアン＋パープルのアクセント（ダークUI） | 同上 | 自然界の色、ブランドカラー、意図的なモノトーン |
| 均等に分散した多色パレット | 支配色がない。焦点がぼやける | ドミナントカラー70% + サブ25% + アクセント5% |
| グラデーションの多用 | blur = premium という誤学習 | グラデーションは1サイト1〜2箇所まで。使うなら意図的に |
| ネオン色の無目的な使用 | 意味なくグロー/ネオンを乗せる | アクセントとして使うなら1色に絞り、使用箇所を限定 |

#### 2-3. レイアウト NG

| NG | 理由 | 代替 |
|---|---|---|
| カードの入れ子（Card inside Card） | AIが階層を理解できず多重コンテナ化 | フラットな情報構造。コンテナは1層まで |
| 全セクション同じパディング | 単調なリズム | セクションの重要度でパディングに強弱をつける |
| 3カラム均等グリッドの連続 | 見飽きたAIレイアウト | 不均等グリッド、1カラム、スプリット、非対称を混ぜる |
| すべての角丸が同じ値（16px等） | 思考停止 | 大要素: 20-24px、中: 12-16px、小: 4-8px、またはシャープ0pxとの混合 |
| ボタンにグラデーション背景 | 古い＋AIスロップ | フラットカラー、ボーダーのみ、テキストリンク＋矢印 |

#### 2-4. アニメーション NG

| NG | 理由 | 代替 |
|---|---|---|
| 全要素に fadeIn + translateY | AIの最頻出。全部同じ動き | 要素の種類や位置に応じて動きを変える |
| 意味のないパーティクル | 「3Dっぽさ」のためだけの装飾 | パーティクルを使うなら音・データ・ブランドに紐づける |
| ホバーで scale(1.05) だけ | 思考停止のホバーエフェクト | clip-path、色変化、要素の出現、カーソル変化等を併用 |
| 過剰な blur エフェクト | blur = premium の誤学習 | blur は背景の文脈遮断が必要な場面のみ |
| reduced-motion 未対応 | アクセシビリティ違反 | `prefers-reduced-motion: reduce` で代替表示を必ず定義 |

#### 2-5. 装飾 NG

| NG | 理由 | 代替 |
|---|---|---|
| 無意味なグラスモーフィズム | 2022年のトレンドがAIに染みついている | 必要な場面（オーバーレイ、ナビ背景）でのみ使用 |
| ストック的なアイコンイラスト | 個性がない | アイコンなしでテキスト主導、または独自SVG |
| 装飾的ドット・線パターンの乱用 | AIがよく入れる「デザインっぽい」要素 | グレインテクスチャ、写真、3D、タイポグラフィで代替 |

---

### 3. デザイン品質の数値基準

#### 3-1. タイポグラフィ

| 項目 | 基準値 |
|---|---|
| 本文 font-size 最小値 | 16px（1rem） |
| キャプション/注釈 最小値 | 14px（0.875rem）、12px未満は絶対禁止 |
| 見出し line-height | 0.9〜1.15 |
| 本文 line-height | 1.6〜1.8 |
| 本文 最大行長（max-width） | 65〜75文字（日本語: 25〜35文字） |
| フォントファミリー数 | 最大2（Display + Body）。3以上は禁止 |
| font-weight バリエーション | 1ファミリー内で最大3ウェイト。多すぎは散漫 |

#### 3-2. スペーシング

| 項目 | 基準値 |
|---|---|
| セクション間パディング | clamp(4rem, 8vw, 8rem) を基準。重要セクションは大きく、軽いセクションは小さく |
| コンテナ最大幅 | 1100〜1400px（コンテンツ種別で変える） |
| コンテナ左右パディング | clamp(1.5rem, 4vw, 2.5rem) |
| カード内パディング | 1.5〜2.5rem（カードサイズに比例） |
| 要素間マージン | 8px単位（8, 16, 24, 32, 48, 64, 96） |

#### 3-3. カラー＆コントラスト（WCAG 2.2 AA準拠）

| 項目 | 基準値 |
|---|---|
| 通常テキスト vs 背景 | コントラスト比 4.5:1 以上 |
| 大テキスト（24px+ / 18.67px bold+） vs 背景 | コントラスト比 3:1 以上 |
| UIコンポーネント・アイコン vs 背景 | コントラスト比 3:1 以上 |
| リンクテキスト vs 周囲テキスト | コントラスト比 3:1 以上 + 下線 or 視覚的区別 |
| フォーカスインジケーター | 3:1 以上の明確なアウトライン |
| パレット構成 | ドミナント70% + サブ25% + アクセント5% |

#### 3-4. インタラクション＆タッチ

| 項目 | 基準値 |
|---|---|
| タップターゲット最小サイズ | 44 × 44px（WCAG 2.2 / Apple HIG） |
| ボタンの最小高さ | 44px |
| ボタンテキスト最小サイズ | 16px |
| ホバートランジション | 0.2〜0.4s（0.1s未満は速すぎ、0.5s超は鈍い） |
| スクロールアニメーション duration | 0.6〜1.2s（要素出現）、scrubはスクロール速度に追従 |
| ローディング | 3秒以上かかるなら必ずプログレス表示 |

#### 3-5. パフォーマンス

| 項目 | 基準値 |
|---|---|
| LCP (Largest Contentful Paint) | 2.5秒以下 |
| FID (First Input Delay) | 100ms以下 |
| CLS (Cumulative Layout Shift) | 0.1以下 |
| 画像フォーマット | WebP / AVIF 優先。PNG/JPGはフォールバック |
| 3Dモデル | glTF + Draco圧縮。初期ロードモデルは500KB以下目標 |
| フォントファイル | WOFF2。Variable Fontで1ファイル化推奨 |
| モバイル3D | パーティクル数1/3に減少、シャドウ無効化、pixelRatio上限1.5 |

#### 3-6. アクセシビリティ

| 項目 | 基準値 |
|---|---|
| `prefers-reduced-motion` | すべてのアニメーション要素に代替表示を定義 |
| `prefers-color-scheme` | ダーク/ライト両対応を推奨（必須ではない） |
| キーボードナビゲーション | Tab, Enter, Escape ですべての機能にアクセス可能 |
| フォーカス可視性 | フォーカスリングを消さない。カスタムする場合は3:1以上のコントラスト |
| alt属性 | 装飾画像: `alt=""`、意味のある画像: 適切なalt |
| セマンティックHTML | `section`, `nav`, `main`, `article`, `aside` を正しく使用 |
| テキストリサイズ | 200%拡大でレイアウト崩れなし |
| ARIA | ネイティブHTMLで不足する場合のみ使用 |

---

### 4. 推奨フォントリスト

サイトのトーンに応じて選択。 **Inter, Roboto, Arial, Open Sans は使用禁止。**

#### ゴシック / サンセリフ系（Display）

| フォント | トーン | 入手 |
|---|---|---|
| Satoshi | モダン、クリーン | Fontshare（無料） |
| General Sans | ニュートラル、プロフェッショナル | Fontshare（無料） |
| Clash Display | 太め、インパクト | Fontshare（無料） |
| Cabinet Grotesk | ジオメトリック、洗練 | Fontshare（無料） |
| Neue Montreal | 中性、スタジオ感 | Pangram Pangram（有料） |
| PP Mori | ミニマル、プレミアム | Pangram Pangram（有料） |
| Switzer | クリーン、万能 | Fontshare（無料） |
| Manrope | テック、丸み | Google Fonts（無料） |

#### セリフ系（Display / Accent）

| フォント | トーン | 入手 |
|---|---|---|
| Instrument Serif | エレガント、イタリック美 | Google Fonts（無料） |
| Fraunces | 個性的、ソフトセリフ | Google Fonts（無料）|
| Playfair Display | ラグジュアリー、エディトリアル | Google Fonts（無料） |
| Gambetta | クラシック、温かみ | Fontshare（無料） |
| Zodiak | 幾何学的セリフ、モダン | Fontshare（無料） |

#### 本文用（Body）

| フォント | トーン | 入手 |
|---|---|---|
| DM Sans | ニュートラル、読みやすい | Google Fonts（無料） |
| Plus Jakarta Sans | 柔らかい、フレンドリー | Google Fonts（無料） |
| Outfit | 幾何学的、テック系 | Google Fonts（無料） |
| Geist | シャープ、開発者向け | Vercel（無料） |
| Wotfard | 丸み、親しみやすい | atipo（有料） |

#### 日本語

| フォント | トーン | 入手 |
|---|---|---|
| Noto Sans JP | ニュートラル、万能 | Google Fonts（無料） |
| Zen Kaku Gothic New | モダン、柔らかい | Google Fonts（無料） |
| Shippori Mincho | 明朝、上品 | Google Fonts（無料） |
| BIZ UDPGothic | 可読性特化 | Google Fonts（無料） |
| LINE Seed JP | フレンドリー、テック | LINE（無料） |

#### フォントペアリング例

| サイトトーン | Display | Body |
|---|---|---|
| ラグジュアリー / ブランド | Instrument Serif | DM Sans |
| テック / スタートアップ | Clash Display | Geist |
| スタジオ / クリエイティブ | Neue Montreal | Plus Jakarta Sans |
| コーポレート / 信頼感 | General Sans | DM Sans |
| LP / キャンペーン | Cabinet Grotesk | Outfit |
| 和モダン | Shippori Mincho | Zen Kaku Gothic New |

---

### 5. カラーパレット設計ルール

#### 構成原則

```
[ドミナントカラー 70%] — 背景・ベース
[サブカラー 25%]      — テキスト・UIコンポーネント
[アクセント 5%]       — CTA・重要リンク・ハイライト
```

#### ダークUI の場合

```scss
// 良い例
--color-bg: #0a0a0c;        // ほぼ黒だが完全な #000 は避ける
--color-fg: #e8e4df;         // 純白 #fff より温かみ
--color-accent: #c9ff53;     // 1色に絞る
--color-muted: #5a5650;      // テキストの階層用

// NG例
--color-bg: #000000;         // 完全な黒は目が疲れる
--color-fg: #ffffff;         // コントラストが強すぎる
--color-accent-1: #c9ff53;   // アクセントが
--color-accent-2: #53c9ff;   // 2色以上は散漫
```

#### ライトUI の場合

```scss
// 良い例
--color-bg: #f5f2ed;         // オフホワイト。温かみ
--color-fg: #1a1816;         // 濃いがソフトな黒
--color-accent: #e85d3a;     // 目を引くが品のある1色
--color-muted: #8a847e;

// NG例
--color-bg: #ffffff;         // 純白は冷たい
--color-fg: #333333;         // 中途半端なグレー。コントラスト不足の可能性
--color-accent: linear-gradient(135deg, #667eea, #764ba2); // 紫グラデ禁止
```

#### サイトごとのカラー決定プロセス

1. サイトのムード・業種を定義する
2. 明度方向を決める（ダーク / ライト / ミックス）
3. アクセント1色を決める（ブランドカラー or 意図的な選択）
4. ドミナント・サブはアクセントとの調和で決定
5. WebAIM Contrast Checker でコントラスト比を検証
6. カラーパレットを CSS変数で定義して全体に適用

---

### 6. コンポーネント別デザインノート

各コンポーネントのデザイン判断で参照するリファレンスの方向性。

#### Hero

- **意図**: ファーストビューの3秒で「このサイトは質が違う」と思わせる
- **参考方向**: Apple製品ページ（余白の使い方）、Stripe（タイポグラフィ階層）、Lusion.co（3D統合）
- **注意**: 3Dが主役なのかテキストが主役なのか、1つのヒーローで明確にする。両方主張すると散漫

#### Service

- **意図**: 提供価値を素早く理解させる。読ませるより「見せる」
- **参考方向**: Linear.app（ピン留め切替）、Vercel（クリーンなカード設計）、Locomotive（マウス追従リスト）
- **注意**: カード型を使う場合、カードの入れ子・均一サイズの3列並びはAIスロップ。必ず変化をつける

#### Feature

- **意図**: 差別化ポイントを記憶に残す
- **参考方向**: Raycast（ピン留め＋切替）、Arc Browser（スクロール連動）、Nothing Phone（プロダクトデモ）
- **注意**: テキスト量が多くなりがち。1特徴につき1ビジュアルの原則

#### Works

- **意図**: 実績の質で信頼を獲得する。クリックして見たいと思わせる
- **参考方向**: Studio Freight（マウス追従画像）、Rejouice（フルスクリーンスライド）、Lusion（3Dトランジション）
- **注意**: サムネイルの質がすべて。ダミー画像でも高品質な物を使用

#### CTA

- **意図**: 行動を促す。迷わせない
- **参考方向**: Stripe（シンプルCTA）、Linear（ミニマル1行）、Apple（余白＋巨大テキスト）
- **注意**: CTAボタンは画面内に1つ。複数ボタンはコンバージョンを下げる

#### Contact

- **意図**: 問い合わせへの心理的ハードルを下げる
- **参考方向**: Typeform（1問ずつ）、Studio Freight（ミニマルフォーム）
- **注意**: 入力フィールドのフォーカスアニメーションは必須。ラベルのfloatやアンダーラインの変化

---

### 7. セルフチェックリスト（コンポーネント完成時）

コンポーネントを1つ作り終えるたびに、以下を確認する。

#### Design（40%）
- [ ] フォントは推奨リストから選んでいるか。Inter / Roboto を使っていないか
- [ ] カラーパレットは70/25/5の比率に沿っているか
- [ ] 紫グラデーション、ネオン多用など禁止パターンに該当していないか
- [ ] タイポグラフィに明確な階層（サイズ・ウェイト・ファミリーの差）があるか
- [ ] letter-spacing / line-height は要素種別ごとに適切に設定されているか
- [ ] スペーシングに強弱のリズムがあるか（均一になっていないか）
- [ ] 角丸の値が全要素で均一になっていないか

#### Usability（30%）
- [ ] 本文テキストは16px以上か
- [ ] テキスト vs 背景のコントラスト比は 4.5:1 以上か
- [ ] タップターゲットは44×44px以上か
- [ ] キーボード操作でアクセスできるか
- [ ] フォーカスインジケーターが視認できるか
- [ ] `prefers-reduced-motion` に対応しているか
- [ ] モバイルで操作可能か（タッチ、スクロール）
- [ ] 3秒以上のロードがある場合、プログレス表示があるか

#### Creativity（20%）
- [ ] このコンポーネントに「記憶に残るポイント」が1つ以上あるか
- [ ] 汎用テンプレートとの明確な差別化があるか
- [ ] インタラクションに意味があるか（マウス追従は何を表現しているか等）
- [ ] 3D要素がある場合、コンテンツと結びついているか（装飾だけでないか）

#### Content（10%）
- [ ] ダミーテキストであっても、実際の情報量・構造を想定した内容か
- [ ] 見出し・本文・キャプションの情報階層が明確か
- [ ] 画像/ビジュアルは高品質なプレースホルダーを使用しているか

---

## ディレクトリ構成

```
project-root/
├── index.html                    ← カタログ（全コンポーネント一覧リンク）
├── vite.config.js
├── package.json
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── models/               ← glTF / glb
│   │   ├── fonts/
│   │   └── videos/
│   │
│   ├── styles/
│   │   ├── foundation/
│   │   │   ├── _reset.scss
│   │   │   ├── _variables.scss   ← カラー、フォント、ブレークポイント
│   │   │   ├── _mixins.scss      ← メディアクエリ、フォントサイズ等
│   │   │   ├── _base.scss        ← body, html, img等の基本スタイル
│   │   │   └── _typography.scss
│   │   │
│   │   ├── layout/
│   │   │   ├── _l-container.scss
│   │   │   ├── _l-grid.scss
│   │   │   └── _l-section.scss
│   │   │
│   │   ├── utility/
│   │   │   ├── _u-visually-hidden.scss
│   │   │   ├── _u-text.scss
│   │   │   └── _u-spacing.scss
│   │   │
│   │   └── style.scss            ← 全体のエントリーポイント
│   │
│   ├── js/
│   │   ├── app.js                ← エントリーポイント
│   │   ├── utils/
│   │   │   ├── scroll-observer.js    ← IntersectionObserver 汎用
│   │   │   ├── smooth-scroll.js
│   │   │   ├── mouse-tracker.js      ← マウス座標の正規化・補間
│   │   │   └── resize-handler.js
│   │   │
│   │   └── three/
│   │       ├── scene-manager.js      ← Three.js シーン・カメラ・レンダラー管理
│   │       ├── lights.js
│   │       └── post-processing.js
│   │
│   └── components/
│       ├── nav/
│       │   ├── nav-a/
│       │   │   ├── nav-a.html
│       │   │   ├── _c-nav-a.scss
│       │   │   └── nav-a.js
│       │   ├── nav-b/
│       │   └── nav-c/
│       │
│       ├── hero/
│       │   ├── hero-a/
│       │   │   ├── hero-a.html
│       │   │   ├── _c-hero-a.scss
│       │   │   └── hero-a.js
│       │   ├── hero-b/
│       │   ├── hero-c/
│       │   └── hero-d/
│       │
│       ├── about/
│       ├── service/
│       ├── feature/
│       ├── works/
│       ├── product/
│       ├── team/
│       ├── testimonial/
│       ├── stats/
│       ├── process/
│       ├── news/
│       ├── cta/
│       ├── contact/
│       ├── footer/
│       └── common/               ← marquee, loader, cursor, divider, transition
│
├── pages/                        ← 個別プレビューページ
│   ├── preview-hero-a.html
│   ├── preview-hero-b.html
│   └── ...
│
└── dist/                         ← ビルド出力
```

---

## FLOCSS 命名規則

### プレフィックス

| プレフィックス | 用途 | 例 |
|---|---|---|
| `c-` | Component（再利用パーツ） | `c-hero-a`, `c-service-card` |
| `p-` | Project（ページ固有） | `p-home`, `p-about` |
| `l-` | Layout（レイアウト） | `l-container`, `l-grid` |
| `u-` | Utility（汎用） | `u-sr-only`, `u-mt-40` |

### BEM記法

```
.c-{component}              ← Block（外枠・アニメーションフック）
.c-{component}__inner       ← Element（実スタイル）
.c-{component}__title       ← Element
.c-{component}__body        ← Element
.c-{component}--reverse     ← Modifier
```

### アニメーション状態クラス

| クラス | 用途 |
|---|---|
| `.is-visible` | スクロールで表示領域に入った |
| `.is-active` | アクティブ状態（タブ、メニュー等） |
| `.is-loaded` | ローディング完了 |
| `.is-open` | 展開状態（アコーディオン、メニュー） |
| `.is-hover` | JSで管理するホバー状態（タッチ併用時） |

---

## アニメーション設計原則

### 外枠 / 内枠パターン

```html
<!-- c-box: スタイルなし or 最低限。JSがここに .is-visible を付与 -->
<div class="c-service-a">
  <!-- c-box__inner: 実スタイル＋トランジション定義 -->
  <div class="c-service-a__inner">
    <span class="c-service-a__num">01</span>
    <h3 class="c-service-a__title">サービス名</h3>
    <p class="c-service-a__body">説明テキスト</p>
  </div>
</div>
```

```scss
// _c-service-a.scss
.c-service-a {
  // 外枠：スタイルなし or overflow: hidden 程度

  &.is-visible {
    .c-service-a__inner {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &__inner {
    // 初期状態（非表示）
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    // 実スタイル
    padding: 2.5rem 2rem;
    border: 1px solid rgba(#fff, 0.06);
    border-radius: 16px;
  }
}
```

```js
// scroll-observer.js（汎用）
export function initScrollObserver(selector = '[data-reveal]', options = {}) {
  const els = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, ...options });
  els.forEach((el) => observer.observe(el));
}
```

### ディレイの仕組み

```html
<div class="c-service-a" data-reveal data-delay="0">...</div>
<div class="c-service-a" data-reveal data-delay="1">...</div>
<div class="c-service-a" data-reveal data-delay="2">...</div>
```

```scss
// ディレイ用ユーティリティ
@for $i from 0 through 10 {
  [data-delay="#{$i}"] .c-service-a__inner {
    transition-delay: #{$i * 0.1}s;
  }
}
```

### GSAP + ScrollTrigger 使用時

```js
// 外枠にdata属性でGSAPを指定
// data-gsap="pin" → ScrollTriggerでpin
// data-gsap="scrub" → スクロール連動アニメーション
```

---

## コンポーネント一覧（全17カテゴリ・66パターン）

---

### 1. Navigation / Header（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| nav-a | ミニマルバー | ロゴ左＋テキストリンク右。固定ヘッダー。スクロールで背景ブラー追加 |
| nav-b | フルスクリーンメニュー | ハンバーガー → オーバーレイ全画面メニュー。3D背景またはアニメーション付きトランジション |
| nav-c | サイドナビ | 左または右サイドに縦型ナビ。セクションインジケーター（ドット or ライン）付き |

---

### 2. Hero / ファーストビュー（4パターン）

| ID | 名前 | 説明 |
|---|---|---|
| hero-a | タイポグラフィ特化 | 画面中央に巨大テキスト。背景に3Dパーティクルまたはシェーダー。文字がマスクやクリップで3Dと融合 |
| hero-b | 3Dオブジェクト中央 | 画面中央に3Dモデル/ジオメトリ。周囲にキャッチコピー＋CTA。マウス追従で回転 |
| hero-c | フルスクリーン動画/WebGL | 背景全面にビデオまたはWebGLシェーダー。オーバーレイテキスト＋スクロール誘導 |
| hero-d | スプリットレイアウト | 左半分テキスト＋右半分3Dまたはビジュアル。スクロールで両者がパララックスで分離 |

---

### 3. About / Philosophy（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| about-a | テキストリビール | スクロール連動で一文字ずつ（または一行ずつ）opacityが上がる。GSAP ScrollTrigger scrub使用 |
| about-b | 数字＋キービジュアル | 大きなキービジュアル（画像 or 3D）＋隣にテキスト＋数字カウントアップ |
| about-c | 横スクロールタイムライン | 縦スクロールを横移動に変換。年表/沿革を横に展開。各ポイントにマーカーアニメーション |

---

### 4. Service / What We Do（10パターン）

| ID | 名前 | 説明 |
|---|---|---|
| service-a | 3Dカードフリップ | グリッド配置のカード。ホバーでY軸回転し裏面に詳細表示 |
| service-b | アコーディオン | 縦積みの項目。クリックで展開し、右側または下部にビジュアル（画像/動画/3D）出現 |
| service-c | 横スクロールカルーセル | 横スクロール or ドラッグで切替。各カードにサムネ＋概要。クリックでモーダル詳細 |
| service-d | スティッキー左タイトル | 左にセクションタイトルが固定。右側をスクロールするとカードが順に入替 |
| service-e | 番号リスト＋ホバー画像 | 縦に番号付きテキストリスト。ホバーで右側に対応画像/動画がフェードイン |
| service-f | タブ切替 | 上部にタブ。切替時にコンテンツエリアがフェード or スライドで変化 |
| service-g | フルスクリーンスナップ | 1サービスにつき1画面。スクロールスナップで切替。各画面に固有の3D演出 |
| service-h | マウス追従画像リスト | テキストのみのリスト。ホバーするとマウスカーソルに追従する画像が出現（Awwwards頻出） |
| service-i | ベントグリッド | 不均等サイズのグリッドレイアウト。アイコン＋タイトル＋短文。ホバーで拡大やカラー変化 |
| service-j | フローチャート型 | SVGの線がスクロール連動で伸びながら各サービスノードを繋ぐ。線上にドットアニメーション |

---

### 5. Features / Strengths（10パターン）

| ID | 名前 | 説明 |
|---|---|---|
| feature-a | ピン留め切替 | セクションをスクロール固定（pin）。スクロール量に応じてコンテンツ（テキスト＋画像）が順次切り替わる |
| feature-b | カウントアップグリッド | 3〜4列のグリッド。数字＋ラベル＋アイコン。スクロール到達でカウントアップアニメーション |
| feature-c | ビフォーアフタースライダー | ドラッグ可能な中央線で左右の画像を比較。製品の効果やバージョン比較に |
| feature-d | ジグザグレイアウト | 左右交互にビジュアル＋テキスト。スクロールでフェードイン。奇数/偶数で方向反転 |
| feature-e | 背景色スクロール切替 | スクロール進行で背景色がスムーズに変化。各色に対応するコンテンツがフェードイン/アウト |
| feature-f | フリップカード | カード型。ホバーまたはクリックでフリップし裏面に詳細。CSSまたはGSAP |
| feature-g | テキスト主導型 | 巨大な1キーワードをスクロールで表示。続けてサブ情報がスタガーで出現。画像少なめ |
| feature-h | アイコンバー＋展開 | 横一列のアイコンバー。クリックで下にアコーディオン的にコンテンツ展開 |
| feature-i | パララックス多層 | 画像・テキスト・装飾が異なる速度でスクロール。奥行き感のある多層レイヤー構成 |
| feature-j | インフォグラフィック | SVGアニメーション＋データ可視化。グラフ、チャート、図解がスクロール到達で描画される |

---

### 6. Works / Case Study（8パターン）

| ID | 名前 | 説明 |
|---|---|---|
| works-a | マウス追従画像リスト | テキストリスト型。ホバーでマウスに追従する画像が出現。クリックで詳細ページへ |
| works-b | フィルタ付きグリッド | マソンリー or 均等グリッド。カテゴリフィルタ。切替時にレイアウトアニメーション |
| works-c | フルスクリーンスライダー | 1実績1画面。3Dトランジション（シェーダー歪み、カーテン、ディゾルブ等）で切替 |
| works-d | 横スクロールショーケース | 横方向に実績カードが流れる。各カードにサムネ＋タイトル＋カテゴリ。パララックス付き |
| works-e | ケーススタディ縦積み | 各実績を大きく1ブロックずつ縦積み。画像左＋テキスト右（交互可）。スクロールリビール |
| works-f | サムネ一覧＋モーダル詳細 | グリッドサムネ。クリックでフルスクリーンモーダルが展開（SPA的遷移アニメーション） |
| works-g | 数字ハイライト型 | 大きな実績番号（01, 02...）＋プロジェクト名＋ホバーで概要。数字をビジュアルアクセントに |
| works-h | インタラクティブマップ型 | 地図上またはグリッド配置上にプロジェクトをプロット。ホバーでプレビュー |

---

### 7. Product Showcase（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| product-a | 3Dモデルビューアー | 中央にGLTFモデル。ドラッグで回転。ホットスポット（クリックポイント）で各パーツの説明表示 |
| product-b | スクロール連動分解 | スクロール量に応じて製品の3Dモデルが分解/組立アニメーション。各パーツにラベル出現 |
| product-c | スペック比較テーブル | インタラクティブな比較表。製品切替ボタンで3Dモデルとスペックが連動変化 |

---

### 8. Team / People（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| team-a | グリッド＋ホバー切替 | 写真グリッド。ホバーで白黒→カラー＋役職・名前がスライドイン |
| team-b | 横スクロールカード | 横スクロール or ドラッグ。各メンバーカードに写真＋プロフィール |
| team-c | 3D浮遊カード | 3D空間にメンバーカードが浮遊。マウス移動でパララックス。クリックでカード拡大 |

---

### 9. Testimonial / Voice（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| testi-a | スライドカード | 引用テキスト＋著者情報のカード。自動or手動スライド。フェードまたはスライドトランジション |
| testi-b | 大型引用テキスト | 画面中央に大きな引用文。複数の引用をフェードで切替。背景にブランドロゴ |
| testi-c | ロゴウォール＋ホバー | クライアントロゴのグリッド or マーキー。ホバーで引用コメントがツールチップ表示 |

---

### 10. Numbers / Stats（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| stats-a | カウントアップ | 大きな数字がスクロール到達でゼロからカウントアップ。ラベル＋単位付き |
| stats-b | グラフアニメーション | 円グラフ/バーグラフがスクロール到達で描画アニメーション。SVGベース |
| stats-c | マーキー数字 | 無限横スクロールで数字＋キーワードが流れる。背景的な装飾として使用 |

---

### 11. Process / Flow（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| process-a | 縦タイムライン | 縦ラインの左右にステップ。スクロールで線が伸びてステップが出現 |
| process-b | スクロール連動ステップ | スクロール量に応じてプログレスバーが進行。各ステップがアクティブ化 |
| process-c | 横スクロールフロー | 横スクロールでステップを順に表示。矢印やラインで接続 |

---

### 12. News / Blog（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| news-a | カード型グリッド | 3列グリッド。サムネ＋日付＋タイトル＋カテゴリ。ホバーで浮き上がり |
| news-b | リスト型 | 日付＋タイトル＋カテゴリのテキストリスト。ホバーでサムネ画像がスライドイン |
| news-c | ティッカー型 | マーキーで最新ニュースのヘッドラインが流れる。クリックで記事ページへ |

---

### 13. CTA / コンバージョン（6パターン）

| ID | 名前 | 説明 |
|---|---|---|
| cta-a | フルスクリーンタイポ | 画面全体に巨大テキスト（ブランド名 or CTA文）＋ボタン。背景に3Dまたはグラデーション |
| cta-b | 3Dオブジェクト背景 | 背景に3Dシーン。フォアグラウンドにCTAテキスト＋ボタン。マウス連動 |
| cta-c | ミニマル一行 | 1行テキスト＋矢印リンク。水平線で区切り。ホワイトスペースを活かしたシンプル構成 |
| cta-d | スプリットCTA | 左右分割。左にCTAテキスト＋右にフォームまたはボタン。背景色の対比 |
| cta-e | スティッキーバナー | スクロールで画面下部に固定出現するバナー型CTA。閉じるボタン付き |
| cta-f | カウントダウン型 | キャンペーンLP用。残り時間カウントダウン＋CTA。緊急感のあるデザイン |

---

### 14. Contact / Form（5パターン）

| ID | 名前 | 説明 |
|---|---|---|
| contact-a | スプリット型 | 左に会社情報（住所、電話、メール、MAP）＋右にフォーム |
| contact-b | ステップフォーム | 1問ずつ全画面表示。Enter or ボタンで次へ。プログレスバー付き |
| contact-c | マップ＋情報 | 背景にインタラクティブマップ。オーバーレイで連絡先情報カード |
| contact-d | ミニマルフォーム | テキストフィールド＋テキストエリア＋送信の最小構成。ラベルがフロートするアニメーション |
| contact-e | インタラクティブ選択 | 問合せ内容を選択式で絞り込み（予算、種類、期間等）→最後にフリーテキスト＋送信 |

---

### 15. Footer（3パターン）

| ID | 名前 | 説明 |
|---|---|---|
| footer-a | ミニマル一行 | コピーライト＋SNSアイコン。シンプルに1行 |
| footer-b | メガフッター | ロゴ＋ナビリンク群＋ニュースレター登録＋SNS＋コピーライト。多段構成 |
| footer-c | 巨大テキストクロージング | ブランド名やメッセージを画面幅いっぱいに表示。下にミニマル情報。スクロールリビール |

---

### 16. Common / 装飾系（5パターン）

| ID | 名前 | 説明 |
|---|---|---|
| marquee | 無限横スクロール | テキストまたはロゴが無限に横スクロール。速度・方向設定可。セクション間の装飾に |
| divider | セクション区切り | SVGウェーブ、斜線、3Dオブジェクトなどのセクション区切り装飾 |
| loader | プリローダー | サイトロード時のローディング画面。カウント表示 or ブランドロゴアニメーション |
| transition | ページ遷移 | SPA的なページ遷移アニメーション。カーテン型、フェード、シェーダートランジション等 |
| cursor | カスタムカーソル | マウスカーソルのカスタム。ホバー拡大、テキスト表示、ブレンドモード差分等 |

---

## 各コンポーネントのファイル構成テンプレート

### HTMLスニペット（例: hero-a.html）

```html
<!-- hero-a: タイポグラフィ特化ヒーロー -->
<section class="c-hero-a" data-reveal data-component="hero-a">
  <div class="c-hero-a__bg" data-three="hero-a">
    <!-- Three.js がここに描画 -->
    <canvas class="c-hero-a__canvas"></canvas>
  </div>
  <div class="c-hero-a__inner l-container">
    <span class="c-hero-a__tag">タグライン</span>
    <h1 class="c-hero-a__title">
      <span class="c-hero-a__title-line" data-delay="0">メインコピー</span>
      <span class="c-hero-a__title-line" data-delay="1"><em>アクセントワード</em></span>
    </h1>
    <p class="c-hero-a__sub">サブコピーテキスト</p>
    <div class="c-hero-a__cta">
      <a href="#" class="c-hero-a__btn">ボタンテキスト</a>
    </div>
  </div>
  <div class="c-hero-a__scroll-indicator">
    <span>Scroll</span>
    <div class="c-hero-a__scroll-line"></div>
  </div>
</section>
```

### SCSSファイル（例: _c-hero-a.scss）

```scss
.c-hero-a {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  // ── Background (Three.js Canvas) ──
  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  &__canvas {
    width: 100%;
    height: 100%;
  }

  // ── Inner ──
  &__inner {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  // ── Tag ──
  &__tag {
    display: inline-block;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-accent);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.2s;
  }

  // ── Title ──
  &__title {
    font-family: var(--font-serif);
    font-size: clamp(3rem, 10vw, 9rem);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: -0.02em;

    em {
      font-style: italic;
      color: var(--color-accent);
    }
  }

  &__title-line {
    display: block;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  // ── Sub ──
  &__sub {
    margin-top: 1.5rem;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    color: var(--color-muted);
    font-weight: 300;
    max-width: 30ch;
    margin-inline: auto;
    line-height: 1.6;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.6s;
  }

  // ── Visible State ──
  &.is-visible {
    .c-hero-a__tag,
    .c-hero-a__sub {
      opacity: 1;
      transform: translateY(0);
    }

    .c-hero-a__title-line {
      opacity: 1;
      transform: translateY(0);
    }

    @for $i from 0 through 5 {
      .c-hero-a__title-line[data-delay="#{$i}"] {
        transition-delay: #{0.3 + $i * 0.15}s;
      }
    }
  }
}
```

### JSファイル（例: hero-a.js）

```js
// hero-a.js
import * as THREE from 'three';

export class HeroA {
  constructor(container) {
    this.container = container;
    this.canvas = container.querySelector('.c-hero-a__canvas');
    if (!this.canvas) return;

    this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    this.init();
    this.bind();
    this.animate();
  }

  init() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 6);

    // Objects（カスタマイズポイント）
    this.createObjects();

    // Lights
    this.createLights();
  }

  createObjects() {
    // Override this method for customization
  }

  createLights() {
    // Override this method for customization
  }

  bind() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth mouse
    this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.05;

    this.update();
    this.renderer.render(this.scene, this.camera);
  }

  update() {
    // Override this method for per-frame updates
  }

  destroy() {
    this.renderer.dispose();
  }
}
```

---

## SCSS変数テンプレート（_variables.scss）

```scss
// ── Colors ──
:root {
  --color-bg: #0a0a0c;
  --color-fg: #e8e4df;
  --color-accent: #c9ff53;
  --color-muted: #5a5650;
  --color-border: rgba(255, 255, 255, 0.06);
  --color-card-bg: rgba(255, 255, 255, 0.02);
}

// ── Typography ──
:root {
  --font-serif: 'Instrument Serif', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
}

// ── Breakpoints ──
$bp-sm: 576px;
$bp-md: 768px;
$bp-lg: 1024px;
$bp-xl: 1280px;
$bp-xxl: 1600px;

// ── Easing ──
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
$ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

// ── Spacing ──
$section-padding-y: clamp(4rem, 8vw, 8rem);
$container-max-width: 1200px;
$container-padding-x: clamp(1.5rem, 4vw, 2.5rem);

// ── Z-index ──
$z-bg: 0;
$z-content: 1;
$z-nav: 100;
$z-overlay: 200;
$z-modal: 300;
$z-cursor: 9999;
```

---

## コンポーネント開発の進め方

### Phase 1: 基盤構築
1. Viteプロジェクト初期化
2. FLOCSS ディレクトリ構成
3. foundation（reset, variables, mixins, base, typography）
4. layout（l-container, l-grid, l-section）
5. utility（u-visually-hidden, u-text, u-spacing）
6. scroll-observer.js, mouse-tracker.js 等のユーティリティJS
7. Three.js scene-manager.js

### Phase 2: コンポーネント作成（優先順）
1. **common**: loader, cursor, marquee
2. **nav**: nav-a, nav-b
3. **hero**: hero-a 〜 hero-d
4. **service**: service-a 〜 service-j
5. **feature**: feature-a 〜 feature-j
6. **works**: works-a 〜 works-h
7. **about**: about-a 〜 about-c
8. **cta**: cta-a 〜 cta-f
9. **contact**: contact-a 〜 contact-e
10. **残り**: product, team, testimonial, stats, process, news, footer

### Phase 3: カタログ＋プレビュー
- index.html に全コンポーネントのリンク一覧
- pages/ に各コンポーネントの個別プレビューページ

### Phase 4: サイト組み立て
- コンポーネントを選択・組み合わせ
- 全体のアニメーション連動（ScrollTriggerタイムライン統合）
- カラー・フォント・3Dオブジェクトのカスタマイズ
- レスポンシブ調整
- パフォーマンス最適化（LOD、遅延ロード、モバイル軽量化）