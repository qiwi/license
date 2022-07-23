import {resolve} from 'path'
import {readFileSync} from 'fs'
import {exec as _exec} from 'child_process'
import {promisify} from 'util'
import {render, generate, TLanguage} from '../../main/ts'
import {describe, expect} from './test-utils'

const dir = resolve(__dirname, '../tmp')
const exec = promisify(_exec)

describe('index', () => {
  describe('render', (it) => {
    it('returns license text for the specified language (if exists)', () => {
      expect(render({
        lang: TLanguage.EN,
      })).toEqual(expect.a(String))
    })

    it('throws error otherwise', () => {
      expect(() => render({
        lang: 'foo',
      })).toThrow(Error)
    })
  })

  describe('generate', (it) => {
    it('creates / updates target file with license', () => {
      const year = '2010-2019' + Math.random()
      const file = 'lic'
      const type = 'mit'
      const filePath = resolve(dir, file)

      generate({
        lang: TLanguage.EN,
        file,
        dir,
        year,
        type,
      })

      const result = readFileSync(filePath, 'utf-8')

      expect(result.includes('MIT License')).toBeTruthy()
      expect(result.includes(year)).toBeTruthy()
    })
  })
})

describe('bin', (it) => {
  it('parses CLI flags and creates a license file', async() => {
    const year = '2010-2019' + Math.random()
    const lang = TLanguage.RU
    const file = 'licFromCli'
    const filePath = resolve(dir, file)
    const name = 'FOO'

    const args = [
      './target/es6/cli.mjs',
      '-l', lang,
      '--dir', dir,
      `--file=${file}`,
      '--year', year,
      '-n', name,
    ]

    const cmd = `node ${args.join(' ')}`

    await exec(cmd, {env: {}})

    const result = readFileSync(filePath, 'utf-8')
    expect(result.includes(year)).toBeTruthy()
    expect(result.includes('«КАК ЕСТЬ»')).toBeTruthy()
    expect(result.includes('FOO')).toBeTruthy()
  })
})
