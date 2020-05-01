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

## How to code

### SASS

#### Concerning sass-loader and urls

At this time of writing `sass-loader` does not work with `url()` references in mixins [Problems with url(...)](https://github.com/webpack-contrib/sass-loader#problems-with-url). Thats why I added a resolve to `webpack.config.js`.
Therefore it is important that any relative paths in scss files are rewritten to make use of webpack resolve.

Example:
1. Reference to `src/img/...` file: `url(~img/...)`. (It doesn't matter how deep you are in the subfolders of `src`)

#### Usage of normalize.css

You will find a node module called `@csstools/normalize.css` after `npm install`. If you want to use `normalize.css`, please import it in your scss files:

```scss
@import '~@csstools/normalize.css';
```

### HTML

#### Generating more than one html file

If you have more than one html file (e.g. `index.html`, `file2.html` etc.) then you have to create a HtmlWebpackPlugin instance for each file. A comment about how to do this can be found in `webpack.config.js`.

#### Cross site anchor tags

References made by cross-site anchor tags can currently not be resolved. Anchor tag relative paths should be relative to the locations the html files are going to have in `dist/`.

## Installation

0. If you are starting a new project:
```bash
git clone https://github.com/benjaminpreiss/webpack_conf.git
```
1. Change git origin remote to your github repository:
```bash
git remote set-url origin <YOUR-GITHUB-REPO>
```
2. Install all npm dependencies according to `package.json`:
```bash
npm install
```
3. Configure **browserslist** in .browserslistrc and specify what browsers you want to support with your project. Example browserslist:
```
defaults
last 4 versions
```
4. Configure **htmlhint** in .htmlhintrc to fit your needs.

## Usage

1. Start webpack build:
```bash
npx webpack
```
2. Check js linting:
```bash
npx jslint
```

## Recommendations for VS Code

1. Use eslint extension by Dirk Baeumer (dbaeumer.vscode-eslint)
2. Use stylelint extension by stylelint (stylelint.vscode-stylelint)
3. Use htmlhint extension by Mike Kaufmann (mkaufman.htmlhint)