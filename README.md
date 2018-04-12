# HERO Banner UI Module using VanillaJS
- Author : Seolhun
- StartedDate : 2018.04.10

## Goal
- Creating Banner UI easilly inserting data or api.
- Responsive UI by devices.
- Mock API server in Client.
- MultiThread using Browswer and GPU

## Module Spec
#### Structure
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
  - Bundle with `index.html` using this.
