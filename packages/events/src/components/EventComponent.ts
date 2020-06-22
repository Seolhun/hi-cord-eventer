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

  iframe() {
    if (!this.target) {
      return null;
    }
    if (!this.element) {
      return null;
    }
    if (!document) {
      return null;
    }
    this.iframeElement = document.createElement('iframe');
    if (!this.iframeElement.contentWindow) {
      return null;
    }
    const html = this.element.innerHTML;
    document.body.appendChild(this.iframeElement);
    this.iframeElement.contentWindow.document.open();
    this.iframeElement.contentWindow.document.write(html);
    this.iframeElement.contentWindow.document.close();
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
