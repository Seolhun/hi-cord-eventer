import { SHEventProps } from '../SHEvent';

interface EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;
}

abstract class EventComponent implements EventComponentProps {
  target: SHEventProps['target'];

  element?: HTMLElement;

  private iframeElement?: HTMLIFrameElement | null;

  constructor(props: EventComponentProps) {
    this.target = props.target;
    this.element = props.element;
    this.iframeElement = null;
  }

  iframe(option?: Partial<HTMLIFrameElement>) {
    if (!this.target) {
      return this;
    }
    if (!this.element) {
      return this;
    }
    if (!document) {
      return this;
    }
    this.iframeElement = document.createElement('iframe');
    const temporalWrapperElement = document.createElement('div');
    temporalWrapperElement.appendChild(this.element);
    const html = temporalWrapperElement.innerHTML;
    const iframeOption = {
      src: 'data:text/html;charset=utf-8,' + encodeURI(html),
      width: '100%',
      height: '450px',
      frameBorder: '0',
      ...option,
    };
    Object.assign(this.iframeElement, iframeOption);
    return this;
  }

  view() {
    if (!this.target) {
      return null;
    }
    if (!this.element) {
      return null;
    }
    if (this.iframeElement) {
      return this.target.appendChild(this.iframeElement);
    }
    return this.target.appendChild(this.element);
  }
}

export { EventComponentProps, EventComponent };
export default EventComponent;
