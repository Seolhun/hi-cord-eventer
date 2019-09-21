import { BannerComponentModel } from './BannerComponentModel';
import { BaseComponent } from '../BaseComponent';
import { Element, ElementCallback } from '../../dom';

import styles from './BannerComponent.scss';

export class BannerComponent extends BaseComponent {
  constructor({
    target,
    banners,
    infinity = true,
    autoSlide = true,
    time = 5000,
  }) {
    super(target);
    this.vm = new BannerComponentModel({
      banners, infinity, autoSlide, time,
    });
    this.current_slide = 1;
    this.last_slide = this.vm.banners.length;
    this.timeoutInstance = null;
    if (this.vm.autoSlide) {
      this.autoSliding();
    }
  }

  showSlide(slideNumber) {
    let currentSlideNumber = slideNumber;
    if (currentSlideNumber < 1) {
      currentSlideNumber = 1;
    } else if (currentSlideNumber > this.last_slide) {
      currentSlideNumber = this.last_slide;
    } else {
      // Manual is changed, Current Settimeout must be stopped.
      this.cleaAutoSlidingTime();
      if (this.vm.autoSlide) {
        this.autoSliding();
      }
      this.current_slide = slideNumber;
    }
    this.changedItemsEvent();
  }

  changedItemsEvent() {
    const slideItems = document.getElementsByClassName(styles['hero-item']);
    const slideDots = document.getElementsByClassName(
      styles['hero-indicator-btn'],
    );
    for (let i = 0; i < this.last_slide; i += 1) {
      if (this.current_slide - 1 === i) {
        slideItems[i].classList.add(styles.on);
        slideDots[i].classList.add(styles.on);
      } else {
        slideItems[i].classList.add(styles.off);
        slideItems[i].classList.remove(styles.on);
        slideDots[i].classList.remove(styles.on);
      }
    }
  }

  prevSlide() {
    if (this.isFirst()) {
      return this.showSlide(this.last_slide);
    }
    return this.showSlide(this.current_slide - 1);
  }

  nextSlide() {
    if (this.isLast()) {
      return this.showSlide(1);
    }
    return this.showSlide(this.current_slide + 1);
  }

  isFirst() {
    if (this.current_slide <= 1) {
      return true;
    }
    return false;
  }

  isLast() {
    if (this.current_slide >= this.last_slide) {
      return true;
    }
    return false;
  }

  autoSliding() {
    if (!this.vm.infinity && this.isLast()) {
      return;
    }

    this.timeoutInstance = setTimeout(() => {
      if (this.isLast()) {
        this.current_slide = 1;
      } else {
        this.current_slide = this.current_slide + 1;
      }
      this.changedItemsEvent();
      this.autoSliding();
    }, this.vm.time);
  }

  cleaAutoSlidingTime() {
    for (let i = 0; i < this.timeoutInstance; i += 1) {
      clearTimeout(i);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  createBannerItems(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }

    return items.map((item, index) => new Element({
      tag: 'div',
      attributes: {
        className: [
          styles['hero-item'],
          index === 0 ? styles.on : styles.off,
          'fade',
        ],
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
    return items.map((item, index) => new Element({
      tag: 'i',
      attributes: {
        className: [
          styles['hero-indicator-btn'],
          index === 0 ? styles.on : '',
        ],
      },
      on: {
        eventName: 'click',
        callback: () => this.showSlide(index + 1),
      },
    }));
  }

  view() {
    this.cleaAutoSlidingTime();
    const bannerList = new Element({
      tag: 'aside',
      children: [
        new Element({
          tag: 'div',
          attributes: {
            id: 'hero-slide',
            className: styles['hero-slide'],
          },
          children: [
            ...this.createBannerItems(this.vm.banners),
            new Element({
              tag: 'div',
              attributes: {
                className: styles['hero-nav'],
              },
              children: [
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles.prev,
                  },
                  on: new ElementCallback({
                    eventName: 'click',
                    callback: () => this.prevSlide(),
                  }),
                }),
                new Element({
                  tag: 'button',
                  attributes: {
                    className: styles.next,
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
              children: [...this.createBannerIndcators(this.vm.banners)],
            }),
          ],
        }),
      ],
    });
    this.target.appendChild(bannerList.render());
  }
}

export default BannerComponent;
