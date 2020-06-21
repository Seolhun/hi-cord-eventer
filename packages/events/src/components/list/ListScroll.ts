import classnames from 'classnames';

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

class ListScroll<T extends ListScrollItemProps> extends EventComponent implements ListScrollProps<T> {
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

  /**
   * @name DEFAULT_OPTION
   */
  /**
   * current slide page
   */
  currentPage: number;

  /**
   * last slide page
   */
  lastPage: number;

  /**
   * current interval timeouts
   */
  timeouts: NodeJS.Timeout | any;

  constructor(
    target: HTMLElement | null,
    { items, infinity = true, autoListScroll = true, delayTime = 5000 }: ListScrollProps<T>
  ) {
    super({ target });
    this.items = items;
    this.infinity = infinity;
    this.autoListScroll = autoListScroll;
    this.delayTime = delayTime;
    // DEFAULT_OPTION
    this.currentPage = 0;
    this.lastPage = items.length - 1;
    this.timeouts = null;

    if (this.autoListScroll) {
      this.initAutoListScroll();
    }
    this.render();
  }

  initAutoListScroll() {
    if (!this.infinity && !this.isLast()) {
      return;
    }

    this.timeouts = setInterval(() => {
      this.nextListScroll();
    }, this.delayTime);
    return this;
  }

  clearAutoListScrollTimeouts() {
    clearInterval(this.timeouts);
    return this;
  }

  isLast() {
    return this.currentPage >= this.lastPage;
  }

  showListScroll(nextListScroll: number) {
    if (nextListScroll < 0) {
      this.currentPage = this.lastPage;
    } else if (nextListScroll > this.lastPage) {
      this.currentPage = 0;
    } else {
      this.currentPage = nextListScroll;
    }
    console.log(this.currentPage);
  }

  prevListScroll() {
    this.showListScroll(this.currentPage - 1);
    this.clearAutoListScrollTimeouts().initAutoListScroll();
  }

  nextListScroll() {
    this.showListScroll(this.currentPage + 1);
    this.clearAutoListScrollTimeouts().initAutoListScroll();
  }

  onClickIndicator(index: number) {
    this.showListScroll(index);
    this.clearAutoListScrollTimeouts().initAutoListScroll();
  }

  renderListScrollItems() {
    return this.items.map((items) => {
      return new Element<'div'>({
        tag: 'div',
        attributes: {
          className: 'item',
        },
        childrens: [
          new Element<'a'>({
            tag: 'a',
            attributes: {
              href: items.href,
              className: 'item__link',
            },
            childrens: [
              new Element<'img'>({
                tag: 'img',
                attributes: {
                  src: items.src,
                  className: 'item__image',
                },
              }),
            ],
          }),
        ],
      });
    });
  }

  renderListScrollIndicators() {
    return this.items.map(
      (_, index) =>
        new Element<'i'>({
          tag: 'i',
          attributes: {
            className: classnames(['indicator-button', index === 0 ? 'on' : '']),
            onclick: () => this.onClickIndicator(index),
          },
        })
    );
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
              childrens: [
                ...this.renderListScrollItems(),
              ]
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
