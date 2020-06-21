# Hi-Cord Banner UI Module using VanillaJS

- Author : Seolhun
- StartedDate : 2018.04.10

## Goal

- [x] Creating Banner UI easilly inserting data or api.
- [x] Responsive UI by devices.
- [ ] Wrapper iframe

## Module Spec

#### 1. Components

- BaseComponents.js : To create common component
  - BannerComponent.js : Extending `BaseComponent.js` to render BannerView

#### 2. Component Types

- Element.js : To create Dom
  - ElementItem.js : To create Dom values

##### - Details types

1. You can use the `Element` to define `Event Component`.

```js
import { Slide } from '@seolhun/events';

new Slide(document.getElementById('slide'), {
  slides,
  infinity: true,
  autoSlide: true,
  delayTime: 3000,
}).view();
```

```js
import { Slide } from '@seolhun/events';

SHEvent('slide')(document.getElementById('slide'), {
  slides,
  infinity: true,
  autoSlide: true,
  delayTime: 3000,
}).view();

```

#### Examples
- <a href='http://hi-cord-eventer.surge.sh' target='_blank' rel='noopener noreferrer'>http://hi-cord-eventer.surge.sh</a>

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
