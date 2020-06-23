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

  _iframe(option?: Partial<HTMLIFrameElement>, cssText = '') {
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
    const temporalElement = document.createElement('div');
    temporalElement.appendChild(this.element);
    const html = `<!DOCTYPE html>
      <html>
        <head>
          <style type="text/css">${cssText}</style>
          <meta http-equiv="Access-Control-Allow-Origin" CONTENT="http://localhost:8080">
        </head>
        <body>
          ${temporalElement.innerHTML}
        </body>
      </html>
    `;
    const iframeOption: Partial<HTMLIFrameElement> = {
      id: 'SHIFrame',
      src: `data:text/html;charset=utf-8, ${encodeURI(html)}`,
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
      console.error('There are no target element DOM');
      return this;
    }
    if (!this.element) {
      console.error('There are error create Component element');
      return this;
    }
    if (this.iframeElement) {
      this.target.appendChild(this.iframeElement);
      return this;
    }
    this.target.appendChild(this.element);
    return this;
  }
}

export { EventComponentProps, EventComponent };
export default EventComponent;
