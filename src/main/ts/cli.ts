import meow from 'meow'
import {generate} from './license'

export const cli = meow(`
  Usage
    $ qiwilicense --year=2020

  Options
    --year, -y    Defines license year
    --lang, -l    Specifies license test language
    --name, -n    License file name
    --dir,  -d    License file directory

  Examples
    $ qiwilicense --year=2020 --dir=/Users/foo/bar
    $ qiwilicense -l en -n lic
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
    name: {
      type: 'string',
      alias: 'n',
    },
  },
})

export default generate(cli.flags)
