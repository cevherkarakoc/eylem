# eylem
[![npm version](https://img.shields.io/npm/v/eylem.svg?style=flat)](https://www.npmjs.com/package/eylem)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcevherkarakoc%2Feylem.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcevherkarakoc%2Feylem?ref=badge_shield)

A JavaScript input handling library for animation or game loops

## Installation
```
npm install eylem
// or
yarn add eylem
```

## Usage ##

### Initialize
```javascript
import Eylem from 'eylem';

const inputs = new Eylem(document, ['horizantal', 'vertical', 'fire']);
```

### Bind keymap
```javascript
//KeyCode 65:A, 68:D, 83:S, 87:W
inputs.bindInputMap(Eylem.KEY_DOWN, {
  65: { action: 'horizantal', value: -1 },
  68: { action: 'horizantal', value: +1 },
  83: { action: 'vertical', value: -1 },
  87: { action: 'vertical', value: +1 },
});
```

### Bind mouse buttons
```javascript
// 0 : Left Mouse Button
inputs.bindInputMap(Eylem.MOUSE_DOWN, {
  0: {action : 'fire', value : 1}
});
```

### Watch Mouse Movement
```javascript
inputs.watchMouse();
```

### Get Inputs
```javascript
// in a Animation Loop   
function step() {
    const mouseLeft = inputs.getValue('action'); // 0 or 1
    const horizantal = inputs.getValue('horizantal'); // -1 or 0 or 1

    const mouseEvent = inputs.mouse; // MouseEvent Object
    const {offsetX, screenX, movementX} = mouseEvent;

    // clear the inputs at the end
    inputs.clear();
    window.requestAnimationFrame(step);
}
```


# License
Licensed under the [MIT license](LICENSE).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcevherkarakoc%2Feylem.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcevherkarakoc%2Feylem?ref=badge_large)