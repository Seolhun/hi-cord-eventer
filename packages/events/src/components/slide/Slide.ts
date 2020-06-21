import classnames from 'classnames';

import { EventComponent } from '../EventComponent';
import { Element } from '../../dom';

import './Slide.scss';

interface SlideItemProps {
  src: string;

  href: string;
}

interface SlideProps<T extends SlideItemProps> {
  slides: T[];

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
  slides: T[];

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
    { slides, infinity = true, autoSlide = true, delayTime = 5000 }: SlideProps<T>
  ) {
    super({ target });
    this.slides = slides;
    this.infinity = infinity;
    this.autoSlide = autoSlide;
    this.delayTime = delayTime;
    // DEFAULT_OPTION
    this.currentPage = 0;
    this.lastPage = slides.length - 1;
    this.timeouts = null;

    if (this.autoSlide) {
      this.initAutoSlide();
    }
    this.render();
  }

  changedItemsEvent() {
    const slideItems = document.getElementsByClassName('item');
    const slideDots = document.getElementsByClassName('indicator-button');
    for (let i = 0; i <= this.lastPage; i += 1) {
      if (this.currentPage === i) {
        slideItems[i].classList.add('on');
        slideDots[i].classList.add('on');
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
    console.log(this.currentPage);
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
    if (!Array.isArray(this.slides)) {
      throw new Error('The Element children have to be Array type');
    }

    return this.slides.map((slides, index) => {
      return new Element<'div'>({
        tag: 'div',
        attributes: {
          className: classnames(['item', index === 0 ? 'on' : 'off', 'fade']),
        },
        childrens: [
          new Element<'a'>({
            tag: 'a',
            attributes: {
              href: slides.href,
              className: 'link',
            },
            childrens: [
              new Element<'img'>({
                tag: 'img',
                attributes: {
                  src: slides.src,
                  className: 'image',
                },
              }),
            ],
          }),
        ],
      });
    });
  }

  renderSlideIndicators() {
    return this.slides.map(
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
    const slides = new Element({
      tag: 'div',
      childrens: [
        new Element<'div'>({
          tag: 'div',
          attributes: {
            id: '__SH__slide',
            className: '__SH__slide',
          },
          childrens: [
            ...this.renderSlideItems(),
            new Element<'div'>({
              tag: 'div',
              attributes: {
                className: 'navigation',
              },
              childrens: [
                new Element<'button'>({
                  tag: 'button',
                  attributes: {
                    className: 'prev',
                    onclick: () => this.prevSlide(),
                  },
                }),
                new Element<'button'>({
                  tag: 'button',
                  attributes: {
                    className: 'next',
                    onclick: () => this.nextSlide(),
                  },
                }),
              ],
            }),
            new Element({
              tag: 'div',
              attributes: {
                className: 'indicator',
              },
              childrens: [...this.renderSlideIndicators()],
            }),
          ],
        }),
      ],
    });
    this.element = slides.element;
  }
}

export { Slide, SlideProps, SlideItemProps };
export default Slide;
