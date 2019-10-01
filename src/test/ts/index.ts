import {resolve} from 'path'
import {readFileSync} from 'fs'
import {sync as execaSync} from 'execa'
import {render, generate} from '../../main/ts'
import {TLanguage} from '../../main/ts/interface'

describe('index', () => {
  describe('render', () => {
    it('returns license text for the specified language (if exists)', () => {
      expect(render({
        lang: TLanguage.EN,
      })).toEqual(expect.any(String))
    })

    it('throws error otherwise', () => {
      expect(() => render({
        lang: 'foo',
      })).toThrowError()
    })
  })

  describe('generate', () => {
    it('creates / updates target file with license', () => {
      const year = '2010-2019' + Math.random()
      const dir = resolve(__dirname, '../tmp')
      const name = 'lic'
      const filePath = resolve(dir, name)

      generate({
        lang: TLanguage.EN,
        name,
        dir,
        year,
      })

      expect(readFileSync(filePath, 'utf-8').includes(year)).toBeTruthy()
    })
  })
})

describe('bin', () => {
  it('parses CLI flags and creates license file', () => {
    const year = '2010-2019' + Math.random()
    const dir = resolve(__dirname, '../tmp')
    const lang = TLanguage.RU
    const name = 'licFromCli'
    const filePath = resolve(dir, name)

    execaSync(process.execPath,[
      './target/es5/cli.js',
      '-l', lang,
      '--dir', dir,
      `--name=${name}`,
      '--year', year,
    ])

    const result = readFileSync(filePath, 'utf-8')

    expect(result.includes(year)).toBeTruthy()
    expect(result.includes('«КАК ЕСТЬ»')).toBeTruthy()
  })
})
