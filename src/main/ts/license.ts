import {readFileSync, writeFileSync, mkdirSync} from 'fs'
import {resolve} from 'path'
import {template} from 'lodash'
import findGitRoot from 'find-git-root'

import {
  IRenderOpts,
  TLanguage,
} from './interface'

export const DEFAULT_OPTS: IRenderOpts = {
  lang: TLanguage.EN,
  name: 'LICENSE',
  year: new Date().getFullYear(),
  dir: resolve(findGitRoot(), '..'),
}

export const render = (opts: IRenderOpts): string => {
  const {lang, year} = {...DEFAULT_OPTS, ...opts}
  const tpl = loadTemplate(`license_${lang}.tpl`)

  return template(tpl)({year})
}

export const loadTemplate = (name: string): string => {
  const templatePath = resolve(__dirname,'../tpl', name)

  return readFileSync(templatePath, 'utf-8')
}

export const generate = (opts: IRenderOpts) => {
  const {dir, name} = {...DEFAULT_OPTS, ...opts}
  const text = render(opts)
  const target = resolve(dir + '', name + '')

  mkdirSync(dir + '', {recursive: true})
  writeFileSync(target, text, 'utf-8')
}
