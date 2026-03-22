import * as THREE from 'three';

/**
 * Three.js シーン・カメラ・レンダラーの基本管理。
 * 各コンポーネントの3Dシーンが共通で必要とする初期化をまとめる。
 * ModelViewer とは別に、軽量なシェーダー/パーティクル背景用。
 */
export class SceneManager {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.options = {
      alpha: true,
      antialias: true,
      maxPixelRatio: 2,
      ...options,
    };

    this._animationId = null;
    this._isVisible = false;
    this._updateCallbacks = [];

    this._init();
  }

  _init() {
    const rect = this.canvas.parentElement.getBoundingClientRect();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.options.fov || 50,
      rect.width / rect.height,
      0.1,
      1000,
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: this.options.alpha,
      antialias: this.options.antialias,
    });
    this.renderer.setSize(rect.width, rect.height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.options.maxPixelRatio));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Visibility-based rendering
    this._io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this._isVisible = entry.isIntersecting;
          if (this._isVisible && !this._animationId) this._tick();
          if (!this._isVisible && this._animationId) {
            cancelAnimationFrame(this._animationId);
            this._animationId = null;
          }
        });
      },
      { threshold: 0.01 },
    );
    this._io.observe(this.canvas.parentElement);

    // Resize
    this._ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this._onResize(entry.contentRect.width, entry.contentRect.height);
      }
    });
    this._ro.observe(this.canvas.parentElement);
  }

  onUpdate(callback) {
    this._updateCallbacks.push(callback);
  }

  _tick() {
    if (!this._isVisible) return;
    this._updateCallbacks.forEach((cb) => cb(this));
    this.renderer.render(this.scene, this.camera);
    this._animationId = requestAnimationFrame(() => this._tick());
  }

  _onResize(width, height) {
    if (width === 0 || height === 0) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  destroy() {
    if (this._animationId) cancelAnimationFrame(this._animationId);
    if (this._io) this._io.disconnect();
    if (this._ro) this._ro.disconnect();
    this.renderer.dispose();
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }
}
