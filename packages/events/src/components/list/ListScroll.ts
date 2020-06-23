import { EventComponent } from '../EventComponent';
import { Element } from '../../dom';

import styles from './ListScroll.scss';

interface ListScrollItemProps {
  src: string;

  href: string;
}

interface ListScrollProps<T extends ListScrollItemProps> {
  items: T[];
}

class ListScroll<T extends ListScrollItemProps> extends EventComponent
  implements ListScrollProps<T> {
  items: T[];

  constructor(target: HTMLElement | null, { items }: ListScrollProps<T>) {
    super({ target });
    this.items = items;
    this.render();
  }

  renderListScrollItems() {
    return this.items.map((items) => {
      return new Element<'div'>({
        tag: 'div',
        attributes: {
          className: '__SH__ListScroll__Item',
        },
        childrens: [
          {
            tag: 'a',
            attributes: {
              href: items.href,
              target: '_blank',
              className: '__SH__ListScroll__Item__Link',
            },
            childrens: [
              {
                tag: 'img',
                attributes: {
                  src: items.src,
                  className: '__SH__ListScroll__Item__Image',
                },
              },
            ],
          },
        ],
      });
    });
  }

  iframe(option?: Partial<HTMLIFrameElement>) {
    this._iframe(option, styles);
    return this;
  }

  render() {
    const items = new Element<'div'>({
      tag: 'div',
      attributes: {
        id: '__SH__ListScroll',
        className: '__SH__ListScroll',
      },
      childrens: [
        {
          tag: 'div',
          attributes: {
            className: '__SH__ListScroll__Container',
          },
          childrens: [...this.renderListScrollItems()],
        },
      ],
    });
    this.element = items.element;
  }
}

export { ListScroll, ListScrollProps, ListScrollItemProps };
export default ListScroll;
