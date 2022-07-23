import {readFileSync, writeFileSync, mkdirSync} from 'fs'
import {resolve} from 'path'
import {template} from 'lodash-es'
import {readPackageSync} from 'read-pkg'

import {
  IRenderOpts,
  TLanguage,
} from './interface'

export const DEFAULT_OPTS: IRenderOpts = {
  lang: TLanguage.EN,
  file: 'LICENSE',
  year: new Date().getFullYear(),
  cwd: process.cwd(),
  name: readPackageSync().name,
  type: 'qosl',
}

export const render = (opts: IRenderOpts): string => {
  const {lang, year, name, type} = {...DEFAULT_OPTS, ...opts}
  const tpl = loadTemplate(`${type}_${lang}.tpl`)

  return template(tpl)({year, name})
}

export const loadTemplate = (name: string): string => {
  const templatePath = resolve(__dirname,'../tpl', name)

  return readFileSync(templatePath, 'utf-8')
}

export const generate = (opts: IRenderOpts) => {
  const {dir, cwd, file} = {...DEFAULT_OPTS, ...opts}
  const text = render(opts)
  const _cwd = dir || cwd
  const target = resolve(_cwd + '', file + '')

  mkdirSync(_cwd + '', {recursive: true})
  writeFileSync(target, text, 'utf-8')
}
