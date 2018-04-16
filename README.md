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
class Element {
  constructor({ tag, attributes, children, on, touch }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.on = new ElementCallback({ ...on });
    this.touch = new ElementCallback({ ...touch });
  }
}

class ElementCallback {
  constructor({ eventName, callback, capture = false }) {
    this.eventName = eventName;
    this.callback = callback;
    this.capture = capture;
  }
}


class BannerItem {
  constructor({ image, link }) {
    this.image = image;
    this.link = link;
  }
}

// This is just example. 
// You can use ElementItem or Not. But, must match properties with ElementItem.
const app = document.getElementById('app');
new BannerComponent({
  banners,
  infinity: true,
  auto: true,
  time: 3000,
  target: app,
}).view();
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
- [classnames - A simple javascript utility for conditionally joining classNames together](https://github.com/JedWatson/classnames)
- [axios - To use XHR easily](https://github.com/axios/axios)
- [axios-mock-adapter - To build Mock using axios](https://github.com/ctimmerm/axios-mock-adapter)

## - Webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
  - Bundle with `index.html` using this.
- [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
