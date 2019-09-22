# Hi-Cord Banner UI Module using VanillaJS

- Author : Seolhun
- StartedDate : 2018.04.10

## Goal

- [x] Creating Banner UI easilly inserting data or api.
- [x] Responsive UI by devices.
- [ ] Mock API server in Client.
- [ ] MultiThread using Browswer and GPU

## Module Spec

#### 1. Components

- BaseComponents.js : To create common component
  - BannerComponent.js : Extending `BaseComponent.js` to render BannerView

#### 2. Component Types

- Element.js : To create Dom
  - ElementItem.js : To create Dom values

##### - Details types

1. You can use the `Elementitem.js` to define `Component Item`. If you use it, It make you build The Item Types easily.

```javascript
class Element {
  constructor({ tag, attributes, children, on }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.on = new ElementCallback({ ...on });
  }
}

class ElementCallback {
  constructor({ eventName, callback, capture = false }) {
    this.eventName = eventName;
    this.callback = callback;
    this.capture = capture;
  }
}

// This is just example.
// You can use ElementItem or Not. But, must match properties with ElementItem.
const app = document.getElementById("app");
new BannerComponent({
  banners,
  infinity: true,
  auto: true,
  time: 3000,
  target: app,
}).view();
```

#### Examples
- [http://hi-cord-banners.surge.sh]([hi-cord-banners.surge.sh](http://hi-cord-banners.surge.sh))

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

- [axios - To use XHR easily](https://github.com/axios/axios)
- [axios-mock-adapter - To build Mock using axios](https://github.com/ctimmerm/axios-mock-adapter)
