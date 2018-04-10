# HERO Banner UI Module using VanillaJS
- Author : Seolhun
- StartedDAte : 2018.04.10

## Banner Component Parameters
- banners : banner[];
  - banner : { image: string, link: string, order: number }
- infinity : boolean

## Webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
  - Build시 index.html을 같이 빌드해주는 라이브러리입니다. 여러가지 기능이 제공됩니다.
- [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals)
  - Build시 node_modules같은 패키지를 제외시켜주는 라이브러리입니다.
