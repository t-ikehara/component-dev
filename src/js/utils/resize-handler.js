/**
 * リサイズイベントのデバウンスハンドラ。
 * 登録したコールバックをまとめて呼び出す。
 */
class ResizeHandler {
  constructor(delay = 150) {
    this._listeners = [];
    this._timeoutId = null;
    this._delay = delay;
    this._width = window.innerWidth;
    this._height = window.innerHeight;

    window.addEventListener('resize', () => this._onResize(), { passive: true });
  }

  get width() { return this._width; }
  get height() { return this._height; }
  get isMobile() { return this._width < 768; }
  get isTablet() { return this._width >= 768 && this._width < 1080; }
  get isDesktop() { return this._width >= 1080; }

  onResize(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((cb) => cb !== callback);
    };
  }

  _onResize() {
    clearTimeout(this._timeoutId);
    this._timeoutId = setTimeout(() => {
      this._width = window.innerWidth;
      this._height = window.innerHeight;
      this._listeners.forEach((cb) => cb(this._width, this._height));
    }, this._delay);
  }
}

export const resizeHandler = new ResizeHandler();
