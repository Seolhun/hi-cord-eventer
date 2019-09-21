export class BannerComponentModel {
  constructor({
    banners, infinity = true, autoSlide = true, time = 3000,
  }) {
    this.banners = banners;
    this.infinity = infinity;
    this.autoSlide = autoSlide;
    this.time = time;
  }
}

export default BannerComponentModel;
