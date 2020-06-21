import { SHEvent } from '@seolhun/events';

const items = [
  {
    src: 'https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBanner',
    href:
      'https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero',
  },
  {
    src: 'https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBanner',
    href:
      'https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero',
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

// SHEvent('slide')(document.getElementById('app'), {
//   items,
//   infinity: true,
//   autoSlide: true,
//   delayTime: 3000,
// }).view();


SHEvent('list')(document.getElementById('app'), {
  items,
  infinity: true,
  autoSlide: true,
  delayTime: 3000,
}).view();
