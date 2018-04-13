import ElementItem from '../../dom/ElementItem';

export default class BannerItem {
  constructor({ image, link }) {
    this.image = new ElementItem(image);
    this.link = new ElementItem(link);
  }
}
