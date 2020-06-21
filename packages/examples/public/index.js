(function () {
  'use strict';

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
    throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var classnames = createCommonjsModule(function (module) {
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */

    /* global define */
    (function () {
      var hasOwn = {}.hasOwnProperty;

      function classNames() {
        var classes = [];

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg) continue;
          var argType = typeof arg;

          if (argType === 'string' || argType === 'number') {
            classes.push(arg);
          } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);

            if (inner) {
              classes.push(inner);
            }
          } else if (argType === 'object') {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }

        return classes.join(' ');
      }

      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  });

  class EventComponent {
    constructor(props) {
      this.target = props.target;
      this.element = props.element;
    }

    view() {
      if (!this.target) {
        return null;
      }

      if (!this.element) {
        return null;
      }

      return this.target.appendChild(this.element);
    }

  }

  class Element {
    constructor(props) {
      const {
        tag,
        attributes,
        childrens
      } = props;
      this.element = this.render(tag, attributes, childrens);
    }

    render(tag, attributes, childrens) {
      this.element = document.createElement(tag);

      if (attributes) {
        Object.assign(this.element, { ...attributes
        });
      }

      if (Array.isArray(childrens)) {
        childrens.forEach(children => {
          this.element.appendChild(children.element);
        });
      }

      return this.element;
    }

  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "/*===============\n      Variable\n===============*/\n/*===============\n      Style\n===============*/\n.__SH__slide {\n  max-width: 1200px;\n  position: relative;\n  margin: auto; }\n  .__SH__slide .item {\n    width: 100%;\n    height: 100%; }\n    .__SH__slide .item .link .image {\n      width: 100%;\n      height: 100%; }\n    .__SH__slide .item.on {\n      display: block !important; }\n    .__SH__slide .item.off {\n      display: none; }\n  .__SH__slide .navigation {\n    position: absolute;\n    top: 45%;\n    left: 0;\n    right: 0; }\n    .__SH__slide .navigation .prev, .__SH__slide .navigation .next {\n      position: absolute;\n      border: 0;\n      padding: 25px;\n      cursor: pointer;\n      z-index: 10; }\n      @media screen and (max-width: 768px) {\n        .__SH__slide .navigation .prev, .__SH__slide .navigation .next {\n          display: none;\n          height: 100%; } }\n    .__SH__slide .navigation .prev {\n      left: 0;\n      background-position: 0px 0px; }\n    .__SH__slide .navigation .next {\n      right: 0;\n      background-position: 0px -50px; }\n  .__SH__slide .indicator {\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: 15px 0;\n    position: absolute;\n    text-align: center;\n    z-index: 10; }\n    @media screen and (max-width: 768px) {\n      .__SH__slide .indicator {\n        margin: 10px 0; } }\n    .__SH__slide .indicator .indicator-button {\n      cursor: pointer;\n      display: inline-block;\n      width: 15px;\n      height: 15px;\n      margin: 0px 3px;\n      border-radius: 100%;\n      background: #fff;\n      opacity: 0.4; }\n      @media screen and (max-width: 768px) {\n        .__SH__slide .indicator .indicator-button {\n          width: 10px;\n          height: 10px; } }\n      .__SH__slide .indicator .indicator-button.on {\n        opacity: 1; }\n\n/* Fading animation */\n.fade {\n  -webkit-animation-name: fade;\n          animation-name: fade;\n  -webkit-animation-duration: 1.5s;\n          animation-duration: 1.5s; }\n\n@-webkit-keyframes fade {\n  from {\n    opacity: 0.4; }\n  to {\n    opacity: 1; } }\n\n@keyframes fade {\n  from {\n    opacity: 0.4; }\n  to {\n    opacity: 1; } }\n";
  styleInject(css_248z);

  class Slide extends EventComponent {
    constructor(target, {
      slides,
      infinity = true,
      autoSlide = true,
      delayTime = 5000
    }) {
      super({
        target
      });
      this.slides = slides;
      this.infinity = infinity;
      this.autoSlide = autoSlide;
      this.delayTime = delayTime; // DEFAULT_OPTION

      this.currentPage = 1;
      this.lastPage = slides.length;
      this.timeouts = null;

      if (this.autoSlide) {
        this.autoSliding();
      }

      this.render();
    }

    showSlide(currentSlide) {
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
        return new Element({
          tag: 'div',
          attributes: {
            className: classnames(['item', index === 0 ? 'on' : 'off', 'fade'])
          },
          childrens: [new Element({
            tag: 'a',
            attributes: {
              href: slides.href,
              className: 'link'
            },
            childrens: [new Element({
              tag: 'img',
              attributes: {
                src: slides.src,
                className: 'image'
              }
            })]
          })]
        });
      });
    }

    createSlideIndcators() {
      if (!Array.isArray(this.slides)) {
        throw new Error('The Element children have to be Array type');
      }

      return this.slides.map((_, index) => new Element({
        tag: 'i',
        attributes: {
          className: classnames(['indicator-button', index === 0 ? 'on' : '']),
          onclick: () => this.showSlide(index + 1)
        }
      }));
    }

    render() {
      const slides = new Element({
        tag: 'div',
        childrens: [new Element({
          tag: 'div',
          attributes: {
            id: '__SH__slide',
            className: '__SH__slide'
          },
          childrens: [...this.createSlideItems(), new Element({
            tag: 'div',
            attributes: {
              className: 'navigation'
            },
            childrens: [new Element({
              tag: 'button',
              attributes: {
                className: 'prev',
                onclick: () => this.prevSlide()
              }
            }), new Element({
              tag: 'button',
              attributes: {
                className: 'next',
                onclick: () => this.nextSlide()
              }
            })]
          }), new Element({
            tag: 'div',
            attributes: {
              className: 'indicator'
            },
            childrens: [...this.createSlideIndcators()]
          })]
        })]
      });
      this.element = slides.element;
    }

  }

  const SHEvent = type => (target, props) => {
    switch (type) {
      case 'slide':
        {
          return new Slide(target, props);
        }

      default:
        {
          return new Slide(target, props);
        }
    }
  };

  const slides = [
      {
          src: 'https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBanner',
          href: 'https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero',
      },
      {
          src: 'https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBanner',
          href: 'https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero',
      },
      {
          src: 'https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner',
          href: 'https://www.lezhin.com/ko/page/sale1704W1_ALL',
      },
      {
          src: 'https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner',
          href: 'https://www.lezhin.com/ko/comic/dalbox',
      },
      {
          src: 'https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner',
          href: 'https://www.lezhin.com/ko/novel/leviathan',
      },
  ];
  SHEvent('slide')(document.getElementById('slide'), {
      slides,
      infinity: true,
      autoSlide: true,
      delayTime: 3000,
  }).view();

}());
