# QIWI OSS License
[![Build Status](https://travis-ci.com/qiwi/license.svg?branch=master)](https://travis-ci.com/qiwi/license)
[![npm (tag)](https://img.shields.io/npm/v/@qiwi/license/latest.svg)](https://www.npmjs.com/package/@qiwi/license)
[![dependencyStatus](https://img.shields.io/david/qiwi/license.svg?maxAge=300)](https://david-dm.org/qiwi/license)
[![Maintainability](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/maintainability)](https://codeclimate.com/github/qiwi/license/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/test_coverage)](https://codeclimate.com/github/qiwi/license/test_coverage)

[MIT](https://en.wikipedia.org/wiki/MIT_License) compatible and corresponding to the [Civil Code](https://en.wikipedia.org/wiki/Civil_Code_of_Russia) of the Russian Federation. 

* [License in English](./src/main/tpl/license_en.tpl) (en)
* [Лицензия на русском](./src/main/tpl/license_ru.tpl) (ru)

## Install
```bash
yarn add @qiwi/license
npm i @qiwi/license
```

## Usage
Through CLI
```bash
qiwilicense name='LICENSE' dir=/some/path lang=ru year=2019
```

TS/JS
```javascript
import {generate, render} from '@qiwi/license'

const text = render({
  lang: 'ru',
  year: '2010-2019'
})
// ... do something

// Or render and write to a file:
generate({
  name: 'LIC',
  dir: resolve(__dirname, '../foo/bar'),
  lang: 'en',
  year: '2019'
})
```

## Options
| Option       | Description | Default |
|--------------|-------------|---------|
| `year`       | Sets year | Current `.getFullYear()` |
| `lang`       | Text language | `en` |
| `name`       | License file name | `LICENSE` |
| `dir`        | License file dir | Project root |
