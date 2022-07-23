export enum TLanguage {
  RU = 'ru',
  EN = 'en',
}

export type IRenderOpts = {
  lang?: TLanguage | string,
  year?: number | string,
  dir?: string,
  cwd?: string,
  file?: string,
  name?: string,
  type?: string
}
