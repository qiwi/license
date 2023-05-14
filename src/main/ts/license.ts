import {mkdirSync,readFileSync, writeFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {template} from 'lodash-es'

import {
  IRenderOpts,
  TLanguage,
} from './interface'

const readPkgPkgJson = (cwd: string = process.cwd()) => {
  try {
    return JSON.parse(readFileSync(resolve(cwd, 'package.json'), 'utf-8'))
  }
  catch {
    return {}
  }
}

const normalizeOpts = (opts: IRenderOpts): IRenderOpts => ({
  lang: TLanguage.EN,
  file: 'LICENSE',
  year: new Date().getFullYear(),
  cwd: process.cwd(),
  name: readPkgPkgJson(opts.dir || opts.cwd).name,
  type: 'qosl',
  ...opts,
})

export const DEFAULT_OPTS: IRenderOpts = normalizeOpts({}) // Legacy

export const render = (opts: IRenderOpts): string => {
  const {lang, year, name, type} = normalizeOpts(opts)
  const tpl = loadTemplate(`${type}_${lang}.tpl`)

  return template(tpl)({year, name})
}

export const loadTemplate = (name: string): string => {
  const templatePath = resolve(__dirname,'../tpl', name)

  return readFileSync(templatePath, 'utf-8')
}

export const generate = (opts: IRenderOpts) => {
  const {dir, cwd, file, patchPkgJson} = normalizeOpts(opts)
  const text = render(opts)
  const _cwd = dir || cwd
  const target = resolve(_cwd + '', file + '')

  mkdirSync(_cwd + '', {recursive: true})
  writeFileSync(target, text, 'utf-8')

  if (patchPkgJson) patchPackageJson(_cwd + '')
}

export const patchPackageJson = (cwd: string) => {
  const pkgJson = readPkgPkgJson(cwd)
  pkgJson.license = 'MIT'

  // eslint-disable-next-line unicorn/no-null
  writeFileSync(resolve(cwd, 'package.json'), JSON.stringify(pkgJson, null, 2), 'utf-8')
}
