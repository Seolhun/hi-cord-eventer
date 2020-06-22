import { Slide, SlideProps, ListScroll, ListScrollProps } from './components';

interface SHEventProps {
  target: HTMLElement | null;
}

interface SHEventTypeMap {
  slide: SlideProps<any>;
  list: ListScrollProps<any>;
}

const SHEvent = (type: keyof SHEventTypeMap) => (
  target: SHEventProps['target'],
  props: SHEventTypeMap[keyof SHEventTypeMap]
) => {
  switch (type) {
    case 'slide': {
      return new Slide(target, props);
    }
    case 'list': {
      return new ListScroll(target, props);
    }
    default: {
      return new Slide(target, props);
    }
  }
};

export { SHEventProps, SHEventTypeMap, SHEvent };
export default SHEvent;
