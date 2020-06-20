interface EventViewComponentProps {
  target: HTMLElement;

  element?: HTMLElement;
}

abstract class EventViewComponent implements EventViewComponentProps {
  target: HTMLElement;

  element?: HTMLElement;

  constructor(props: EventViewComponentProps) {
    this.target = props.target;
    this.element = props.element;
  }

  view() {
    if (!this.target) {
      return null;
    }
    if (!this.element) {
      return null;
    }
    return this.target.appendChild(this.element);
  }
}

export {
  EventViewComponentProps,
  EventViewComponent
};
export default EventViewComponent;
