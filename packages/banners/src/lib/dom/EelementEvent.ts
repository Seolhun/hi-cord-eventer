interface ElementEventProps<T = Event> {
  /**
   * Set this to change event name
   */
  name: string;

  /**
   * Set this to change event callback
   */
  callback: (e: T) => void;

  /**
   * Set this to change event capturing
   */
  capture?: boolean;
}

class ElementEvent<T = Event> implements ElementEventProps<T> {
  /**
   * Set this to change event name
   */
  name: string;

  /**
   * Set this to change event callback
   */
  callback: (e: T) => void;

  /**
   * Set this to change event capturing
   */
  capture: boolean;

  constructor(props: ElementEventProps<T>) {
    const { name, callback, capture = false } = props;
    this.name = name;
    this.callback = callback;
    this.capture = capture;
  }
}

export {
  ElementEvent,
  ElementEventProps,
}
export default ElementEvent;
