# QIWI Open Source Software License

[![CI](https://github.com/qiwi/license/actions/workflows/ci.yaml/badge.svg)](https://github.com/qiwi/license/actions/workflows/ci.yaml)
[![Maintainability](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/maintainability)](https://codeclimate.com/github/qiwi/license/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cae4d8e55c58e5cbc4b6/test_coverage)](https://codeclimate.com/github/qiwi/license/test_coverage)
[![npm (scoped)](https://img.shields.io/npm/v/@qiwi/license)](https://www.npmjs.com/package/@qiwi/license)

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
qiwilicense --name='@qiwi/some-project' --cwd=. --lang=en --file=LICENSE --type=mit --year=2019
```
With [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)
```bash
npx @qiwi/license --type=mit --year=2019 --cwd=/some/path
```


TS/JS
```ts
import {generate, render} from '@qiwi/license'

// Get the text and do something next
const text = render({
  lang: 'ru',
  year: '2010-2019'
})

// Or just write to a file:
generate({
  name: 'PROJECT_NAME',
  cwd: resolve(__dirname, '../foo/bar'),
  lang: 'en',
  year: '2019'
})
```

## Options
| Option                  | Description                                | Default                    |
|-------------------------|--------------------------------------------|----------------------------|
| `year`, `y`             | Sets year                                  | `new Date().getFullYear()` |
| `lang`, `l`             | Text language                              | `en`                       |
| `file`, `f`             | License file name                          | `LICENSE`                  |
| `cwd`, `c`, `dir`, `d`  | License target dir                         | `process.cwd()`            |
| `name`, `n`             | Project name                               | `name` from `package.json` |
| `type`, `t`             | License type                               | `qosl`                     |
| `patch-pkg-json`        | Set/update license field of `package.json` | `false`                    |

## License
MIT
