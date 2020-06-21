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
      return null;
    }
    if (!this.element) {
      return null;
    }
    return this.target.appendChild(this.element);
  }
}

export { EventComponentProps, EventComponent };
export default EventComponent;
