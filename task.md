# Task Progress

全コンポーネントの制作進捗を管理する。セッションが変わっても参照できるよう、完了時にチェックを入れる。

## Foundation / Infrastructure

- [x] プロジェクト初期化 (Vite + SCSS + Three.js)
- [x] ディレクトリ構成作成
- [x] SCSS基盤 (reset, variables, mixins, base, typography, layout, utility)
- [x] JS基盤 (lib-loader, scroll-observer, mouse-tracker, resize-handler, smooth-scroll, app.js)
- [x] Three.js基盤 (scene-manager)
- [x] カタログページ (index.html)
- [ ] ModelViewer統合 (改善適用 → src/js/three/ に配置)

---

## Components (17 categories / 66 patterns)

### 1. Navigation (3)
- [ ] nav-a — ミニマルバー
- [ ] nav-b — フルスクリーンメニュー
- [ ] nav-c — サイドナビ

### 2. Hero (4)
- [ ] hero-a — タイポグラフィ特化
- [ ] hero-b — 3Dオブジェクト中央
- [ ] hero-c — フルスクリーンWebGL
- [ ] hero-d — スプリットレイアウト

### 3. About (3)
- [ ] about-a — テキストリビール
- [ ] about-b — 数字＋キービジュアル
- [ ] about-c — 横スクロールタイムライン

### 4. Service (10)
- [ ] service-a — 3Dカードフリップ
- [ ] service-b — アコーディオン
- [ ] service-c — 横スクロールカルーセル
- [ ] service-d — スティッキー左タイトル
- [ ] service-e — 番号リスト＋ホバー画像
- [ ] service-f — タブ切替
- [ ] service-g — フルスクリーンスナップ
- [ ] service-h — マウス追従画像リスト
- [ ] service-i — ベントグリッド
- [ ] service-j — フローチャート型

### 5. Feature (10)
- [ ] feature-a — ピン留め切替
- [ ] feature-b — カウントアップグリッド
- [ ] feature-c — ビフォーアフタースライダー
- [ ] feature-d — ジグザグレイアウト
- [ ] feature-e — 背景色スクロール切替
- [ ] feature-f — フリップカード
- [ ] feature-g — テキスト主導型
- [ ] feature-h — アイコンバー＋展開
- [ ] feature-i — パララックス多層
- [ ] feature-j — インフォグラフィック

### 6. Works (8)
- [ ] works-a — マウス追従画像リスト
- [ ] works-b — フィルタ付きグリッド
- [ ] works-c — フルスクリーンスライダー
- [ ] works-d — 横スクロールショーケース
- [ ] works-e — ケーススタディ縦積み
- [ ] works-f — サムネ一覧＋モーダル
- [ ] works-g — 数字ハイライト型
- [ ] works-h — インタラクティブマップ型

### 7. Product (3)
- [ ] product-a — 3Dモデルビューアー
- [ ] product-b — スクロール連動分解
- [ ] product-c — スペック比較テーブル

### 8. Team (3)
- [ ] team-a — グリッド＋ホバー切替
- [ ] team-b — 横スクロールカード
- [ ] team-c — 3D浮遊カード

### 9. Testimonial (3)
- [ ] testi-a — スライドカード
- [ ] testi-b — 大型引用テキスト
- [ ] testi-c — ロゴウォール＋ホバー

### 10. Stats (3)
- [ ] stats-a — カウントアップ
- [ ] stats-b — グラフアニメーション
- [ ] stats-c — マーキー数字

### 11. Process (3)
- [ ] process-a — 縦タイムライン
- [ ] process-b — スクロール連動ステップ
- [ ] process-c — 横スクロールフロー

### 12. News (3)
- [ ] news-a — カード型グリッド
- [ ] news-b — リスト型
- [ ] news-c — ティッカー型

### 13. CTA (6)
- [ ] cta-a — フルスクリーンタイポ
- [ ] cta-b — 3Dオブジェクト背景
- [ ] cta-c — ミニマル一行
- [ ] cta-d — スプリットCTA
- [ ] cta-e — スティッキーバナー
- [ ] cta-f — カウントダウン型

### 14. Contact (5)
- [ ] contact-a — スプリット型
- [ ] contact-b — ステップフォーム
- [ ] contact-c — マップ＋情報
- [ ] contact-d — ミニマルフォーム
- [ ] contact-e — インタラクティブ選択

### 15. Footer (3)
- [ ] footer-a — ミニマル一行
- [ ] footer-b — メガフッター
- [ ] footer-c — 巨大テキストクロージング

### 16. Common (5)
- [ ] marquee — 無限横スクロール
- [ ] divider — セクション区切り
- [ ] loader — プリローダー
- [ ] transition — ページ遷移
- [ ] cursor — カスタムカーソル

---

## Notes

- 各コンポーネント完成時は spec.md のセルフチェックリスト（Design/Usability/Creativity/Content）を確認すること
- コンポーネントのSCSSは style.scss への @use 追加、JSは app.js での初期化追加を忘れずに
