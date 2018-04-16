import BaseComponent from '../BaseComponent';
import { Element, ElementCallback } from '../../dom';

import { WindowControlUtils } from '../../utils';

import styles from './BannerComponent.scss';

class BannerComponentModel {
  constructor({ banners, infinity = true, auto = true, time = 3000 }) {
    this.banners = banners;
    this.infinity = infinity;
    this.auto = auto;
    this.time = time;
    this._isMobile = WindowControlUtils.isMobile(window);
  }
}

export default class BannerComponent extends BaseComponent {
  constructor({ target, banners, infinity = true, auto = true, time = 5000 }) {
    super(target);
    this.vm = new BannerComponentModel({ banners, infinity, auto, time });
    this.current_slide = 1;
    this.last_slide = this.vm.banners.length;

    if (this.vm.auto) {
      this._autoSliding();
    }

    window.addEventListener('resize', (event) => {
      // this.vm._isMobile = WindowControlUtils.isMobile(window);
      if (this.vm._isMobile !== WindowControlUtils.isMobile(window)) {
        this.vm._isMobile = WindowControlUtils.isMobile(window);
        console.log('??');
        this.view();
      }
    });
  }

  showSlide(slide_number) {
    if (slide_number < 1) {
      slide_number = 1;
    } else if (slide_number > this.last_slide) {
      slide_number = this.last_slide;
    } else {
      this._clearAutoSlidingTime();
      this.current_slide = slide_number;
    }

    let slide_items = document.getElementsByClassName(styles['hero-item']);
    let slide_dots = document.getElementsByClassName(styles['hero-indicator-btn']);

    for (let i = 0; i < this.last_slide; i++) {
      if (this.current_slide - 1 === i) {
        slide_items[i].classList.add(styles['on']);
        slide_dots[i].classList.add(styles['on']);
      } else {
        slide_items[i].classList.add(styles['off']);
        slide_items[i].classList.remove(styles['on']);
        slide_dots[i].classList.remove(styles['on']);
      }
    }
  }

  prevSlide() {
    if (this._isFirst()) {
      return this.showSlide(this.last_slide);
    }
    this.showSlide(this.current_slide - 1);
  }

  nextSlide() {
    if (this._isLast()) {
      return this.showSlide(1);
    }
    this.showSlide(this.current_slide + 1);
  }

  _isFirst() {
    if (this.current_slide <= 1) {
      return true;
    }
    return false;
  }

  _isLast() {
    if (this.current_slide >= this.last_slide) {
      return true;
    }
    return false;
  }

  _autoSliding() {
    if (!this.vm.infinity && this._isLast()) {
      return;
    }

    this._autoSlidingInstance = setTimeout(() => {
      this.nextSlide();
    }, this.vm.time);
  }

  _clearAutoSlidingTime() {
    if (this.vm.auto) {
      clearTimeout(this._autoSlidingInstance);
      this._autoSliding();
    }
  }

  _createBannerItems(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }

    return items.map((item, index) => {
      return new Element({
        tag: 'div',
        attributes: {
          className: [styles['hero-item'], index === 0 ? styles['on'] : styles['off'], 'fade'],
        },
        children: [
          new Element({
            tag: 'a',
            attributes: {
              href: item.link,
              className: styles['hero-item-link'],
            },
            children: [
              new Element({
                tag: 'img',
                attributes: {
                  src: item.image,
                  className: styles['hero-item-image'],
                },
                touch: new ElementCallback({
                  eventName: 'swipe',
                  callback: (event) => {
                    if (event.deltaX > 30) {
                      this.nextSlide();
                    }
                    if (event.deltaX < -30) {
                      this.prevSlide();
                    }
                  },
                }),
              }),
            ],
          }),
        ],
      });
    });
  }

  _createBannerIndcators(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }
    return items.map((item, index) => {
      return new Element({
        tag: 'i',
        attributes: {
          className: [styles['hero-indicator-btn'], index === 0 ? styles['on'] : ''],
        },
        on: {
          eventName: 'click',
          callback: () => this.showSlide(index + 1),
        },
      });
    });
  }

  view() {
    const bannerList = new Element({
      tag: 'aside',
      children: [
        new Element({
          tag: 'div',
          attributes: {
            className: styles['hero-slide'],
          },
          children: [
            ...this._createBannerItems(this.vm.banners),
            new Element({
              tag: 'div',
              attributes: {
                className: styles['hero-nav'],
              },
              children: [
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles['prev'],
                  },
                  on: new ElementCallback({
                    eventName: 'click',
                    callback: () => this.prevSlide()
                  }),
                }),
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles['next']
                  },
                  on: new ElementCallback({
                    eventName: 'click',
                    callback: () => this.nextSlide(),
                  }),
                }),
              ],
            }),
            new Element({
              tag: 'div',
              attributes: {
                className: styles['hero-indicator'],
              },
              children: [
                ...this._createBannerIndcators(this.vm.banners),
              ],
            }),
          ],
        }),
      ],
    });

    window.onload = () => {
      this._target.appendChild(bannerList.render());
    }
  }
}
