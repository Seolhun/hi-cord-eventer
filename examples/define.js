
import { BannerComponent, BannerItem } from './lib';

const banners = [
  {
    link: '/ko/comic/dalbox',
    image: 'https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner',
  }, {
    link: '/ko/comic/dalbox',
    image: 'https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner',
  }, new BannerItem({
    link: '/ko/novel/leviathan',
    image: 'https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner',
  }),
];

const app = document.getElementById('app');
const Banner = new BannerComponent({
  banners,
  infinity: true, // default : true
  auto: true, // default : true
  time: 5000, // default : 3000
});
Banner.view();
