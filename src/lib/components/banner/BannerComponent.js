import BaseComponent from '../BaseComponent';
import Element from '../../dom/Element';

import styles from './BannerComponent.scss';

export default class BannerComponent extends BaseComponent {
  constructor({ banners, infinity = true, auto = true, time = 3000 }) {
    super({ items: banners });
    this.infinity = infinity,
    this.auto = auto,
    this.time = time
  }

  // - aside
  //   - div.hero-list
  //     - div.hero-item
  //       - a.hero-item-link
  //         - img.hero-item-image
  //   - div.hero-nav
  //     - div.hero-nav-btn
  //   - div.hero-indicator
  //     - i.hero-indicator-btn

  createBannerItems(items) {
    if(!Array.isArray(items)) {
      throw new Error('The Element children have to be Array type');
    }
    return this._createChidren(items);
  }

  _createChidren(items) {
    return items.map((item) => {
      return new Element({
        tag: 'div',
        attributes: {
          className: 'hero-list-item'
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
          children: this.createBannerItems(this._items),
        }),
        new Element({
          tag: 'div',
          attributes: {
            className: 'hero-nav'
          },
          children: [
            new Element({
              tag: 'button',
              attributes: {
                textContent: 'Nav-Left',
                className: 'hero-nav-btn',
              },
              on: {
                event: 'onclick',
                function() {
                  console.log('Nav-Left');
                }
              },
            }),
            new Element({
              tag: 'button',
              attributes: {
                textContent: 'Nav-Right',
                className: 'hero-nav-btn',
              },
              on: {
                event: 'onclick',
                function() {
                  console.log('Nav-Right');
                }
              },
            }),
          ],
        }),
        new Element({
          tag: 'div',
          attributes: {
            className: 'hero-list',
          },
          children: [
            new Element({
              tag: 'button',
              attributes: {
                textContent: 'Indicator',
                className: 'hero-nav-btn',
              },
            }),
          ],
        }),
      ],
    });
    app.appendChild(bannerList.render());
  }
}
