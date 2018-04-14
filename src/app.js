
import { BannerComponent, BannerItem, ElementItem } from './lib';

import axios from 'axios';
import nock from 'nock';

// const BannerAPI = nock('http://example.com', {
//   reqheaders: {
//     'Access-Control-Allow-Origin': '*'
//   }
// }).get('/banners', {}).reply(200, [
//   {
//     image: "https://cdn.lezhin.com/v2/inventory_items/6272864723140608/media/upperBanner",
//     link: "/ko/payment"
//   }, {
//     image: "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner",
//     link: "/ko/page/sale1704W1_ALL"
//   }, {
//     image: "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner",
//     link: "/ko/comic/dalbox"
//   }, {
//     image: "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner",
//     link: "/ko/novel/leviathan"
//   },
// ]);

// axios.get('http://example.com/banners').then((res) => {
//   console.log(res);
// })

const app = document.getElementById('app');
const Banner = new BannerComponent({
  banners: [
    new BannerItem({
      link: {
        value: '/ko/comic/dalbox',
      },
      image: {
        value: 'https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner',
      },
    }),
    new BannerItem({
      link: {
        value: '/ko/comic/dalbox',
      },
      image: {
        value: 'https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner',
      },
    }),
    new BannerItem({
      link: new ElementItem({
        value: '/ko/novel/leviathan',
      }),
      image: new ElementItem({
        value: 'https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner',
      }),
    }),
  ],
  infinity: false,
  auto: true,
  time: 3000,
});
Banner.view();
