import BaseComponent from '../BaseComponent';
import Element from '../../scripts/elements/Element';

export default class BannerComponent extends BaseComponent {
  constructor({ banners, infinity }) {
    super({ banners, infinity });
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

  /**
   * @argument banners
   */
  _createBannerItems() {
    return this._vm.banners.map((banner) => {
      return new Element({
        tag: 'div',
        attributes: {
          className: 'hero-list-item'
        },
        children: {
          heroLink: new Element({
            tag: 'a',
            attributes: {
              href: banner.link,
              className: 'hero-item-link'
            },
            children: {
              heroImage: new Element({
                tag: 'img',
                attributes: {
                  src: banner.image,
                  className: 'hero-item-image'
                },
              }),
            }
          }),
        },
      });
    });
  }

  view() {
    const todoInputForm = new Element({
      tag: 'aside',
      children: {
        heroList: new Element({
          tag: 'div',
          attributes: {
            className: 'hero-list'
          },
          children: this._createBannerItems(),
        }),
        heroNav: new Element({
          tag: 'div',
          attributes: {
            className: 'hero-nav'
          },
          children: {
            heroNavItem: new Element({
              tag: 'button',
              attributes: {
                textContent: 'Nav-Left',
                className: 'hero-nav-btn',
              },
            }),
            heroNavItem: new Element({
              tag: 'button',
              attributes: {
                textContent: 'Nav-Right',
                className: 'hero-nav-btn',
              },
            }),
          },
        }),
        heroIndicator: new Element({
          tag: 'div',
          attributes: {
            className: 'hero-list',
          },
          children: {
            heroIndicatorBtn: new Element({
              tag: 'button',
              attributes: {
                textContent: 'Indicator',
                className: 'hero-nav-btn',
              },
            }),
          },
        }),
        formSubmitBtn: new Element({
          tag: 'button',
          attributes: {
            type: 'submit',
            className: 'submitBtn',
            textContent: 'add',
          },
          on: {
            event: 'click',
            function(event) {
              event.preventDefault();
              console.log('event is ran');
            },
          },
        }),
      },
    });
    app.appendChild(todoInputForm.render());
  }
}
