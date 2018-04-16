
import { BannerComponent, BannerItem } from './lib';
import { WindowUtils } from './lib/utils';

const pc_banners = [
  {
    image: "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBanner",
    link: "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBanner",
    link: "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner",
    link: "https://www.lezhin.com/ko/comic/dalbox"
  }, new BannerItem({
    image: "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner",
    link: "https://www.lezhin.com/ko/novel/leviathan"
  }),
]

const mobile_banners = [
  {
    image: "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL"
  }, {
    image: "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/comic/dalbox"
  }, new BannerItem({
    image: "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/novel/leviathan"
  }),
]

let isMobile = WindowUtils.isMobile(window);
let banners = isMobile ? mobile_banners : pc_banners;

const app = document.getElementById('app');
new BannerComponent({
  banners,
  infinity: true,
  auto: true,
  time: 3000,
  element: app,
}).view();
