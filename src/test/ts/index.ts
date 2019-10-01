import {render, generate} from '../../main/ts'
import {resolve} from 'path'
import {readFileSync} from 'fs'
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
