import { BizLineEnum, EnvEnum } from '../constants'
import { getEnv } from './env'

export const getQueryString = (name: string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

export const getQueryNumber = (name: string) => {
  const num = getQueryString(name)
  if (num === null || num === undefined) {
    return null
  }
  return Number(num)
}

export const getUocUrl = () => {
  const env = getEnv()
  // test 环境
  if (env === 'test') {
    let uocUrl = '//uoc.tsp.test.sankuai.com'

    // 处理测试环境 url 泳道跟随
    const testEnvUrlSl = window.location.hostname.substring(
      0,
      window.location.hostname.indexOf('-sl-')
    )
    if (testEnvUrlSl) {
      console.info('测试环境泳道跟随，uocUrl 修改前为', uocUrl)
      uocUrl = uocUrl.replace('//', `//${testEnvUrlSl}-sl-`)
      console.info('测试环境泳道跟随，修改 uocUrl 为', uocUrl)
    }
    return uocUrl
  }

  // st 环境
  if (env === 'st') {
    return '//uoc.tsp.st.sankuai.com'
  }

  // prod 环境
  return '//uoc.sankuai.com'
}

/**
 * 在 uoc 中打开指定页面
 * @param funcCode 子页面对应的菜单唯一标识
 * @param suburl 要打开的子页面地址
 * @param target _blank 表示在新标签打开，_self 表示在当前标签打开
 */
export const openInUoc = (
  funcCode: string,
  suburl: string,
  target: '_blank' | '_self' = '_blank'
) => {
  let openUrl = `${getUocUrl()}/igate/cfe_marketing_uoc/workflow/iframe.html?funcCode=${funcCode}`

  if (suburl) {
    const encodeUrl = encodeURIComponent(suburl)
    openUrl += `&suburl=${encodeUrl}`
  }

  window.top?.open(openUrl, target)
}

export const FUNC_CODE_DESC = {
  [BizLineEnum.ShanGou]: 'sgyx-tbhd-zspt',
  [BizLineEnum.WaiMai]: 'zspt-hdyq-new',
  [BizLineEnum.WaimaSongJiu]: 'waima_zspt',
}

export const getBizLine = () => {
  return getQueryNumber('bizLine')
}

/**
 * 在 uoc 中打开业务线指定页面
 * @param suburl 要打开的子页面地址
 * @param target _blank 表示在新标签打开，_self 表示在当前标签打开
 */
export const openInUocEntry = (
  suburl: string,
  target: '_blank' | '_self' = '_blank'
) => {
  if (/127\.0\.0\.1|localhost/.test(window.location.host)) {
    return window.open(suburl, target)
  }

  const bizLine = getBizLine()
  const funcCode = FUNC_CODE_DESC[bizLine as BizLineEnum]

  if (suburl) {
    const hasBizLine = /bizLine=\d+/.test(suburl)
    if (!hasBizLine && bizLine) {
      if (suburl.includes('?')) {
        suburl += `&bizLine=${bizLine}`
      } else {
        suburl += `?bizLine=${bizLine}`
      }
    }
  }

  openInUoc(funcCode, suburl, target)
}

export const getIamUrl = (roleId: number) => {
  const env = getEnv()
  if (env === EnvEnum.Test) {
    return `http://iam.it.test.sankuai.com/access-permission?field=add&resourceId=3597&roleId=${roleId}&source=UAC`
  }
  const online = `https://iam.sankuai.com/access-permission?field=add&resourceId=3222&roleId=${roleId}&source=UAC`
  if (env === EnvEnum.Online) {
    return online
  }
  return online
}

export const getIamUrlByEnv = ({
  devRoleId,
  prodRoleId,
}: {
  devRoleId: number
  prodRoleId: number
}) => {
  const env = getEnv()
  if (env === EnvEnum.Test) {
    return getIamUrl(devRoleId)
  }
  return getIamUrl(prodRoleId)
}
