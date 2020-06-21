# Hi-Cord Banner UI Module using VanillaJS

- Author : Seolhun
- StartedDate : 2018.04.10

## Goal

- [x] Creating Banner UI easilly inserting data or api.
- [x] Responsive UI by devices.
- [ ] Wrapper iframe

## Install

```bash
$ npm install @seolhun/events
```

```bash
$ yarn add @seolhun/events
```

## Module Spec

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