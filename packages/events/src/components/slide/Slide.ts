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
    this.currentPage = 1;
    this.lastPage = slides.length;
    this.timeouts = null;

    if (this.autoSlide) {
      this.autoSliding();
    }
    this.render();
  }

  showSlide(currentSlide: number) {
    if (this.isLast()) {
      this.currentPage = 0;
      return;
    }
    if (this.isFirst()) {
      this.currentPage = this.lastPage;
      return;
    }
    this.currentPage = currentSlide;
    this.changedItemsEvent();
  }

  changedItemsEvent() {
    const slideItems = document.getElementsByClassName('item');
    const slideDots = document.getElementsByClassName('indicator-button');
    for (let i = 0; i < this.lastPage; i += 1) {
      if (this.currentPage - 1 === i) {
        slideItems[i].classList.add('on');
        slideDots[i].classList.add('on');
      } else {
        slideItems[i].classList.add('off');
        slideItems[i].classList.remove('on');
        slideDots[i].classList.remove('on');
      }
    }
  }

  prevSlide() {
    if (this.isFirst()) {
      return this.showSlide(this.lastPage);
    }
    return this.showSlide(this.currentPage - 1);
  }

  nextSlide() {
    if (this.isLast()) {
      return this.showSlide(1);
    }
    return this.showSlide(this.currentPage + 1);
  }

  isFirst() {
    return this.currentPage <= 1;
  }

  isLast() {
    return this.currentPage >= this.lastPage;
  }

  autoSliding() {
    if (!this.infinity && this.isLast()) {
      return;
    }

    this.timeouts = setInterval(() => {
      if (this.isLast()) {
        this.currentPage = 1;
      } else {
        this.currentPage = this.currentPage + 1;
      }
      this.changedItemsEvent();
    }, this.delayTime);
  }

  cleaAutoSlidingTime() {
    clearInterval(this.timeouts);
  }

  createSlideItems() {
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
      })
    });
  }

  createSlideIndcators() {
    if (!Array.isArray(this.slides)) {
      throw new Error('The Element children have to be Array type');
    }
    return this.slides.map((_, index) =>
      new Element<'i'>({
        tag: 'i',
        attributes: {
          className: classnames(['indicator-button', index === 0 ? 'on' : '']),
          onclick: () => this.showSlide(index + 1),
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
            ...this.createSlideItems(),
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
              childrens: [...this.createSlideIndcators()],
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
