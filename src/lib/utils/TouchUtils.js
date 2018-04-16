import Hammer, { Manager, Tap, Swipe, Press } from 'hammerjs';

class TouchUtils {
  static createdManager(element) {
    return new Hammer.Manager(element);
  }

  static createdTap(manager, taps, callbackFn) {
    const triple_tap = new Hammer.Tap({
      event: 'tap',
      taps,
    });
    manager.add(triple_tap);
    manager.on('tap', callbackFn);
  }

  static createdPress(manager, callbackFn) {
    const press = new Hammer.Press({
      time: 1000,
    });
    manager.add(press);
    manager.on('press', callbackFn);
  }

  static createdHorizontalSwipe(manager, callbackFn) {
    const swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 1,
      velocity: 0.1,
    });
    manager.add(swipe);
    manager.on('swipe', callbackFn);
  }

  static createdVerticalSwipe(manager, callbackFn) {
    const swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_VERTICAL,
      threshold: 1,
      velocity: 0.1,
    });
    manager.add(swipe);
    manager.on('swipe', callbackFn);
  }
}

export default TouchUtils;
