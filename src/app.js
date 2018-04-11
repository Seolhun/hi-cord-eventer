
import { BannerComponent } from './lib';

const app = document.getElementById('app');
const Banner = new BannerComponent({ banners: [{ link: '1.link', image: '1.com' }, { link: '2.link', image: '2.com' }], infinity: true });
Banner.view();
