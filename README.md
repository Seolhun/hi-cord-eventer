# Hi-Cord Banner UI Module using VanillaJS

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
import { SHEvent } from '@seolhun/events';

SHEvent('slide')(document.getElementById('slide'), {
  slides,
  infinity: true,
  autoSlide: true,
  delayTime: 3000,
}).view();

```

#### Examples
- <a href='http://hi-cord-eventer.surge.sh' target='_blank' rel='noopener noreferrer'>http://hi-cord-eventer.surge.sh</a>