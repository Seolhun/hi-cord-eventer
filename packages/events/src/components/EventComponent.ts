import { SHEventProps } from '../SHEvent';
import { SHIFrame } from '../SHIFrame';

interface EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;

  useIframe?: boolean;
}

abstract class EventComponent implements EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;

  useIframe?: boolean;

  constructor(props: EventComponentProps) {
    this.target = props.target;
    this.element = props.element;
    this.useIframe = props.useIframe || false;
  }

  view() {
    if (!this.target) {
      return null;
    }
    if (!this.element) {
      return null;
    }
    if (this.useIframe) {
      return new SHIFrame({
        target: this.target,
        element: this.element,
      }).view();
    }
    return this.target.appendChild(this.element);
  }
}

export { EventComponentProps, EventComponent };
export default EventComponent;
