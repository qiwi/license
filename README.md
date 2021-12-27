# QIWI Open Source Software License
[![Build Status](https://travis-ci.com/qiwi/license.svg?branch=master)](https://travis-ci.com/qiwi/license)
[![Maintainability](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/maintainability)](https://codeclimate.com/github/qiwi/license/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/test_coverage)](https://codeclimate.com/github/qiwi/license/test_coverage)
[![npm (tag)](https://img.shields.io/npm/v/@qiwi/license/latest.svg)](https://www.npmjs.com/package/@qiwi/license)

[MIT](https://en.wikipedia.org/wiki/MIT_License) compatible and corresponding to the [Civil Code](https://en.wikipedia.org/wiki/Civil_Code_of_Russia) of the Russian Federation. 

* [License in English](./src/main/tpl/license_en.tpl) (en)
* [Лицензия на русском](./src/main/tpl/license_ru.tpl) (ru)

## Install
```bash
yarn add @qiwi/license -D
npm add @qiwi/license -D
```

## Usage
Through CLI
```bash
qiwilicense --name='@qiwi/some-project' --dir=. --lang=en --file=LICENSE --type=mit --year=2019
```
With [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)
```bash
npx @qiwi/license --type=mit --year=2019 --dir=/some/path
```


TS/JS
```javascript
import {generate, render} from '@qiwi/license'

// Get the text and do something next
const text = render({
  lang: 'ru',
  year: '2010-2019'
})

// Or just write to a file:
generate({
  name: 'PROJECT_NAME',
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
| `file`       | License file name | `LICENSE` |
| `dir`        | License target dir | Project root |
| `name`       | Project name | `name` from `package.json` |
| `type`       | License type | `qosl` |
