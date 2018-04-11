# HERO Banner UI Module using VanillaJS
- Author : Seolhun
- StartedDAte : 2018.04.10

## - Goal
- Banner UI Module using VanillaJS.
- Responsive UI by device.
- Mock API server in Client.
- MultiThread using Browswer and GPU

## - Module Spec
#### - Structure
- aside
  - div.hero-list
    - div.hero-item
      - a.hero-item-link
        - img.hero-item-image 
  - div.hero-nav
    - div.hero-nav-btn
  - div.hero-indicator
    - i.hero-indicator-btn

#### - Parameters
- banners : banner[];
  - banner : { image: string, link: string, order: number }
- infinity : boolean

## - Webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
  - Build시 index.html을 같이 빌드해주는 라이브러리입니다. 여러가지 기능이 제공됩니다.
