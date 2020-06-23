import classnames from 'classnames';

import { EventComponent } from '../EventComponent';
import { Element } from '../../dom';

import './Slide.scss';

interface SlideItemProps {
  src: string;

  href: string;
}

interface SlideProps<T extends SlideItemProps> {
  items: T[];

  /**
   * infinitly auto sliding
   */
  infinity?: boolean;

  /**
   * Auto sliding pages
   */
  autoSlide?: boolean;

  /**
   * Auto sliding delay time
   */
  delayTime?: number;
}

class Slide<T extends SlideItemProps> extends EventComponent implements SlideProps<T> {
  items: T[];

  /**
   * infinitly auto sliding
   */
  infinity?: boolean;

  /**
   * Auto sliding pages
   */
  autoSlide?: boolean;

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
    { items, infinity = true, autoSlide = true, delayTime = 5000 }: SlideProps<T>
  ) {
    super({ target });
    this.items = items;
    this.infinity = infinity;
    this.autoSlide = autoSlide;
    this.delayTime = delayTime;
    // DEFAULT_OPTION
    this.currentPage = 0;
    this.lastPage = items.length - 1;
    this.timeouts = null;

    if (this.autoSlide) {
      this.initAutoSlide();
    }
    this.render();
  }

  // Uncaught DOMException: Blocked a frame with origin "http://localhost:8080" from accessing a cross-origin frame.
  changedItemsEvent() {
    const slideItems = document.getElementsByClassName('__SH__Slide__Item');
    const slideDots = document.getElementsByClassName('__SH__Slide__Indicator__Button');
    for (let i = 0; i <= this.lastPage; i += 1) {
      if (this.currentPage === i) {
        slideItems[i].classList.add('on');
        slideDots[i].classList.add('on');
        slideItems[i].classList.remove('off');
      } else {
        slideItems[i].classList.add('off');
        slideItems[i].classList.remove('on');
        slideDots[i].classList.remove('on');
      }
    }
  }

  initAutoSlide() {
    if (!this.infinity && !this.isLast()) {
      return;
    }

    this.timeouts = setInterval(() => {
      this.nextSlide();
    }, this.delayTime);
    return this;
  }

  clearAutoSlideTimeouts() {
    clearInterval(this.timeouts);
    return this;
  }

  isLast() {
    return this.currentPage >= this.lastPage;
  }

  showSlide(nextSlide: number) {
    if (nextSlide < 0) {
      this.currentPage = this.lastPage;
    } else if (nextSlide > this.lastPage) {
      this.currentPage = 0;
    } else {
      this.currentPage = nextSlide;
    }
    this.changedItemsEvent();
  }

  prevSlide() {
    this.showSlide(this.currentPage - 1);
    this.clearAutoSlideTimeouts().initAutoSlide();
  }

  nextSlide() {
    this.showSlide(this.currentPage + 1);
    this.clearAutoSlideTimeouts().initAutoSlide();
  }

  onClickIndicator(index: number) {
    this.showSlide(index);
    this.clearAutoSlideTimeouts().initAutoSlide();
  }

  renderSlideItems() {
    if (!Array.isArray(this.items)) {
      throw new Error('The Element children have to be Array type');
    }

    return this.items.map((items, index) => {
      return new Element<'div'>({
        tag: 'div',
        attributes: {
          className: classnames([
            '__SH__Slide__Item',
            '__SH__fade',
            this.currentPage === index ? 'on' : 'off',
          ]),
        },
        childrens: [
          {
            tag: 'a',
            attributes: {
              href: items.href,
              target: '_blank',
              className: '__SH__Slide__Item__Link',
            },
            childrens: [
              new Element<'img'>({
                tag: 'img',
                attributes: {
                  src: items.src,
                  className: '__SH__Slide__Item__Image',
                },
              }),
            ],
          },
        ],
      });
    });
  }

  renderSlideIndicators() {
    return this.items.map(
      (_, index) =>
        new Element<'i'>({
          tag: 'i',
          attributes: {
            className: classnames(['__SH__Slide__Indicator__Button', this.currentPage === index ? 'on' : 'off']),
            onclick: () => this.onClickIndicator(index),
          },
        })
    );
  }

  render() {
    const items = new Element<'div'>({
      tag: 'div',
      attributes: {
        id: '__SH__Slide',
        className: '__SH__Slide',
      },
      childrens: [
        {
          tag: 'div',
          attributes: {
            className: '__SH__Slide__Container',
          },
          childrens: [
            ...this.renderSlideItems(),
            {
              tag: 'div',
              attributes: {
                className: '__SH__Slide__Navigation',
              },
              childrens: [
                {
                  tag: 'span',
                  attributes: {
                    className: 'prev',
                    innerHTML: `
                      <svg viewBox="0 0 12 12">
                        <polyline points="12 12 8 6 12 0" />
                      </svg>
                    `,
                    onclick: () => this.prevSlide(),
                  },
                },
                {
                  tag: 'span',
                  attributes: {
                    className: 'next',
                    innerHTML: `
                      <svg viewBox="0 0 12 12">
                        <polyline points="0 0 4 6 0 12" />
                      </svg>
                    `,
                    onclick: () => this.nextSlide(),
                  },
                },
              ],
            },
            {
              tag: 'div',
              attributes: {
                className: '__SH__Slide__Indicator',
              },
              childrens: [...this.renderSlideIndicators()],
            },
          ],
        },
      ],
    });
    this.element = items.element;
  }
}

export { Slide, SlideProps, SlideItemProps };
export default Slide;
