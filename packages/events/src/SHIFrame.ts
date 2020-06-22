import { SHEventProps } from './SHEvent';

interface SHIFrameProps {
  target: SHEventProps['target'];

  element?: HTMLElement;
}

class SHIFrame implements SHIFrameProps {
  target: SHEventProps['target'];

  element?: HTMLElement;

  constructor(props: SHIFrameProps) {
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
    if (!document) {
      return null;
    }
    const iframe = document.createElement('iframe');
    if (!iframe.contentWindow) {
      return null;
    }
    const html = this.element.innerHTML;
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    return this.target.appendChild(iframe);
  }
}

export { SHIFrameProps, SHIFrame };
export default SHIFrame;
