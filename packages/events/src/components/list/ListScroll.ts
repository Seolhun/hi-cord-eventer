import { EventComponent } from '../EventComponent';
import { Element } from '../../dom';

import './ListScroll.scss';

interface ListScrollItemProps {
  src: string;

  href: string;
}

interface ListScrollProps<T extends ListScrollItemProps> {
  items: T[];

  /**
   * infinitly auto sliding
   */
  infinity?: boolean;

  /**
   * Auto sliding pages
   */
  autoListScroll?: boolean;

  /**
   * Auto sliding delay time
   */
  delayTime?: number;
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
          new Element<'a'>({
            tag: 'a',
            attributes: {
              href: items.href,
              className: '__SH__ListScroll__Item__Link',
            },
            childrens: [
              new Element<'img'>({
                tag: 'img',
                attributes: {
                  src: items.src,
                  className: '__SH__ListScroll__Item__Image',
                },
              }),
            ],
          }),
        ],
      });
    });
  }

  render() {
    const items = new Element({
      tag: 'div',
      childrens: [
        new Element<'div'>({
          tag: 'div',
          attributes: {
            id: '__SH__ListScroll',
            className: '__SH__ListScroll',
          },
          childrens: [
            new Element<'div'>({
              tag: 'div',
              attributes: {
                className: '__SH__ListScroll__Container',
              },
              childrens: [...this.renderListScrollItems()],
            }),
          ],
        }),
      ],
    });
    this.element = items.element;
  }
}

export { ListScroll, ListScrollProps, ListScrollItemProps };
export default ListScroll;
