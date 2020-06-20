import classnames from 'classnames';

import { EventViewComponent } from '../EventViewComponent';
import { Element } from '../../dom';

import './Banner.scss';

interface BannerProps<T = any> {
  banners: T[];

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

class Banner<T> extends EventViewComponent implements BannerProps<T> {
  banners: T[];

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
    target: string,
    { banners, infinity = true, autoSlide = true, delayTime = 5000 }: BannerProps<T>
  ) {
    super({ target });
    this.banners = banners;
    this.infinity = infinity;
    this.autoSlide = autoSlide;
    this.delayTime = delayTime;
    // DEFAULT_OPTION
    this.currentPage = 1;
    this.lastPage = banners.length;
    this.timeouts = null;
  }

  showSlide(currentSlide: number) {
    let currentcurrentSlide = currentSlide;
    if (currentcurrentSlide < 1) {
      currentcurrentSlide = 1;
    } else if (currentcurrentSlide > this.lastPage) {
      currentcurrentSlide = this.lastPage;
    } else {
      // Manual is changed, Current Settimeout must be stopped.
      this.cleaAutoSlidingTime();
      if (this.autoSlide) {
        this.autoSliding();
      }
      this.currentPage = currentSlide;
    }
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
    if (this.currentPage <= 1) {
      return true;
    }
    return false;
  }

  isLast() {
    if (this.currentPage >= this.lastPage) {
      return true;
    }
    return false;
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
      this.autoSliding();
    }, this.delayTime);
  }

  cleaAutoSlidingTime() {
    for (let i = 0; i < this.timeouts; i += 1) {
      clearTimeout(i);
    }
  }

  createBannerItems(items: T[]) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }

    return items.map((item, index) => new Element({
      tag: 'div',
      attributes: {
        className: classnames(['item', index === 0 ? 'on' : 'off', 'fade']),
      },
      childrens: [
        new Element<'a'>({
          tag: 'a',
          attributes: {
            href: item.link,
            className: 'link',
          },
          childrens: [
            new Element<'img'>({
              tag: 'img',
              attributes: {
                src: item,
                className: 'image',
              },
            }),
          ],
        }),
      ],
    }));
  }

  createBannerIndcators(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }
    return items.map(
      (item, index) =>
        new Element<HTMLDivElement>({
          tag: 'i',
          attributes: {},
          // attributes: {
          //   className: ['indicator-button', index === 0 ? 'on' : ''],
          // },
          event: {
            onClick: () => this.showSlide(index + 1),
          },
        })
    );
  }

  render() {
    this.cleaAutoSlidingTime();
    const bannerList = new Element({
      tag: 'aside',
      childrens: [
        new Element<'div'>({
          tag: 'div',
          attributes: {
            id: '__SH__slide',
            className: '__SH__slide',
          },
          childrens: [
            ...this.createBannerItems(this.banners),
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
              childrens: [...this.createBannerIndcators(this.vm.banners)],
            }),
          ],
        }),
      ],
    });
    this.target.appendChild(bannerList.render());
  }
}

export { Banner };
export default Banner;
