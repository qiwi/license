import {exec as _exec} from 'node:child_process'
import {readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import url from 'node:url'
import {promisify} from 'node:util'

import {generate, render, TLanguage} from '../../main/ts/index.ts'
import {describe, expect} from './test-utils.ts'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
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
      const file = 'lic2'
      const type = 'qosl'
      const filePath = resolve(dir, file)

      generate({
        lang: TLanguage.RU,
        file,
        dir,
        year,
        type,
      })

      const result = readFileSync(filePath, 'utf-8')

      expect(result.includes('ЛИЦЕНЗИОННОЕ СОГЛАШЕНИЕ')).toBeTruthy()
      expect(result.includes(year)).toBeTruthy()
    })

    it('updates pkg json if found', () => {
      const year = '2010-2019' + Math.random()
      const file = 'lic'
      const type = 'mit'
      const pkgJsonPath = resolve(dir, 'package.json')

      writeFileSync(pkgJsonPath, '{"name": "FOO"}', 'utf-8')
      generate({
        lang: TLanguage.EN,
        file,
        dir,
        year,
        type,
        patchPkgJson: true,
      })

      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))
      expect(pkgJson.license).toEqual('MIT')
    })
  })
})

describe('bin', (it) => {
  it('parses CLI flags and creates a license file', async() => {
    const year = '2010-2019' + Math.random()
    const lang = TLanguage.RU
    const file = 'licFromCli'
    const filePath = resolve(dir, file)
    const pkgJsonPath = resolve(dir, 'package.json')
    const args = [
      './target/cjs/cli.cjs',
      '-l', lang,
      '--cwd', dir,
      `--file=${file}`,
      '--year', year,
      '--patch-pkg-json=true',
    ]
    const cmd = `node ${args.join(' ')}`

    writeFileSync(pkgJsonPath, '{"name": "FOO"}', 'utf-8')
    await exec(cmd, {env: {}})

    const result = readFileSync(filePath, 'utf-8')
    const pkgJson = JSON.parse(readFileSync(pkgJsonPath, 'utf-8'))

    expect(result.includes(year)).toBeTruthy()
    expect(result.includes('«КАК ЕСТЬ»')).toBeTruthy()
    expect(result.includes('FOO')).toBeTruthy()
    expect(pkgJson.license).toEqual('MIT')
  })
})
