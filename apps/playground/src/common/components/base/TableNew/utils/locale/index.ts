/**
 * eg:
 * lng('Modal.confirm')
 * lng('DatePicker.Month.jan')
 */

import { cloneJSON } from '@utiljs/clone'

import defaultLang from './lang/zh-CN'

type Lang = Record<string, Record<string, string | string[]>>

let _lang: Lang = defaultLang

const use = (lang: Lang) => {
  _lang = lang
}

const lng = (
  path: string
): string | string[] | Record<string, string | string[]> | Lang => {
  let value: Lang = cloneJSON(_lang)
  const arr = path.split('.')
  arr.forEach((i: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    value = value[i]
  })
  return value || ''
}

export default {
  use,
  lng
}
