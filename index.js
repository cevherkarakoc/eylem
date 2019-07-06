const handler = keymap => keyCode => {
  if (!keymap[keyCode]) return;

  return (pair = keymap[keyCode]);
};

class Eylem {
  constructor(doc, actions) {
    this.doc = doc;
    this.key = null;
    this.actions = {};
    this.mouse = new MouseEvent('mousemove');

    actions.forEach(action => {
      this.actions[action] = 0;
    });
  }

  bindKeyMap(eventName, keyDownMap) {
    this.doc.addEventListener(
      eventName,
      e => this._handleInput(keyDownMap, e.keyCode),
      true
    );
  }

  bindMouseMap(eventName, mouseMap) {
    this.doc.addEventListener(
      eventName,
      e => this._handleInput(mouseMap, e.button),
      true
    );
  }

  watchMouse() {
    this.doc.addEventListener('mousemove', event => {
      this.mouse = event;
    });
  }

  clear() {
    for (let prop in this.actions) {
      this.actions[prop] = 0;
    }
    this.mouse = new MouseEvent('mousemove');
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
