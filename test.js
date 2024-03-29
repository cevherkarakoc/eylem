const Eylem = require('./index');
PointerEvent = MouseEvent;

const KEY_A = 65,
  KEY_D = 68;

describe('TEST', () => {
  const eylem = new Eylem(document, ['horizantal', 'vertical', 'jump']);
  beforeAll(() => {
    const keyMap = {
      65: { action: 'horizantal', value: -1 },
      68: { action: 'horizantal', value: +1 },
    };

    const mouseMap = {
      0: { action: 'jump', value: 1 },
    };

    eylem.bindInputMap(Eylem.KEY_DOWN, keyMap);
    eylem.bindInputMap(Eylem.MOUSE_DOWN, mouseMap);
    eylem.watchMouse();
    eylem.watchPointer();
  });

  test('Default values of actions must be 0(zero)', () => {
    const excepted = 0;

    expect(eylem.getValue('horizantal')).toEqual(excepted);
    expect(eylem.getValue('vertical')).toEqual(excepted);
    expect(eylem.getValue('jump')).toEqual(excepted);
  });

  test('When KEY_A down, the value of horizantal action must be -1(negative one)', () => {
    const excepted = -1;

    const event = new KeyboardEvent('keydown', { keyCode: KEY_A });
    document.dispatchEvent(event);

    expect(eylem.getValue('horizantal')).toEqual(excepted);
  });

  test('When KEY_D down, the value of horizantal action must be +1(positive one)', () => {
    const excepted = 1;

    const event = new KeyboardEvent('keydown', { keyCode: KEY_D });
    document.dispatchEvent(event);

    expect(eylem.getValue('horizantal')).toEqual(excepted);
  });

  test('When Mouse0(Left Mouse Button) down, the value of jump action must be +1(positive one)', () => {
    const excepted = 1;

    const event = new MouseEvent('mousedown', { button: 0 });
    document.dispatchEvent(event);

    expect(eylem.getValue('jump')).toEqual(excepted);
  });

  test('When mouse move, mouse.clientX must be equal to Event.clientX', () => {
    const expected = 710;
    const event = new MouseEvent('mousemove', { clientX: 710 });
    document.dispatchEvent(event);

    expect(eylem.mouse.clientX).toEqual(expected);
  });

  test('When pointer move, pointer.clientX must be equal to Event.clientX', () => {
    const expected = 420;
    const event = new PointerEvent('pointermove', { clientX: expected });
    document.dispatchEvent(event);
    
    expect(eylem.pointer.clientX).toEqual(expected);
  });

  test('After clean, values of actions must be 0(zero)', () => {
    const excepted = 0;

    eylem.actions['horizantal'] = 1;
    eylem.actions['vertical'] = -1;

    eylem.clear();

    expect(eylem.getValue('horizantal')).toEqual(excepted);
    expect(eylem.getValue('vertical')).toEqual(excepted);
    expect(eylem.getValue('jump')).toEqual(excepted);
  });
});
