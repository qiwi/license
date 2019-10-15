#!/usr/bin/env node

import meow from 'meow'
import {generate} from './license'

export const cli = meow(`
  Usage
    $ qiwilicense --year=2020

  Options
    --year, -y    Defines license year
    --lang, -l    Specifies license test language
    --file, -f    License file name
    --dir,  -d    License target directory
    --name, -n    Software name
    --type, -t    License type

  Examples
    $ qiwilicense --year=2020 --dir=/Users/foo/bar
    $ qiwilicense -l en -f lic -n Pijma
`, {
  flags: {
    lang: {
      type: 'string',
      alias: 'l',
    },
    year: {
      type: 'string',
      alias: 'y',
    },
    dir: {
      type: 'string',
      alias: 'd',
    },
    file: {
      type: 'string',
      alias: 'f',
    },
    name: {
      type: 'string',
      alias: 'n',
    },
    type: {
      type: 'string',
      alias: 't',
    },
  },
})

export default generate(cli.flags)
