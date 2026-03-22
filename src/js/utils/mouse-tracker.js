/**
 * マウス座標の正規化・補間ユーティリティ。
 * service-h (マウス追従画像), cursor (カスタムカーソル), hero-b (3D回転) 等で利用。
 */
class MouseTracker {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.normalizedX = 0; // -1 ~ 1
    this.normalizedY = 0; // -1 ~ 1
    this.lerpX = 0;
    this.lerpY = 0;
    this._listeners = [];
    this._bound = this._onMove.bind(this);
    this._rafId = null;
    this._active = false;
  }

  start() {
    if (this._active) return;
    this._active = true;
    window.addEventListener('mousemove', this._bound, { passive: true });
    window.addEventListener('touchmove', this._onTouch.bind(this), { passive: true });
    this._tick();
  }

  stop() {
    this._active = false;
    window.removeEventListener('mousemove', this._bound);
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  onMove(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  }

  _onMove(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.normalizedX = (this.x / window.innerWidth) * 2 - 1;
    this.normalizedY = -(this.y / window.innerHeight) * 2 + 1;
  }

  _onTouch(e) {
    if (e.touches.length > 0) {
      this._onMove(e.touches[0]);
    }
  }

  _tick() {
    if (!this._active) return;

    const ease = 0.08;
    this.lerpX += (this.x - this.lerpX) * ease;
    this.lerpY += (this.y - this.lerpY) * ease;

    this._listeners.forEach((cb) => cb(this));
    this._rafId = requestAnimationFrame(() => this._tick());
  }
}

export const mouseTracker = new MouseTracker();
