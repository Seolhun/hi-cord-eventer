class ElementCallback {
  constructor({ eventName, callback, capture = false }) {
    this.eventName = eventName;
    this.callback = callback;
    this.capture = capture;
  }
}

export default ElementCallback;
