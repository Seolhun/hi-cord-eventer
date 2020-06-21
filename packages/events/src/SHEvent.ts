import { Slide, SlideProps } from './components/slide';

interface SHEventProps {
  target: HTMLElement | null;
}

interface SHEventTypeMap {
  slide: SlideProps<any>;
}

const SHEvent = (type: keyof SHEventTypeMap) => (
  target: SHEventProps['target'],
  props: SHEventTypeMap[keyof SHEventTypeMap]
) => {
  switch (type) {
    case 'slide': {
      return new Slide(target, props);
    }
    default: {
      return new Slide(target, props);
    }
  }
};

export { SHEventProps, SHEventTypeMap, SHEvent };
export default SHEvent;
