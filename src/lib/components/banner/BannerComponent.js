import BaseComponent from '../BaseComponent';
import Element from '../../dom/Element';

import styles from './BannerComponent.scss';

class BannerComponentModel {
  constructor({ banners, infinity = true, auto = true, time = 3000 }) {
    this.banners = banners;
    this.infinity = infinity;
    this.auto = auto;
    this.time = time;
  }
}

export default class BannerComponent extends BaseComponent {
  constructor({ banners, infinity = true, auto = true, time = 3000 }) {
    super();
    this.vm = new BannerComponentModel({ banners, infinity, auto, time });

    this._current_slide = 1;
    this._last_slide = this.vm.banners.length;

    if (this.vm.auto) {
      this.nextSlide();
    }
  }

  goSlide(order) {
    console.log(`go to slide #${order}`);
  }

  isLast() {
    if (document.getElementsByClassName(styles['next-slide'])) {
      return true;
    }
    return false;
  }

  nextSlide() {
    if(this.isLast() && !this.vm.infinity) {
      return;
    }

    setTimeout(() => {
      console.log('next-slide');
      this._nextSlide();
    }, this.vm.time);
  }

  _createBannerItems(items) {
    if (!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }
    return this._createChidren(items);
  }

  _createChidren(items) {
    return items.map((item) => {
      return new Element({
        tag: 'div',
        attributes: {
          className: styles['hero-item'],
        },
        children: [
          new Element({
            tag: item.link.tagName ? item.link.tagName : 'a',
            attributes: {
              href: item.link.value,
              className: item.link.className ? item.link.className : styles['hero-item-link'],
            },
            children: [
              new Element({
                tag: item.image.tagName ? item.image.tagName : 'img',
                attributes: {
                  src: item.image.value,
                  className: item.image.className ? item.image.className : styles['hero-item-image'],
                },
              }),
            ],
          }),
        ],
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
            className: 'hero-list'
          },
          children: this._createBannerItems(this.vm.banners),
        }),
        new Element({
          tag: 'div',
          attributes: {
            className: styles['hero-nav'],
          },
          children: [
            new Element({
              tag: 'button',
              attributes: {
                className: [styles['hero-nav-btn'], styles['--prev']],
              },
              on: {
                event: 'click',
                function: () => {
                  console.log('Nav-Left');
                }
              },
            }),
            new Element({
              tag: 'button',
              attributes: {
                className: [styles['hero-nav-btn'], styles['--next']]
              },
              on: {
                event: 'click',
                function: () => {
                  console.log('Nav-Right');
                }
              },
            }),
          ],
        }),
        new Element({
          tag: 'div',
          attributes: {
            className: styles['hero-indicator'],
          },
          children: [
            new Element({
              tag: 'button',
              attributes: {
                className: styles['hero-indicator-btn'],
              },
            }),
          ],
        }),
      ],
    });
    app.appendChild(bannerList.render());
  }
}
