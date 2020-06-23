import { SHEventProps } from '../SHEvent';

interface EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;
}

abstract class EventComponent implements EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;

  constructor(props: EventComponentProps) {
    this.target = props.target;
    this.element = props.element;
  }

  view() {
    if (!this.target) {
      console.error('There are no target element DOM');
      return this;
    }
    if (!this.element) {
      console.error('There are error create Component element');
      return this;
    }
    this.target.appendChild(this.element);
    return this;
  }
}

export { EventComponentProps, EventComponent };
export default EventComponent;
