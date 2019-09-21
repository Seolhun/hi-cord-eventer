import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { BannerComponent } from "../dist";

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

const MobileBanners = [
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5876703202246656/media/upperBannerMobile",
    link:
      "https://www.lezhin.com/ko/page/shocking_sale180416_all?utm_source=lz&utm_medium=banner&utm_campaign=shocking_sale180416_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5016845850640384/media/upperBannerMobile",
    link:
      "https://www.lezhin.com/ko/page/sale180412_all?utm_source=lz&utm_medium=banner&utm_campaign=sale180412_allutm_content=hero",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/4537033910124544/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/page/sale1704W1_ALL",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/5439666241929216/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/comic/dalbox",
  },
  {
    image:
      "https://cdn.lezhin.com/v2/inventory_items/6120926790549504/media/upperBannerMobile",
    link: "https://www.lezhin.com/ko/novel/leviathan",
  },
];

const mock = new MockAdapter(axios);
function getBanners(device = "desktop", count = 4) {
  mock.onGet("/banners", { params: { device, count } }).reply(200, {
    banners: device === "mobile" ? MobileBanners : PcBanners,
  });
  return axios.get("/banners", { params: { device, count } });
}

const BannerView = async () => {
  const response = await getBanners();
  const banners = response.data.banners;
  new BannerComponent({
    banners,
    infinity: true,
    autoSlide: true,
    time: 3000,
    target: app,
  }).view();
};

BannerView();
