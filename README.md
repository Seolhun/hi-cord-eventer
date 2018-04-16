# HERO Banner UI Module using VanillaJS
- Author : Seolhun
- StartedDate : 2018.04.10

## Goal
- Creating Banner UI easilly inserting data or api.
- Responsive UI by devices.
- Mock API server in Client.
- MultiThread using Browswer and GPU

## Module Spec
#### 1. Components
- BaseComponents.js : To create common component
  - BannerComponent.js : Extending `BaseComponent.js` to render BannerView

#### 2. Component Types
- Element.js : To create Dom
  - ElementItem.js : To create Dom values
    - BannerItem.js : Extending `EelementItem.js` to create Banner values

##### - Details types
1. You can use the `Elementitem.js` to define `Component Item`. If you use it, It make you build The Item Types easily.
```javascript
export default class ElementItem {
  constructor({ value, tagName, className }) {
    this.value = value;
    this.tagName = tagName;
    this.className = className;
  }
}

export default class BannerItem {
  constructor({ image, link }) {
    this.image = new ElementItem(image);
    this.link = new ElementItem(link);
  }
}

// This is just example. 
// You can use ElementItem or Not. But, must match properties with ElementItem.
const Banner = new BannerComponent({
  banners: [
    new BannerItem({
      image: new ElementItem({
        tagName: 'img',
        value: '1.png',
        className: ['hero-item-image', 'item'],
      }),
      link: new ElementItem({
        value: 'example.com/1.png',
        className: 'hero-item-link',
      }),
    }),
    new BannerItem({
      image: {
        value: '2.png',
        className: 'hero-item-image',
      },
      link: {
        value: 'example.com/2.png',
        className: 'hero-item-link',
      }
    }),
  ],
  infinity: true,
  auto: true,
  time: 5000,
});
```

## Feature
1. You can custom Dom CSS to input className using ElementItem.js or Not.
  - I used [classnames](https://github.com/JedWatson/classnames) utility in `Element.js` for including many classnames easily.

2. You can custom 

#### Details Component
##### - BannerComponent Parameters
- banners : banner[];
  - banner : { image: string, link: string, order: number }
- infinity : boolean - default : true
  - Automatically repeat slide
- auto : boolean - default : true
  - Automatically changed slide
- time : number - default : 5000
  - The time sustaining in one slide


## - Library
- [Hammer.JS - A JavaScript library for detecting touch gestures](https://github.com/hammerjs/hammer.js)

## - Webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
  - Bundle with `index.html` using this.
