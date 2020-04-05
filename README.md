# webpack_conf

A webpack configuration for webdevs using scss, postcss, html and js.

Based on HtmlWebpackPlugin.

Comes with postcss autoprefixer.

## File structure:

The following setup will only work on a specific file structure:

```
    src
    |_  html
    |   |_  index.html
    |   |_  ....html
    |
    |_  img
    |_  svg
    |_  scss
    |_  css
    |_  js
    |_  vid

    node_modules
    |_  ...

    dist
    |_  index.html
    |_  html
    |   |_  ....html
    |
    |_  img
    |_  svg
    |_  scss
    |_  css
    |_  js
    |_  vid

```

All the media folders (img, svg, vid) should have their contents placed there directly, without creating subfolders. This is important to ensure the `resolve` in `webpack.config.js` is working correctly.

The webpack output will be put into `dist/`. Webpack will place `index.html` directly under `dist/index.html`. All other assets will be placed in the corresponding folder in `dist/`.

## Important notes

### Concerning sass-loader and urls

At this time of writing `sass-loader` does not work with `url()` references in mixins [Problems with url(...)](https://github.com/webpack-contrib/sass-loader#problems-with-url). Thats why I added the resolves to `webpack.config.js`.

Therefore it is important that any relative paths in scss files are rewritten to make use of webpack resolve.

Example:
1. Reference to `src/img/...` file: `url(~img/...)`. (It doesn't matter how deep you are in the subfolders of `src`)

### Generating more than one html file

If you have more than one html file (e.g. `index.html`, `file2.html` etc.) then you have to create a HtmlWebpackPlugin instance for each file. A comment about how to do this can be found in `webpack.config.js`.

## Usage

0. If you are starting a new project:
```bash
npm init
```
1. Copy `webpack.config.js` and `postcss.config.js` to your project directory and place it next to `package.json`.
2. Install **development dependencies**:
```bash
npm install --save-dev autoprefixer babel-loader @babel/core css-loader file-loader html-loader html-webpack-plugin image-webpack-loader mini-css-extract-plugin postcss-loader sass sass-loader webpack
```
3. Add **browserslist** to package.json and specify what browsers you want to support with your project. Example browserslist from package.json::
```json
"browserslist": [
    "last 4 versions"
],
```
4. Add a corresponding script to `package.json`:
```json
  "scripts": {
    "webpack": "webpack --config ./webpack.config.js"
  },
```