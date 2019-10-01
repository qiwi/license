# QIWI OSS License
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
