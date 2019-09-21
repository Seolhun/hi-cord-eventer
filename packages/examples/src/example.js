import "core-js";
import { BannerComponent } from "@seolhun/hi-cord-eventer";

const PcBanners = [
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBanner",
    link:
      "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBanner",
    link:
      "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBanner",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBanner",
    link: "https://www.lezhin.com/ko/comic/dalbox",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBanner",
    link: "https://www.lezhin.com/ko/novel/leviathan",
  },
];

new BannerComponent({
  banners: PcBanners,
  infinity: true,
  autoSlide: true,
  time: 3000,
  target: app,
}).view();
