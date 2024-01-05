#!/usr/bin/env node

import meow from 'meow'

import {generate} from './license.ts'

export const cli = meow(`
  Usage
    $ qiwilicense --year=2024

  Options
    --year, -y    Defines license year
    --lang, -l    Specifies license test language
    --file, -f    License file name
    --dir,  -d    License target directory
    --cwd,  -c    --dir option alias
    --name, -n    Software name
    --type, -t    License type
    --patch-pkg-json   Update license in package.json

  Examples
    $ qiwilicense --year=2024 --cwd=/Users/foo/bar
    $ qiwilicense -l en -f lic -n Pijma
`, {
  // tslint:disable-next-line
  importMeta: import.meta,
  flags: {
    lang: {
      type: 'string',
      shortFlag: 'l',
    },
    year: {
      type: 'string',
      shortFlag: 'y',
    },
    dir: {
      type: 'string',
      shortFlag: 'd',
    },
    cwd: {
      type: 'string',
      shortFlag: 'c',
    },
    file: {
      type: 'string',
      shortFlag: 'f',
    },
    name: {
      type: 'string',
      shortFlag: 'n',
    },
    type: {
      type: 'string',
      shortFlag: 't',
    },
    patchPkgJson: {
      type: 'boolean',
      shortFlag: 't',
    },
  },
})

export default generate(cli.flags)
