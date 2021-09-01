class Eylem {
  static get KEY_DOWN() {
    return {
      name: 'keydown',
      code: 'keyCode',
    };
  }

  static get KEY_PRESS() {
    return {
      name: 'keypress',
      code: 'keyCode',
    };
  }

  static get KEY_UP() {
    return {
      name: 'keyup',
      code: 'keyCode',
    };
  }

  static get MOUSE_DOWN() {
    return {
      name: 'mousedown',
      code: 'button',
    };
  }

  static get MOUSE_UP() {
    return {
      name: 'mouseup',
      code: 'button',
    };
  }

  constructor(doc, actions) {
    this.doc = doc;
    this.key = null;
    this.actions = {};
    this.mouse = new MouseEvent('mousemove');

    this._mouseMoveListener = event => {
      this.mouse = event;
    };

    actions.forEach(action => {
      this.actions[action] = 0;
    });
  }

  bindInputMap(event, inputMap) {
    this.doc.addEventListener(
      event.name,
      e => this._handleInput(inputMap, e[event.code]),
      true
    );
  }

  watchMouse() {
    this.doc.addEventListener('mousemove', this._mouseMoveListener, true);
  }

  stopWatchMouse() {
    this.doc.removeEventListener('mousemove', this._mouseMoveListener, true);
  }

  clear(clearMouseEvent = false) {
    for (let prop in this.actions) {
      this.actions[prop] = 0;
    }

    if (clearMouseEvent) {
      this.mouse = new MouseEvent('mousemove');
    }
  }

  getValue(action) {
    return this.actions[action];
  }

  _handleInput(map, code) {
    const pair = map[code];
    if (!pair) return;
    this.actions[pair.action] = pair.value;
  }
}

module.exports = Eylem;
